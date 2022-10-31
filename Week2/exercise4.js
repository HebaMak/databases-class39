const mysql = require('mysql')

const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "researches"
});


con.connect(() => {
  
  con.query(`
    SELECT research_papers.paper_title , COUNT(author_name)
      FROM authors
      LEFT JOIN author_paper 
      ON author_paper.author_id = authors.author_id
      LEFT JOIN research_papers
      ON research_papers.paper_id = author_paper.paper_id
      GROUP BY author_name;
  `);

  con.query(`
    SELECT gender, COUNT(paper_title) FROM authors
      JOIN author_paper
      ON author_paper.author_id = authors.author_id
      JOIN research_papers
      ON research_papers.paper_id = author_paper.paper_id
      WHERE authors.gender = 'f';
  `);

  con.query(`
    SELECT  university, AVG(h_index) FROM authors
      GROUP BY university;
  `);

  con.query(`
    SELECT university, COUNT(paper_title) FROM authors
      JOIN author_paper
      ON author_paper.author_id = authors.author_id
      JOIN research_papers
      ON research_papers.paper_id = author_paper.paper_id
      GROUP BY university
  `);

  con.query(`
    SELECT author_name, university, MAX(h_index), MIN(h_index)
      FROM authors
      GROUP BY university;
  `);

});




