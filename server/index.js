import app from './app';
import {connectToDatabase} from './db';
import {port} from './config';

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
