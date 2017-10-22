const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }

    console.log('MySQL Connected ...');
});

const app = express();

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE `nodemysql1`';
    db.query(sql, (err, result) => {
        if (err) throw err;

        res.send('Database created ... ');
    });
});

// Create Table
app.get('/createpoststable', (req, res) => {
    let sql = `CREATE TABLE posts(
        id int AUTO_INCREMENT,
        title VARCHAR(255),
        body VARCHAR(255),
        PRIMARY KEY (id)
    )`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Table was created ... ');
    });
});


const port = '3007';
app.listen(port, () => {
    console.log('Server is running on http://localhost:'+port);
});