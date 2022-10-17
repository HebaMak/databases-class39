
const mysql = require('mysql')

const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup"
});


con.connect(() => {
  con.query("USE meetup");
  con.query(`DROP TABLE Invitee, Room, Meeting`);
  con.query(`CREATE TABLE Invitee (
    invitee_no INT PRIMARY KEY, 
    invitee_name TEXT, 
    invited_by TEXT
  )`);

  con.query(`CREATE TABLE Room (
    room_no INT PRIMARY KEY, 
    room_name TEXT , 
    floor_number INT
  )`);

  con.query(`CREATE TABLE Meeting (
    meeting_no INT PRIMARY KEY,
    meeting_title TEXT, 
    starting_time DATETIME, 
    ending_time DATETIME,
    room_no INT, 
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
  )`);

  con.query(`INSERT INTO Invitee 
    Value (1,'Heba' , 'Lydia'),
    (2,'Hnya' , 'Lydia'),
    (3,'Haya' , 'Gloria'),
    (4, 'Lydia' , 'Gorege') , 
    (5, 'Heba' , 'Lolo')`);

  con.query(`INSERT INTO Room 
  Value ( 1, 'Conference Room', 3), 
  (2, 'STudying Room', 2) ,
  (3, 'Training Room', 5) , 
  (4, 'Leardership Room', 5), 
  (5, 'Meetings room', 4)`);
  
  con.query(`INSERT INTO meeting VALUES 
  (1,'Startup meeting', '2022-10-01 09:00:00','2022-10-01 12:30:00', 4),
  (2,'Leadership meeting', '2022-10-05 12:00:00','2022-10-05 14:00:00', 2),
  (3,'Expansion meeting', '2022-11-10 13:00:00','2022-11-10 15:00:00', 5),
  (4,'Training meeting', '2022-11-15 09:00:00','2022-11-15 12:00:00', 1),
  (5,'Solving problems meeting', '2022-12-15 10:30:00','2022-12-15 13:30:00', 3)`);

});