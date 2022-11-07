### What columns violate 1NF?
1- food_code  because of  non atomic values.

2- food_description  because of  non atomic values.

3- dinner_date it has more than one formate for the date data type. 



### What entities do you recognize that could be extracted?
- food 
- venue 
- dinner 
- member 


### Name all the tables and columns that would make a 3NF compliant solution

##### food  table
- food_id  INT PRIMARY KEY
- food_description  TEXT

##### venue  table
- venue_id  INT PRIMARY KEY
- venue_deescription  TEXT

##### dinner  table
- dinner_id  INT PRIMARY KEY
- dinner_date DATE
- food_id  INT FOREIGN KEY REFERENCES food(food_id) 

##### member  table
- member_id  INT PRIMARY KEY 
- member_name  VARCHAR(128)
- member_address  VARCHAR(200)

##### dinner_food  table
- id  INT PRIMARY KEY
- dinner_id  INT FOREIGN KEY REFERENCES dinner(dinner_id)
- food_id  INT FOREIGN KEY REFERENCES food(food_id)

##### dinner_venue  table
- id  INT PRIMARY KEY
- dinner_id  INT FOREIGN KEY REFERENCES dinner(dinner_id)
- venue_id  INT FOREIGN KEY REFERENCES venue(venue_id)

##### member_dinner  table
- id  INT PRIMARY_KEY
- member_id  INT FOREIGN KEY REFERENCES member(member_id)
- dinner_id  INT FOREIGN KEY REFERENCES dinner(dinner_id)
