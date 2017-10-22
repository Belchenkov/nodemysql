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

// Insert post 
app.get('/addpost', (req, res) => {
    let post = {
        title: 'Post Two',
        body: 'This is post number Two'
    };
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;

        console.log(result);
        res.send('Record was Added ... ');
    });
});

// SELECT posts 
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, result) => {
        if (err) throw err;

        console.log(result);
        res.send('Posts fetched ... ');
    });
});


// SELECT Single Post 
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;

        console.log(result);
        res.send('Post fetched ... ');
    });
});

// Update Post 
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `UPDATE posts SET title='${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;

        console.log(result);
        res.send('Post updated ... ');
    });
});

// Delete Post 
app.get('/deletepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `DELETE FROM posts  WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;

        console.log(result);
        res.send('Post deleted ... ');
    });
});


const port = '3007';
app.listen(port, () => {
    console.log('Server is running on http://localhost:'+port);
});