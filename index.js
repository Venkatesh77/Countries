const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 80;

var sql = require('mssql/msnodesqlv8');
var config = {
	connectionString: 'Driver=SQL Server;Server=localhost\\SQLEXPRESS;Database=places;Trusted_Connection=true;'
};

server.listen(port, (err) => {
	if (err) {
		throw err;
	}
	var port = server.address().port;
	console.log("server is listening at port: %s", port);
});

// fetch all countries
app.get('/countries', (req, res) => {
	try {
		sql.connect(config, err => {
			if (err) {
				console.log("connection failed sql error: " + err);
			}
			new sql.Request().query('Select * from countries', (err, result) => {
				if (err) {
					console.log("connection ok but sql error: " + err);
				} else {
					res.json(result.recordset);
				};
			})
		});
	} catch (err) {
		console.log(err);
	}
});

// fetch all provinces for a country
app.get('/provinces', (req, res) => {
	try {
		sql.connect(config, err => {
			if (err) {
				console.log("connection failed sql error: " + err);
			}
			new sql.Request()
				.input('countryCode', sql.VarChar, req.query.code)
				.query('Select * from provinces where countrycode=@countryCode', (err, result) => {
				if (err) {
					console.log("connection ok but sql error: " + err);
				} else {
					res.json(result.recordset);
				};
			})
		});
	} catch (err) {
		console.log(err);
	}
});