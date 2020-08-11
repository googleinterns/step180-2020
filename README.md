# Chrome Enamel STEP interns project repository :elephant:

Dashboard for HTTP-related support to deprecate in the future by Chrome team

# Running locally

In order to get the project running in local environment, you need the following prerequisites:

- [NodeJS >= 12](#nodejs)
- [Postgresql](#postgresql): Running in background as a system service
- [Yarn](#yarn): As an alternative to npm

If you don't have any of the prerequisites, go to [setup section](#setup).

After that, follow the next steps:

1. Run `sudo -u postgres psql` to enter the postgres console
2. Then, run `CREATE DATABASE <your-database>`, this db will be used in the project, so keep the name
3. Copy .env.example into a .env file
4. Replace the variables with your DB user, password and the database you've recently created, host should be localhost
5. Set NODE_ENV to `development`
6. Set API_PORT to configure where the server will be running
7. Set PORT to configure where the React App will be running
8. Generate a service account in GCLOUD > IAM > Service Accounts, and generate a new JSON key for BigQuery.
9. Import that json file to the root of this project as `gcloud_creds.json`. Add the path of that file to the .env (see .env.example).
10. Run `yarn install` to download every dependency needed.
11. Run `yarn dev` to start project in development mode

## Troubleshooting (Known issues)

- If you're receiving a `[SequelizeConnectionError]: password authentication failed for user '<username>'`, please enter to postgres console using `sudo -u postgres psql` and change the password for the user you're trying to use. Also update .env accordingly

- If there's a credential issue with BigQuery, make sure you followed correctly steps 8 and 9, remember to rename the JSON key.

# Automatic Deployment

In order to deploy the project to Google Cloud App Engine, you'll need a GCloud project with the following pre-configured APIs and resources:

- A Cloud SQL instance running PostgreSQL
- An App Engine setup for a Node JS service
- Big Query enabled in your GCloud Project

We use GCloud Secret Manager to store secret keys needed, so, you'll need to add every environment variable specified in `.env.example` inside the Secret Manager of your GCloud project except for `NODE_ENV` and `PORT` and client side env variables. These variables are set by App Engine by default or not needed.

Once every secret was added to the Secret Manager, add a Service Account key encoded in base64 to Github Secrets with the name of `GCLOUD_SERVICE_ACCOUNT_KEY` as [official docs suggests](https://github.com/GoogleCloudPlatform/github-actions), this will allow your Github Actions to run the different stages needed prior to deployment.

Consider that:

- Your service account must have access to every service used in the project, such as CloudSQL or BigQuery
- The deployment will run only when `master` branch is updated.

# Test

To test the project, you can run:

- `yarn test` to run both frontend and backend tests
  - Or test individually with:
    - `yarn test:server`
    - `yarn test:client`

# Adding environment variables

During development, you'll need to add new environment variables. For that, please follow the next steps:

1. Update `.env.example` and this README.md accordingly
2. Add the new environment variables to your GCloud Secret Manager
3. Reference the new environment variable in `.github/workflows/deployment.yml`

Otherwise, could affect the [Automatic Deployment](#automatic-deployment)

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

- Run `sudo -u postgres psql` to enter the postgres console
- Once there, you can run `ALTER USER postgres PASSWORD '<new-password>'`
- This is done to avoid an issue with local DB connection, 'cause it requires to have a password

## Yarn

Official instructions are pretty clear, and suitable for any OS.
They can be accessed through the official docs:

> https://classic.yarnpkg.com/en/docs/install
