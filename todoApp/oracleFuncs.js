var connection = require ('./oracleConnect');

function Todo() {
    this.get = function(res) {
        connection.acquire((err, conn) => {
            if (err) {
                console.log('Problem 004: ', err.message);
            }
            conn.execute('SELECT * FROM TODOITEM', (err, result) => {
                if (err) {
                    console.log('Problem 0041: ', err.message);
                } else {
                    console.log('GET SUCCESS: ', result)
                }
            })
        })
    };

    this.getByID = function(id, res) {
        connection.acquire((err, conn) => {
            if (err) {
                console.log('Problem 004: ', err.message);
            }
            conn.execute('SELECT * FROM TODOITEM', (err, result) => {
                if (err) {
                    console.log('Problem 0041: ', err.message);
                } else {
                    console.log('GET SUCCESS: ', result)
                }
            })
        })
    };
}