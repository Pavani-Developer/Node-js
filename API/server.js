const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');


const app = express();


app.listen(3002,()=> console.log("Server running..."))
app.use(cors());
app.use(bodyParser.json());

// Set up MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'bangtan07',
  database: 'de',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Middleware for parsing JSON data
app.use(bodyParser.json());

// GET route to fetch data
// Define a route to fetch data from the database
app.get('/getvoters', (req, res) => {
  connection.query('SELECT * FROM voters', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error or Database connection Error' });
      return;
    }  
  
    // Send the fetched data as an API response
    res.json({ data: results });
  });
});

// UPDATE route to update data
app.put('/update/:Sno', (req, res) => {
  const { Sno } = req.params;
  const { PartNo, PartName, VoterId, Name, Guardian, GuardianName, Age, HNo } = req.body;

  const query = 'UPDATE your_table_name SET PartNo = ?, PartName = ?, VoterId = ?, Name = ?, Guardian = ?, GuardianName = ?, Age = ?, HNo = ? WHERE Sno = ?';

  const values = [PartNo, PartName, VoterId, Name, Guardian, GuardianName, Age, HNo, Sno];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ success: false, error: 'Internal Server Error or Database connection Error' });
      return;
    }

    // Check if any rows were affected to determine if the record was found
    if (results.affectedRows > 0) {
      res.json({
        success: true,
        data: { Sno: parseInt(Sno), PartNo, PartName, VoterId, Name, Guardian, GuardianName, Age, HNo },
      });
    } else {
      res.status(404).json({ success: false, message: 'Record not found' });
    }
  });
});

// Start the server
app.listen(3002, () => {
  console.log(`Server is running on port 3001`);
});
