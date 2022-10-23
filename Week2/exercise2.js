const mysql = require('mysql')

const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "researches"
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

  //add column mentor to table authors 
  con.query(`ALTER TABLE authors ADD mentor INT`);

  //add foreign key to mentor references to author_id  
  con.query(`ALTER TABLE authors ADD FOREIGN KEY (mentor) REFERENCES authors(author_id) `);

  //create table research_Papers
  con.query(`CREATE TABLE research_Papers (
    paper_id INT PRIMARY KEY AUTO_INCREMENT, 
    paper_title VARCHAR(128), 
    conference VARCHAR(128), 
    publish_date DATE
  )`)

   //create table author_paper
  con.query(`CREATE TABLE author_paper (
    id INT PRIMARY KEY AUTO_INCREMENT,
    author_id INT,
    paper_id INT,
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id)
  )`)

  //insert 15 authors to author table 
  con.query(`INSERT authors(author_name, university, date_of_birth, h_index, gender, mentor)
      VALUES('Heba', 'Amsterdam University', '1969-11-10', 4 , 'f', 1),
            ('Lydia', 'Eindhoven University', '2002-03-13', 9 , 'f', 2),
            ('Walaa', 'Rotterdam University', '1992-08-10', 7 , 'f', 3),
            ('Hind', 'Utercht University', '1988-02-19', 8 , 'f', 1),
            ('Hany', 'Tilburg University', '2000-01-05', 4 , 'M', 5),
            ('Goerge', 'Groningen University', '1993-04-10', 7 , 'M', 1),
            ('Gloria', 'Arnhem University', '1993-11-20', 15 , 'f', 5),
            ('Basma', 'Leiden University', '1975-12-25', 10 , 'f', 1),
            ('Amged', 'Haarlem University', '1985-09-06', 12 , 'M', 5),
            ('Ahmed', 'Maastricht University', '1987-10-10', 5 , 'M', 9),
            ('Joe', 'Apeldoorn University', '1990-12-05', 13 , 'M', 8),
            ('Jane', 'Breda University', '1991-12-12', 2 , 'f', 10),
            ('Michel', 'Zoetermer University', '1976-08-15', 3 , 'M', 9),
            ('Mina', 'Dordrecht University', '1989-05-.2', 5 , 'M', 8),
            ('Maya', 'Haag University', '1974-06-09', 10 , 'f', 1)
      `)

  

  //insert 30 research papers to  research_Papers table 
  con.query(`INSERT research_Papers(paper_title, conference, publish_date) 
      VALUES('Exploring the interplay between full-lifecycle learning design tooling and teacher professional development',
            'Information technology Research','2014-01-18'),
            ('The psychology of meaningful verbal learning','Information technology Research','2017-12-21'),
            ('Social web and health research','Information technology Research','2012-11-21'),
            ('The history of the Chinese Empire over the millennia','History Research','2020-09-24'),
            ('The rise and fall of Ancient Greek city-states','History Research','2014-10-13'),
            ('The underlying causes of the World War I','History Research','2020-05-29'),
            ('Do men and women have different short-term memory mechanisms?','Psychology Research','2014-07-26'),
            ('Tricking the taste buds: how does smell affect the taste?','Psychology Research','2020-10-31'),
            ('Is autism a disease or a natural variation of the norm?','Psychology Research','2010-03-15'),
            ('Eating behaviors in different cultures','Psychology Research','2019-07-17'),
            ('Differences and similarities in the behavioral patterns of diverse cultures','Psychology Research','2020-01-11'),
            ('How motivation plays a role in human development','Psychology Research','2014-05-24'),
            ('An examination of the causes and results of drug and alcohol abuse','Psychology Research','2011-05-13'),
            ('The impact of music genres on how the brain works','Psychology Research','2021-01-05'),
            ('Individualized vs. group learning: which is better suited for current reality?','Education Research','2015-11-09'),
            ('How should the education system approach children with special needs?','Education Research','2017-07-24'),
            ('Is cheating on tests an expression of an educational failure?','Education Research','2014-11-25'),
            ('The impact of advertisements and commercials on how people comprehend the world','Business Research','2013-12-08'),
            ('Social models mass media bestows on teenagers and adults','Social Media Research','2015-03-15'),
            ('Human dependence on computers: beneficial or harmful','Information technology Research','2013-05-05'),
            ('Large-scale recycling methods and their effectiveness in reducing waste','Science Research','2018-07-20'),
            ('People’s impact on climate change: the cost of a technological breakthrough','Science Research','2020-10-01'),
            ('Strategies for prevention of obesity and associated heart disease risks','Health Research','2016-10-14'),
            ('Analyze the experiences of children with autism in school and at home','Health Research','2013-10-16'),
            ('The impact of diet on health', 'Health Research', '2019-05-26'),
            ('Social media marketing strategies and the determinants of success','Business Research','2010-01-24'),
            ('Classic vs modern poetry', 'Literature Research', '2016-03-19'),
            ('Culture and literature: which affects which?','Literature Research','2010-11-04'),
            ('The threat of terrorism in a world without ISIS','Politic Research','2019-04-22'),
            ('Causes of world hunger', 'Politic Research', '2012-11-22')
          `)
          
 //insert 30 rows to author_paper table
  con.query(`INSERT author_paper(author_id, paper_id) 
              VALUES(5,27),(14,5),(12,25),(9,18),(1,10),(6,11),(13,29),(7,12),(13,14),(15,8),
              (11,6),(2,7),(8,19),(6,17),(13,16),(12,23),(4,9),(3,28),(8,15),(2,13),
              (3,24),(11,4),(5,22),(1,20),(4,21),(10,1),(15,30),(7,26),(9,2),(10,3)
            `)
});







