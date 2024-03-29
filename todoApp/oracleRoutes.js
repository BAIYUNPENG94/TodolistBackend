var todo = require('./oracleFuncs');

module.exports = {
	configure:  function(app) {
		app.get('/todo', (req, res) => {
			todo.get(res);
		});
		app.get('/todo/:id', (req, res) => {
			todo.getByID(req.params.id, res);
		});
		app.post('/todo', (req, res) => {
			todo.create(req.body.content, res);
		});
		app.put('/todo/:id', (req, res) => {
			todo.update(req.body.content, req.params.id, res);
		});
		app.delete('/todo/:id', (req, res) => {
			todo.delete(req.params.id, res);
		});

		//This shows how to use axios params
		//app.get('/todo/id', (req, res) => {
		//	console.log("id is: ", req.query);
		//	todo.getByID(req.query.id, res);
		//});
	}
}