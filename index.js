/**
 * @fileoverview Server initialization and environment variables setup
 *
 * Should only be used in production environment.
 *
 * Take the secret variables stored in datastore, and set them into
 * the process execution environment.
 *
 * After that, it starts a child process running the server. This is done to
 * preserve the environmental variables set during this process. Otherwise,
 * there is not a known way to keep the variables.
 *
 * If you will add a new secret variable, you can do it here. Also, if you need
 * to setup a not secret environmental variable, feel free to add
 * it into app.yaml file
 *
 * By now, this secret handling strategy seems too difficult, so a different
 * approach is welcome if you have one.
 *
 * NOTE: It is not written in ES6 since it is not built during the yarn build
 * process, so it is needed to be accessed through node directly without babel
 */

const {Datastore} = require('@google-cloud/datastore');
const {join} = require('path');
const childProcess = require('child_process');

/**
 * Script to execute child process to run server with custom env variables
 *
 * Runs the server inside the main process, to keep environmental variables
 *
 * @param {string} scriptPath in which the script to run is
 * @return {Promise} that rejects when child process is done
 */
const runScript = (scriptPath) => new Promise((resolve, reject) => {
  // Keep track of whether promise has been resolved to
  // prevent multiple invocations
  let resolved = false;

  const process = childProcess.fork(scriptPath);

  process.on('message', console.log);

  // Listen for errors as they may prevent the exit event from firing
  process.on('error', (err) => {
    if (resolved) return;
    resolved = true;
    reject(err);
  });

  // Execute the promise once the process has finished running
  process.on('exit', (code) => {
    if (resolved) return;
    resolved = true;
    const err = code === 0 ? null : new Error(`Exit code: ${code}`);
    reject(err);
  });
});

/**
 * Server initialization
 *
 * Setup environmental variables from datastore and initialize
 * the server build in a childprocess
 */
const startServer = async () => {
  const datastore = new Datastore();

  const key = datastore.key(['secrets', process.env.DATASTORE_SECRETS_KEY]);

  const [secrets] = await datastore.get(key);

  Object.keys(secrets).forEach((varName) => {
    process.env[varName] = secrets[varName];
  });

  runScript(join(__dirname, './dist'));
};

startServer();
