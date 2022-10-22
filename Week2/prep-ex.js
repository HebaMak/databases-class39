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
    id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar(128) 
  )`);
  con.query(`
    CREATE TABLE ingredient(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar(128) 
  )`);
  con.query(`
    CREATE TABLE step(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar(128) 
  )`);
  con.query(`
    CREATE TABLE chef(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar(128)
  )`);
  con.query(`
    CREATE TABLE category(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar(128),
    chef_id INT,
    
    FOREIGN KEY (chef_id) REFERENCES chef(id)
    )`);
  con.query(`
    CREATE TABLE recipe_category(
    id INT PRIMARY KEY AUTO_INCREMENT,
    recipe_id INT,
    category_id INT,
  
    FOREIGN KEY (recipe_id) REFERENCES recipe(id),
    FOREIGN KEY (category_id) REFERENCES category(id)
  )`);
  con.query(`
    CREATE TABLE recipe_ingredient(
    id INT PRIMARY KEY AUTO_INCREMENT, 
    recipe_id INT,
    ingredient_id INT,
  
    FOREIGN KEY (recipe_id) REFERENCES recipe(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(id)
  )`);
  con.query(`
    CREATE TABLE recipe_step(
    id INT PRIMARY KEY AUTO_INCREMENT,
    recipe_id INT, 
    step_id INT,
  
    FOREIGN KEY (recipe_id) REFERENCES recipe(id),
    FOREIGN KEY (step_id) REFERENCES step(id)
  )`);

  con.query(`INSERT recipe(name) VALUES('No-Bake Cheesecake'),('Roasted Brussels Sprouts'),('Mac & Cheese'),('Tamagoyaki Japanese Omelette')`);
  
  con.query(`INSERT category(name) VALUES('Cake'),('No-Bake'),('Vegetarian'),('Gluten-Free'),('Japanese')`);
  
  con.query(`INSERT ingredient(name) VALUES('Condensed milk'),('Cream Cheese'),('Lemon Juice'),('Pie Crust'),('Cherry Jam'),('Brussels Sprouts'),
  ('Sesame seeds'),('Pepper'),('Salt'),('Olive oil'),('Macaroni'),('Butter'),('Flour'),('Milk'),('Shredded Cheddar cheese'),
  ('Eggs'),('Soy sauce'),('Sugar')`);
  
  con.query(`INSERT step(name) VALUES('Beat Cream Cheese'),('Add condensed Milk and blend'),('Add Lemon Juice and blend'),
  ('Add the mix to the pie crust'),('Spread the Cherry Jam'),('Place in refrigerator for 3h'),('Preheat the oven'),
  ('Mix the ingredients in a bowl'),('Spread the mix on baking sheet'),('Bake for 30'),('Cook Macaroni for 8'),
  ('Melt butter in a saucepan'),('Add flour, salt, pepper and mix'),('Add Milk and mix'),('Cook until mix is smooth'),
  ('Add cheddar cheese'),('Add the macaroni'),('Beat the eggs'),('Add soya sauce , sugar and salt'),('Add oil to a sauce pan'),
  ('Bring to medium heat'),('Add some mix to the sauce pan'),('Let is cook for 1'),('Remove pan from fire')`);

  con.query(`INSERT recipe_category(recipe_id , category_id) VALUES(1,1),(1,2),(1,3),(2,3),(2,4),(3,3),(4,3),(4,5)`);
  
  con.query(`INSERT recipe_ingredient(recipe_id , ingredient_id) VALUES(1,1),(1,2),(1,3),(1,4),(1,5),(2,6),(2,3),(2,7),(2,8),(2,9),(2,10),(3,11),(3,12),
  (3,13),(3,9),(3,8),(3,14),(3,15),(4,16),(4,17),(4,18),(4,9),(4,10)`);
  
  con.query(`INSERT recipe_step(recipe_id , step_id) VALUES(1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(2,7),(2,8),(2,9),(2,10),
  (3,11),(3,12),(3,13),(3,14),(3,15),(3,16),(3,17),(4,18),(4,19),(4,20),(4,21),(4,22),(4,23),(4,24)`);



  console.log('MySQL connected...');
});

