const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const  cors = require('cors');

app.use(express.json());
app.use(cors());
dotenv.config();

//CONNECT TO DATABASE ***
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
);

//testing connection to db
db.connect((err)=>{
    //if not successful
    if(err) {
        return console.log(err);
    }
    // if successful
    else{
        console.log('connected to database')
    }
    
})
//get method
app.set('view engine','ejs');
app.set('views',__dirname + '/views')

// Question 1 goes here
// Retrieve all patients
app.get('/patients', (req, res) => {
    const query = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients";
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error retrieving patients" });
      } else {
        res.render('patients', {result: result});
      }
    });
  });

// Question 2 goes here

// Retrieve all providers
app.get('/providers', (req, res) => {
    const providerquery = "SELECT first_name, last_name, provider_specialty FROM providers";
    db.query(providerquery, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error retrieving providers" });
      } else {
        res.render('providers',{result: result});
      }
    });
});

// Question 3 goes here
// Filter patients by First Name
app.get('/patients/first_name', (req, res) => {
    const firstName = req.query.first_name; // Get first name from query parameter

    // Check if firstName is provided
    if (!firstName) {
        return res.status(400).send({ message: "First name is required" });
    }

    const query = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?";
    db.query(query, [firstName], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Error retrieving patients" });
        } else {
            res.render('patients', { result: result });
        }
    });
});

// Question 4 goes here
// Retrieve all providers by their specialty
app.get('/providers/provider_specialty', (req, res) => {
    const specialty = req.query.provider_specialty; // Get specialty from query parameter

    // Check if specialty is provided
    if (!specialty) {
        return res.status(400).send({ message: "Specialty is required" });
    }

    const specialty_query = "SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?";
    db.query(specialty_query, [specialty], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Error retrieving providers" });
        } else {
            res.render('providers', { result: result });
        }
    });
});



// listen to the server
const PORT = 3301
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})










