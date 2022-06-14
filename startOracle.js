var connection = require('./todoApp/oracleConnect');
const oracledb = require('oracledb');

function testHere() {
    try {
        let pool = oracledb.getPool('testPool');
        console.log("Get Pool SUCCESS", pool.poolMax);
    } catch (err) {
        console.log("Get Pool Faild", err.message);
    }
}

async function mainTest() {
    await connection.init();
    testHere();
    oracledb.getConnection('testPool', (err, connection) => {
        if (err) {
            console.log("some problem", err.message);
        } else {
            let pool = oracledb.getPool('testPool');
            console.log("opened connection: ", pool.connectionsOpen);
            console.log("in use connection: ", pool.connectionsInUse);
            console.log("PoolAlias: ", pool.poolAlias);
        }
    });
}

mainTest();