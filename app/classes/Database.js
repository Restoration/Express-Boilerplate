var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;

class Database{
    connect(){
        // Connect to the db
        MongoClient.connect("mongodb://localhost:27017/exampleDB", function(err, db) {
            if(!err) {
                console.log("We are connected");
            }
        });
    }
}
module.exports = Database;
