const mysql = require('mysql')

const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "accounts"
});


con.connect(() => {
  try {
  con.query(`SET AUTOCOMMIT = false`)
    con.query(`START TRANSACTION`)
    con.query(`
      UPDATE account 
      SET balance = balance - 1000 
      WHERE account_number = 101 `);
  
    con.query(`
      UPDATE account 
      SET balance = balance + 1000 
      WHERE account_number = 102 `);
  
    con.query(`
      INSERT INTO account_changes (account_number, amount, changed_date, remark) 
        VALUES(101, -1000 , '2022-10-01', 'shopping'),
              (102, 1000 , '2022-10-01', 'received')
      `);
    
    con.query(`COMMIT`)
  }
  catch (err){
    con.query(`ROLLBACK`)
  }

})



