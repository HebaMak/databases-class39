const mysql = require('mysql')

const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "food_recipe"
});

con.connect(() => {
  con.query('DROP DATABASE IF EXISTS food_recipe');
  con.query('CREATE DATABASE food_recipe');
  con.query('USE food_recipe');

  con.query(`
    CREATE TABLE recipe(
    id INT PRIMARY KEY,
    name varchar(128) 
  )`);
  con.query(`
    CREATE TABLE ingredient(
    id INT PRIMARY KEY,
    name varchar(128) 
  )`);
  con.query(`
    CREATE TABLE step(
    id INT PRIMARY KEY,
    name varchar(128) 
  )`);
  con.query(`
    CREATE TABLE chef(
    id INT PRIMARY KEY,
    name varchar(128)
  )`);
  con.query(`
    CREATE TABLE category(
    id INT PRIMARY KEY,
    name varchar(128),
    chef_id INT,
    
    FOREIGN KEY (chef_id) REFERENCES chef(id)
    )`);
  con.query(`
    CREATE TABLE recipe_category(
    id INT PRIMARY KEY,
    recipe_id INT,
    category_id INT,
  
    FOREIGN KEY (recipe_id) REFERENCES recipe(id),
    FOREIGN KEY (category_id) REFERENCES category(id)
  )`);
  con.query(`
    CREATE TABLE recipe_ingredient(
    id INT PRIMARY KEY,
    recipe_id INT,
    ingredient_id INT,
  
    FOREIGN KEY (recipe_id) REFERENCES recipe(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(id)
  )`);
  con.query(`
    CREATE TABLE recipe_step(
    id INT PRIMARY KEY ,
    recipe_id INT, 
    step_id INT,
  
    FOREIGN KEY (recipe_id) REFERENCES recipe(id),
    FOREIGN KEY (step_id) REFERENCES step(id)
  )`);
  console.log('MySQL connected...');
});

