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
}
module.exports = Database;
