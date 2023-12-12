const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();


app.listen(3001,()=> console.log("Server running..."))
app.use(cors());
app.use(bodyParser.json()); // Add this line to parse JSON data


// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',  // Your local MySQL server address
    user: 'root',  // Your MySQL username
    password: 'bangtan07',  // Your MySQL password
    database: 'de', //Your database Schema
    port: 3306,
});

// checking the Connect to the database
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to the database');
  });

// Define a route to fetch data from the database
app.get('/getdata', (req, res) => {
    connection.query('SELECT * FROM mamu', (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error or Database connection Error' });
        return;
      }  
    
      // Send the fetched data as an API response
      res.json({ data: results });
    });
  });

  
// Define a route to handle POST requests
app.post('/adddata', (req, res) => {
  const formData = req.body;
  console.log('Received form data:', formData);
  const { Name, Number, Email, FatherName, Age } = req.body;

  // Validate the incoming data
  if (!Name || !Number || !Email || !FatherName || !Age ) {
      return res.status(400).json({ error: 'Invalid data. Please provide all required fields.' });
  }

  // Insert data into the database
  const query = 'INSERT INTO mamu (Name, Number, Email, FatherName, Age) VALUES (?, ?, ?, ?, ?)';
  const values = [Name, Number, Email, FatherName, Age];

  connection.query(query, values, (err, results) => {
      if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error or Database connection Error' });
          return;
      }

      // Send a success response
      res.json({ message: 'Data added successfully', data: results });
  });
});

app.put('/update/:Sno', (req, res) => {
  const { Sno } = req.params; 
  const { Name } = req.body;

  // Update data in the MySQL database
  const query = 'UPDATE mamu SET Name = ? WHERE Sno = ?';
  const values = [Name, Sno];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error or Database connection Error' });
      return;
    }

    // Check if any rows were affected to determine if the record was found
    if (results.affectedRows > 0) {
      // Send a success response with the updated data
      res.json({ success: true, data: { Sno: parseInt(Sno), Name: Name } });
    } else {
      // Send a 404 response if the item with the specified Sno is not found
      res.status(404).json({ success: false, message: 'Record not found' });
      console.log(results);
      console.log(values);
    }
  });
});