const mysql = require('mysql')

const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world"
});

con.connect(err => {
  if (err) throw err;
  console.log('database connected...');
});

const queries = [
  'SELECT name, population FROM country WHERE population > 8000000',
  'SELECT name FROM country WHERE name LIKE "%land%"',
  'SELECT name , population FROM city WHERE population BETWEEN 500000 AND 1000000',
  'SELECT name FROM country WHERE Continent = "Europe"',
  'SELECT * FROM country ORDER BY surfaceArea DESC',
  'SELECT name, population FROM city WHERE name = "Rotterdam"',
  'SELECT name, surfaceArea FROM country ORDER BY surfaceArea DESC LIMIT 10',
  'SELECT name, population FROM city ORDER BY population DESC LIMIT 10',
  'SELECT SUM(population) FROM country'
]

queries.forEach(query => {
  con.query(query , (err , results) => {
    if (err) throw err;
    results.forEach(result => console.log(result))
  })
})