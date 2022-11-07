const mysql = require('mysql')

const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

con.connect(() => {
  con.query(`DROP DATABASE IF EXISTS accounts`);
  con.query(`CREATE DATABASE accounts`);
  con.query(`USE accounts`);
  
  con.query(`CREATE TABLE account (
    account_number INT PRIMARY KEY AUTO_INCREMENT, 
    balance INT
  )`);
  
  con.query(`CREATE TABLE account_changes (
    change_number INT PRIMARY KEY AUTO_INCREMENT, 
    account_number INT,
    amount DECIMAL(10,3),
    changed_date DATE,
    remark VARCHAR(128),
    FOREIGN KEY (account_number) REFERENCES account(account_number)
  )`);

  con.query(`ALTER TABLE account AUTO_INCREMENT = 100`)
})