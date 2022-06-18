var connection = require ('./oracleConnect');

function Todo() {
    this.get = function(res) {
        connection.acquire((err, conn) => {
            if (err) {
                console.log('Problem 004: ', err.message);
            } else {
                conn.execute(`SELECT * FROM TODOITEM`, (err, result) => {
                    console.log("[TEST] [GET] function test request arrived");
                    conn.close({drop: false});
                    if (err) {
                        console.log('Problem 0041: ', err.message);
                    } else {
                        console.log('GET SUCCESS: ', result)
                        res.header("Access-Control-Allow-Origin", "*");
                        res.send(result);
                    }
                })
            }
        })
    };

    this.getByID = function(id, res) {
        connection.acquire((err, conn) => {
            if (err) {
                console.log('Problem 004: ', err.message);
            } else {
                conn.execute(`SELECT * FROM TODOITEM WHERE ID = :ID`, [id], (err, result) => {
                    console.log("[TEST] [GET BY ID] function test request arrived");
                    //conn.close({drop: false});
                    if (err) {
                        console.log('Problem 0042: ', err.message);
                    } else {
                        console.log('GET SUCCESS: ', result)
                        res.header("Access-Control-Allow-Origin", "*");
                        res.send(result);
                    }
                })
            }
        })
    };

    this.create = function(todo, res) {
        connection.acquire((err, conn) => {
            if (err) {
                console.log('Problem 004: ', err.message);
            } else {
                conn.execute(`insert into todoitem (description, done) values (:1, :2)`, todo, (err, result) => {
                    console.log("[TEST] [CREATE] function test request arrived");
                    //conn.close({drop: false});
                    if (err) {
                        res.header("Access-Control-Allow-Origin", "*");
                        res.send({status:1, message:'Creation fail'});
                        console.log('Problem 0043: ', err.message);
                    } else {
                        //After change of database, call commit() is important
                        conn.commit();
                        res.header("Access-Control-Allow-Origin", "*");
                        res.send({status:0, message:'Creation SUCCESS'});
                        console.log('CREATE SUCCESS: ', result)
                    }
                })
            }
        })
    };

    this.update = function(sourceName, id, res) {
        connection.acquire((err, conn) => {
            if (err) {
                console.log('Problem 004: ', err.message);
            } else {
                conn.execute(`UPDATE TODOITEM SET :SOURCENAME WHERE ID = :ID`, [sourceName, id], (err, res) => {
                    conn.close({drop: false});
                    if (err) {
                        res.header("Access-Control-Allow-Origin", "*");
                        res.send({status:1, message:'Update fail'});
                        console.log('Problem 0044: ', err.message);
                    } else {
                        res.header("Access-Control-Allow-Origin", "*");
                        res.send({status:0, message:'Update SUCCESS'});
                        console.log('Update SUCCESS: ', result);
                    }
                })
            }
        })
    };

    this.delete = function(id, res) {
        connection.require((err, conn) => {
            if (err) {
                console.log('Problem 004: ', err.message);
            } else {
                conn.execute(`DELETE FROM TODOITEM WHERE ID = :ID`, [id], (err, res) => {
                    conn.close({drop: false});
                    if (err) {
                        res.header("Access-Control-Allow-Origin", "*");
                        res.send({status:1, message:'Delete fail'});
                        console.log('Problem 0045: ', err.message);
                    } else {
                        res.header("Access-Control-Allow-Origin", "*");
                        res.send({status:0, message:'Delete SUCCESS'});
                        console.log('Delete SUCCESS: ', result);
                    }
                })
            }
        })
    };
};

module.exports = new Todo();