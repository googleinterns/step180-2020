import app from './app';
import {connectToDatabase} from './db';
import {port} from './config';

/**
 * This script is intended to prepare things just before starting the
 * express API.
 *
 * It is recommended to keep it as it is, tryin to not make it grow so much
 *
 * In case there is a particular task to do, so the server can
 * initialize correctly, please try to move into a separate
 * script as with connectToDatabase()
 */
const start = async () => {
  console.info('Connecting to database');
  try {
    await connectToDatabase();
    console.info('🔥  Connected to DB');

    await app.listen(port);
    console.info(`🚀  Server running at port: ${port}`);
  } catch (err) {
    console.error('Failed to connect to DB', err);
    console.error('Not able to run server');
  }
};

start();
