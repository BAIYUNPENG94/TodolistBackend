var connection = require ('./oracleConnect');

function Todo() {
    this.get = function(res) {
        connection.acquire((err, conn) => {
            if (err) {
                console.log('Problem 004: ', err.message);
            } else {
                conn.execute(`SELECT * FROM TODOITEM`, (err, result) => {
                    if (err) {
                        console.log('Problem 0041: ', err.message);
                    } else {
                        console.log('GET SUCCESS: ', result)
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
                    if (err) {
                        console.log('Problem 0042: ', err.message);
                    } else {
                        console.log('GET SUCCESS: ', result)
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
                conn.execute(`INSERT INTO TODOITEM SET :TODO`, [todo], (err, result) => {
                    if (err) {
                        console.log('Problem 0043: ', err.message);
                    } else {
                        console.log('GET SUCCESS: ', result)
                        res.send(result);
                    }
                })
            }
        })
    };
}