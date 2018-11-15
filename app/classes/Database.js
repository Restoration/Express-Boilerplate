var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/exampleDB";
class Database{
    connect(){
        // Connect to the db
        MongoClient.connect(url, function(err, db) {
            if(!err) {
                console.log("We are connected");
            }
        });
    }
    getData(){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("exampleDB");
            dbo.collection("test").findOne({}, function(err, result) {
                if (err) throw err;
                console.log(result);
                db.close();
            });
        });
    }
    insertData(){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("exampleDB");
            var obj = {id: 1,  name: "Test" };
            dbo.collection("test").insertOne(obj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
    }
    updateData(){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("exampleDB");
            var myquery = { name: "Test" };
            var newvalues = { $set: {name: "Example" } };
            dbo.collection("test").updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
                db.close();
            });
        });
    }

    deleteData(){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("exampleDB");
            var myquery = { id: '1' };
            dbo.collection("test").deleteOne(myquery, function(err, obj) {
                if (err) throw err;
                console.log("1 document deleted");
                db.close();
            });
        });
    }
}
module.exports = Database;
