import {Sequelize} from 'sequelize';
import {db} from '../config';

const connectToDatabase = async () => {
  const {database, username, password, host} = db;

  const sequelize = new Sequelize(database, username, password, {
    dialect: 'postgres',
    host,
  });

  await sequelize.authenticate();
};

export {connectToDatabase};
