const mysql = require('mysql')

const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "accounts"
});

con.connect(() => {
  con.query(`INSERT INTO account (balance) VALUES (250000), (450000), (550000), (700000), (950000)`);
  con.query(`INSERT INTO account_changes (account_number, amount, changed_date, remark) 
  VALUES (102, 9000 , '2022-10-01', 'salary'), (104, -1500, '2022-09-15', 'rent'),
  (101, -500, '2022-09-19', 'car installment'), (103, -200, '2022-09-10', 'insurance'),
  (102, -700, '2022-9-25', 'purchases' )`);
})