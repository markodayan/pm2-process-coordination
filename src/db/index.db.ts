import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const initDB = async () => {
  try {
    const connection = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.PG_USER,
      password: undefined,
      database: process.env.PG_DB,
      entities: [],
      synchronize: true,
    });
  } catch (err) {
    console.error(err);
    throw new Error('Unable to connect to db');
  }
};
