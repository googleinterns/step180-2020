# Chrome Enamel STEP interns project repository :elephant:

Dashboard for HTTP-related stuff to deprecate in the future by Chrome team

# Running locally

In order to get the project running in local environment, you need the following prerequisites:

- [NodeJS >= 12](#nodejs)
- [Postgresql](#postgresql): Running in background as a system service
- [Yarn](#yarn): As an alternative to npm

If you don't have any of the prerequisites, go to [setup section](#setup).

After that, follow the next steps:

1. Run `sudo -u postgres psql` to enter postgres console
2. Then, run `CREATE DATABASE <your-database>`, this db will be used in the project, so keep the name
3. Copy .env.example into a .env file
4. Replace the variables with your DB user, password and the database you've recently created, host should be localhost
5. Set NODE_ENV to `development`
6. Set API_PORT to configure where the server will be running
7. Set PORT to configure where the React App will be running
8. Run `yarn install` to download every dependency needed
9. Run `yarn dev` to start project in development mode

## Troubleshooting (Known issues)

- If you're receiving a `[SequelizeConnectionError]: password authentication failed for user '<username>'`, please enter to postgres console using `sudo -u postgres psql` and change the password for the user you're trying to use. Also update .env accordingly

- If there's a credential issue with BigQuery, generate app credentials from GCLOUD (.json file) and import that to the root of this project as `gcloud_creds.json`.

# Manual deployment

In order to deploy the project to Google Cloud App Engine, you'll need a project with the following pre-configured APIs and resources:

- A Cloud SQL instance running PostgreSQL
- An App Engine setup for a Node JS service

Open your datastore in Google Cloud, create a collection named `secrets`, then create an entry with the database variables according to [the official docs](https://cloud.google.com/sql/docs/postgres/connect-app-engine-standard?hl=es-419#node.js).

Whenever you've created the datastore entry with the secrets, please take the Document ID from Datastore, and replace the `DATASTORE_SECRETS_KEY` at `app.yaml` file

The project is prepared to setup secret env variables from datastore at startup.

After that, do:

- `gcloud init`
- `yarn build`
  - (OPTIONAL) You can build only frontend or backend by running:
    - `yarn build:server`
    - `yarn build:client`
- `gcloud app deploy`

# Test

To test the project, you can run:

- `yarn test` to run both frontend and backend tests
  - Or test individually with:
    - `yarn test:server`
    - `yarn test:client`

# Setup

## NodeJS

### Chrome OS

Open your terminal and run the next commands

- `sudo apt-get update`
- `sudo apt-get install curl`
- `curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -`
- `sudo apt install nodejs`

Once done, you can verify with `npm --version` or `node -v`

## PostgreSQL

### Chrome OS

Open your terminal and run the next commands

- `sudo apt-get update`
- `sudo apt-get install postgresql`

After that, you can enable postgres as a background service with

- `sudo systemctl start postgresql`

and verify it is running with:

- `sudo systemctl status postgresql`

#### Recomended:

- Run `sudo -u postgres psql` to enter postgres console
- Once there, you can run `ALTER USER postgres PASSWORD '<new-password>'`
- This is done to avoid an issue with local DB connection, 'cause it requires to have a password

## Yarn

Official instructions are pretty clear, and suitable for any OS.
They can be accessed through the official docs:

> https://classic.yarnpkg.com/en/docs/install
