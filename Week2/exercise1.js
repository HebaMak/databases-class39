const mysql = require('mysql')

const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword"
});


con.connect(() => {
  con.query('DROP DATABASE IF EXISTS researches');
  con.query('CREATE DATABASE researches');
  con.query('USE researches');

  //create table authors
  con.query(`CREATE TABLE authors(
    author_id INT PRIMARY KEY AUTO_INCREMENT, 
    author_name VARCHAR(128), 
    university VARCHAR(128), 
    date_of_birth DATE, 
    h_index INT, 
    gender ENUM('m', 'f')
    )`);

  //add column mentor  
  con.query(`ALTER TABLE authors ADD mentor INT`);

  //add foreign key to mentor references to author_id  
  con.query(`ALTER TABLE authors ADD FOREIGN KEY (mentor) REFERENCES authors(author_id)`);
});




