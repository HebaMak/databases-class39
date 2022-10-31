const mysql = require('mysql')

const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "researches"
});


con.connect(err => {
  if(err) throw err
  console.log('database connected...')
})

const queries = [
  `SELECT research_papers.paper_title , COUNT(author_name)
      FROM authors
      LEFT JOIN author_paper 
      ON author_paper.author_id = authors.author_id
      LEFT JOIN research_papers
      ON research_papers.paper_id = author_paper.paper_id
      GROUP BY author_name`,
  
  `SELECT gender, COUNT(paper_title) FROM authors
      JOIN author_paper
      ON author_paper.author_id = authors.author_id
      JOIN research_papers
      ON research_papers.paper_id = author_paper.paper_id
      WHERE authors.gender = 'f'`,
    
  `SELECT  university, AVG(h_index) FROM authors
      GROUP BY university`,
  
  `SELECT university, COUNT(paper_title) FROM authors
      JOIN author_paper
      ON author_paper.author_id = authors.author_id
      JOIN research_papers
      ON research_papers.paper_id = author_paper.paper_id
      GROUP BY university`,
    
  `SELECT author_name, university, MAX(h_index), MIN(h_index)
      FROM authors
      GROUP BY university`
]


queries.forEach(query => {
  con.query(query , (err, results)=> {
    if(err) throw err
    console.table(results)
  })
})




