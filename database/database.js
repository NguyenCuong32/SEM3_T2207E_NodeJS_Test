var mongoose = require('mongoose');
var dotenv = require('dotenv');
dotenv.config({ path: "./config.env" })

 
class Database {
        constructor() {
            this._connect()
        }
    
        _connect() {
            mongoose.connect(process.env.DATABASE_LOCAL, {useNewUrlParser: true})
                .then(() => {
                    console.log("Database connection successfully!");
                })
                .catch(err => {
                    console.log("Database connection error!");
                })
        }
    }
    module.exports = new Database();