### What columns violate 1NF?
1- food_code  because of  non atomic values.

2- food_description  because of  non atomic values.



### What entities do you recognize that could be extracted?
- food 
- venue 
- dinner 
- member 


### Name all the tables and columns that would make a 3NF compliant solution

##### food  table
- food_code  INT PRIMARY KEY
- food_description  VARCHAR(200)

##### venue  table
- venue_code  INT PRIMARY KEY
- venue_deescription  VARCHAR(200)

##### dinner  table
- dinner_id  INT PRIMARY KEY
- dinner_date DATE
- food_code  INT FOREIGN KEY REFERENCES food(food_code) 

##### member  table
- member_id  INT PRIMARY KEY 
- member_name  VARCHAR(128)
- member_address  VARCHAR(200)

##### dinner_food  table
- id  INT PRIMARY KEY
- dinner_id  INT FOREIGN KEY REFERENCES dinner(dinner_id)
- food_code  INT FOREIGN KEY REFERENCES food(food_code)

##### dinner_venue  table
- id  INT PRIMARY KEY
- dinner_id  INT FOREIGN KEY REFERENCES dinner(dinner_id)
- venue_id  INT FOREIGN KEY REFERENCES venue(venue_code)

##### member_dinner  table
- id  INT PRIMARY_KEY
- member_id  INT FOREIGN KEY REFERENCES member(member_id)
- dinner_id  INT FOREIGN KEY REFERENCES dinner(dinner_id)
