const mysql = require('mysql')

const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "researches"
});


con.connect(() => {
  con.query('USE researches');
  
  con.query(`
      SELECT author_name , mentor FROM authors;
  `);       
  
  con.query(`
      SELECT *, paper_title 
        FROM authors 
        LEFT JOIN author_paper
        ON author_paper.author_id = authors.author_id
        LEFT JOIN research_papers
        ON research_papers.paper_id = author_paper.paper_id;
  `);


});




