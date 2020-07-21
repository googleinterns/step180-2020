import { Sequelize } from 'sequelize';
import { db } from '../config';

const connectToDatabase = async () => {
  const { database, username, password, host, socketPath } = db;

  const sequelize = new Sequelize(database, username, password, {
    dialect: 'postgres',
    host,
    socketPath
  });

  await sequelize.authenticate();
};

export { connectToDatabase };
