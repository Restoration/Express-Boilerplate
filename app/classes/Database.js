var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/exampleDB";
var DataBase = "exampleDB";
class Database{
    constructor() {
        this.url = "mongodb://localhost:27017/exampleDB";
        this.DataBase = "exampleDB";
    }
    /**
    * Connect to MongoDB
    *
    */
    connect(){
        // Connect to the db
        MongoClient.connect(url, function(err, db) {
            if(!err) {
                console.log("We are connected");
            }
        });
    }
    /**
    * Get data from MongoDB
    *
    * @param String table
    * @return Object res
    */
    getData(table){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(DataBase);
            dbo.collection(table).findOne({}, function(err, res) {
                if (err) throw err;
                return res;
                db.close();
            });
        });
    }
    /**
    * Insert data to MongoDB
    *
    * @param String table
    * @param Object obj
    * @return Object res
    */
    insertData(table,obj){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(DataBase);
            dbo.collection(table).insertOne(obj, function(err, res) {
                if (err) throw err;
                return res;
                db.close();
            });
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
    updateData(table,query,values){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(DataBase);
            dbo.collection(table).updateOne(query, values, function(err, res) {
                if (err) throw err;
                return res;
                db.close();
            });
        });
    }
    /**
    * Delete data from table
    *
    * @param String table
    * @param Object query
    * @return Object obj
    */
    deleteData(table,query){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(DataBase);
            dbo.collection(table).deleteOne(query, function(err, obj) {
                if (err) throw err;
                return obj;
                db.close();
            });
        });
    }
}
module.exports = Database;
