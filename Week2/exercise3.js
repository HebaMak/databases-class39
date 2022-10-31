const mysql = require('mysql')

const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "researches"
});


con.connect( err => {
  if(err) throw err
  console.log('database connected...')
})

const queries = [
  `SELECT t1.author_name AS Author, t2.author_name AS Mentor
    FROM authors AS t1 
    INNER JOIN authors AS t2
    ON t1.mentor = t2.author_id`,
    
  `SELECT *, paper_title 
    FROM authors 
    LEFT JOIN author_paper
    ON author_paper.author_id = authors.author_id
    LEFT JOIN research_papers
    ON research_papers.paper_id = author_paper.paper_id`
]
  
queries.forEach(query => {
  con.query(query , (err, results) => {
    if(err) throw err
    console.table(results)
  })
})  





