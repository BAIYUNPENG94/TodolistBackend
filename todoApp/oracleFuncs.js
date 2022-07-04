var connection = require ('./oracleConnect');

const dbTableName  = 'TODOITEM';
const dbTableCols  = '(id, title, comp, pior, due, person, content)';
const dbInsertPlug = '(:1, :2, :3, :4, :5, :6, :7)';

const sqlGet     = 'SELECT * FROM ' + dbTableName;
const sqlGetByID = 'SELECT * FROM ' + dbTableName + ' WHERE ID = :ID';
const sqlCreate  = 'INSERT INTO ' + dbTableName + dbTableCols + ' values ' + dbInsertPlug;
const sqlUpdate  = 'UPDATE' + dbTableName + ' SET ' + statement + ' WHERE ID = :ID'; //This one needs to be test
const sqlDelete  = 'DELETE FROM TODOITEM WHERE ID = :ID';

function Todo() {
    this.get = function(res) {
        connection.acquire((err, conn) => {
            if (err) {
                console.log('Problem 004: ', err.message);
            } else {
                conn.execute(sqlGet, (err, result) => {
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
                conn.execute(sqlGetByID, [id], (err, result) => {
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
                conn.execute(sqlCreate, todo, (err, result) => {
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

    //This need to be reviewed, better to generate sql statement from frontend side
    this.update = function(sourceData, id, res) {
        connection.acquire((err, conn) => {
            if (err) {
                console.log('Problem 004: ', err.message);
            } else {
                sourceDes = sourceData[0];
                sourceDone = sourceData[1];
                conn.execute(`UPDATE TODOITEM SET 
                                description = :1,
                                done = :2
                             WHERE ID = :ID`, [sourceDes, sourceDone, id], (err, result) => {
                    //conn.close({drop: false});
                    if (err) {
                        res.header("Access-Control-Allow-Origin", "*");
                        res.send({status:1, message:'Update fail'});
                        console.log('Problem 0044: ', err.message);
                    } else {
                        conn.commit();
                        res.header("Access-Control-Allow-Origin", "*");
                        res.send({status:0, message:'Update SUCCESS'});
                        console.log('Update SUCCESS: ', result);
                    }
                })
            }
        })
    };

    this.delete = function(id, res) {
        connection.acquire((err, conn) => {
            if (err) {
                console.log('Problem 004: ', err.message);
            } else {
                //delete by id(key)
                conn.execute(sqlDelete, [id], (err, result) => {
                    //conn.close({drop: false});
                    if (err) {
                        res.header("Access-Control-Allow-Origin", "*");
                        res.send({status:1, message:'Delete fail'});
                        console.log('Problem 0045: ', err.message);
                    } else {
                        conn.commit();
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