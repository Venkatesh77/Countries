const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 80;

// var sql = require('mssql');
// var config = {
// 	connectionString: 'Driver=SQL Server;Server=localhost\\SQLEXPRESS;Database=places;Trusted_Connection=true;'
// };
// not able to deploy with mssql package in heroku

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
		// commented code works in local
	   /*	sql.connect(config, err => {
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
		}); */
		var countries = [
						{"name": "India", "Code": "IN", "PhoneCode":"+91"}, 
						{"name": "America", "Code": "US", "PhoneCode":"+1"},
						{"name": "Brazil", "Code": "BR", "PhoneCode":"+55"},
						{"name": "Singapore", "Code": "SG", "PhoneCode":"+65"}
					];
		res.json(countries);
	} catch (err) {
		console.log(err);
	}
});

// fetch all provinces for a country
app.get('/provinces', (req, res) => {
	try {
		/*sql.connect(config, err => {
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
		}); */
		var code =  req.query.code;
		var indiaProvinces = [
			{"CountryCode": "IN", "Code": "MAS", "Name":"Chennai"}, 
			{"CountryCode": "IN", "Code": "BGLR", "Name":"Bangalore"}, 
			{"CountryCode": "IN", "Code": "KL", "Name":"Kerala"}, 
			{"CountryCode": "IN", "Code": "UP", "Name":"Uttar Pradesh"}, 
		];
		var ameriaProvinces = [
			{"CountryCode": "US", "Code": "TX", "Name":"Texas"}, 
			{"CountryCode": "US", "Code": "FL", "Name":"Florida"}, 
			{"CountryCode": "US", "Code": "NY", "Name":"New York"}, 
			{"CountryCode": "US", "Code": "AL", "Name":"Alabama"}, 
		];
		var provinces = [];
		if(code.toUpperCase() == "IN"){
			provinces = indiaProvinces		
		}else if(code.toUpperCase() == "US"){
			provinces = ameriaProvinces
		}
		res.json(provinces);
	} catch (err) {
		console.log(err);
	}
});