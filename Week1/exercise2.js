
const mysql = require('mysql')

const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world"
});

con.connect(() => {
  con.query("USE world");
  con.query('SELECT name, population FROM country WHERE population > 8000000');
  con.query('SELECT name FROM country WHERE name LIKE "%land%"');
  con.query('SELECT name , population FROM city WHERE population BETWEEN 500000 AND 1000000');
  con.query('SELECT name FROM country WHERE Continent = "Europe"');
  con.query('SELECT * FROM country ORDER BY surfaceArea DESC');
  con.query('SELECT name, population FROM city WHERE name = "Rotterdam"');
  con.query('SELECT name, surfaceArea FROM country ORDER BY surfaceArea DESC LIMIT 10');
  con.query('SELECT name, population FROM city ORDER BY population DESC LIMIT 10');
  con.query('SELECT SUM(population) FROM country'); 
});