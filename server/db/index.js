import {db} from '../config';
import {Sequelize} from 'sequelize';

/**
 * Database connection handler
 *
 * Starts and handle connection with database
 *
 * Take config file into consideration, since it is
 * where the database access variables will be gotten.
 *
 * It is default to postgres, since there is no need to
 * use another database dialect. But could be configured if needed
 */
const connectToDatabase = async () => {
  const {database, username, password, host} = db;

  const sequelize = new Sequelize(database, username, password, {
    dialect: 'postgres',
    host,
  });

  await sequelize.authenticate();
};

export {connectToDatabase};
