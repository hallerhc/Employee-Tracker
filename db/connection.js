const mysql = require("mysql2");


// Connect to database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: '',
      database: 'employees'
    },
    console.log(`Connected to the employees database.`)
  );
  

  connection.connect((err) => {
    if(err) throw err 
  })

 module.exports = connection;  
