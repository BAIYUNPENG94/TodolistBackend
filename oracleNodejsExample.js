const oracledb = require('oracledb');

async function run() {
	let connection;

	try {
		//This needs to be verified tonight.
		connection = await oracledb.getConnection({ user: "system", password: "taiho", connectionString: "localhost:1521/XE"});

		console.log("connect SUCCESS");

		await connection.execute(`begin
			execute immediate 'drop table TODOITEM';
			exception when others then if sqlcode <> -942 then raise; end if;
			end;`);

		await connection.execute(` create table TODOITEM (
				id number,
				title varchar2(4000),
				comp varchar2(4000),
				pior varchar2(4000),
				due varchar2(4000),
				person varchar2(4000),
				content varchar2(4000),
				primary key (id)
		)`);
		
		const sql = 'insert into TODOITEM (id, title, comp, pior, due, person, content) values (:1, :2, :3, :4, :5, :6, :7)';

		const rows = [
			[1, "test 1", "90", "First", "xx-xx-xx", "Jim", "ContentForTest"],
		];

		//let result = await connection.executeMany(sql, rows);
		let xx = await connection.execute(`INSERT INTO TODOITEM (DESCRIPTION, DONE) VALUES (:1, :2)`, ["task X", 1], (err, result) => {
                    console.log("[TEST] [CREATE] function test request arrived");
                    if (err) {
                        console.log('Problem 0043: ', err.message);
                    } else {
                        console.log('CREATE SUCCESS: ', result)
                    }
                });

		//console.log(result.rowsAffected, "Rows Inserted");

		connection.commit();

		result = await connection.execute(
			`select * from TODOITEM`,
			[],
			{ resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT }
		);

		const rs = result.resultSet;
		let row;

		while ((row = await rs.getRow())) {
			console.log(row);
		}

		await rs.close();

	} catch (err) {
		console.error(err);
	} finally {
		if (connection) {
			try {
				await connection.close();
			} catch (err) {
				console.error(err);
			}
		}
	}
}

run();
