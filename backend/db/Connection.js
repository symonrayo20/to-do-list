const mysql = require("mysql");

const connection = mysql.createPool({
    host        : "localhost",
    user        : "root",
    password    : "",
    database    : "phonebook"
})

const DBConnection = (query) => {
    return new Promise ((resolve, reject) => {
        connection.getConnection((err, db) => {
            if (err) {
                console.log("Database Error: ", err);
                reject(err);
            } else {
                db.query(query, (err, results) => {
                    if (err) {
                        console.log("Query Error: ", err);
                        reject(err);
                    } else {
                        resolve(results);
                    }

                    db.release();
                })
            }
        })
    })
}

module.exports = DBConnection;