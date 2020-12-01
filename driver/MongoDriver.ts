import MongoDriver from '../interface/driver/MongoDriver';
import mongo from 'mongodb';
import dotenv from 'dotenv';
const MongoClient = mongo.MongoClient;

export default class MongoDriverImpl implements MongoDriver {
  private readonly url: string;
  private readonly dataBase: string;

  constructor() {
    dotenv.config();
    this.url = process.env.DB_MONGO_URL;
    this.dataBase = process.env.DB_MONGO_DATABASE;
  }

  /**
    * Connect to MongoDB
    *
    */
  connect() {
    // Connect to the db
    MongoClient.connect(this.url, (err, db) => {
      if (!err) {
        // eslint-disable-next-line no-console
        console.log('We are connected');
      }
    });
  }

  /**
    * Get data from MongoDB
    *
    * @param String table
    * @return Object res
    */
  getData(table: string) {
    MongoClient.connect(this.url, (err, db) => {
      if (err) throw err;
      const dbo = db.db(this.dataBase);
      dbo.collection(table).findOne({}, (err, res) => {
        if (err) throw err;
        return res;
      });
      db.close();
    });
  }

  /**
    * Insert data to MongoDB
    *
    * @param String table
    * @param Object obj
    * @return Object res
    */
  insertData(table: string, obj: object): void {
    MongoClient.connect(this.url, (err, db) => {
      if (err) throw err;
      const dbo = db.db(this.dataBase);
      dbo.collection(table).insertOne(obj, (err, res) => {
        if (err) throw err;
        return res;
      });
      db.close();
    });
  }

  /**
    * Update data
    *
    * @param String table
    * @param Object query
    * @param Object values
    * @return Object res
    */
  updateData(table: string, query, values) {
    MongoClient.connect(this.url, (err, db) => {
      if (err) throw err;
      const dbo = db.db(this.dataBase);
      dbo.collection(table).updateOne(query, values, (err, res) => {
        if (err) throw err;
        return res;
      });
      db.close();
    });
  }

  /**
    * Delete data from table
    *
    * @param String table
    * @param Object query
    * @return Object obj
    */
  deleteData(table: string, query) {
    MongoClient.connect(this.url, (err, db) => {
      if (err) throw err;
      const dbo = db.db(this.dataBase);
      dbo.collection(table).deleteOne(query, (err, obj) => {
        if (err) throw err;
        return obj;
      });
      db.close();
    });
  }
}
