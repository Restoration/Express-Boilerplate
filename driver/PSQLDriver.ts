import PSQLDriver from '../interface/driver/PSQLDriver';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

export default class PSQLDriverImpl implements PSQLDriver {
  private readonly connection: any;

  constructor() {
    dotenv.config();
    this.connection = createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: false
    });
  }

  get getConnection() {
    return this.connection();
  };
}
