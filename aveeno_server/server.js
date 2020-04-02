const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3800;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const dbparams = fs.readFileSync('./database.json');
const dbconfig = JSON.parse(dbparams);
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    port: dbconfig.port,
    database: dbconfig.database
});
conn.connect();

app.get('/', (req, res) => {
    res.send({ message: "hihello"});
});

app.get('/health', (req, res) => {
    res.send(new Date());
});

app.get('/api/characters', (req, res) => {
    let sql = ''
        + 'SELECT seq, image, cName, gender, role, releaseDate, releaseTitle, createdDatetime, isDeleted'
        + ' FROM characters'
        + ' ORDER BY seq DESC';
    conn.query(sql,
        (err, rows) => {
            if (err) res.send(err);
            else res.send(rows);
        }
    );
});

app.post('/api/characters', (req, res) => {
    // console.log('POST:/api/characters');
    let sql = ''
        + 'INSERT INTO characters('
        + 'image, cName, gender, role, releaseTitle, releaseDate, createdDatetime, isDeleted'
        + ') VALUES('
        + '?, ?, ?, ?, ?, ?, now(), 0)';
    let params = [
        req.body.image
        , req.body.cName
        , req.body.gender
        , req.body.role
        , req.body.releaseTitle
        , req.body.releaseDate];
    // console.log(params);
    conn.query(sql, params,
        (err, rows, fields) => {
            if (err) res.send(err);
            else res.send(rows);
        }
    );
})

app.delete('/api/characters/:seq', (req, res) => {
    let sql = ''
        + 'UPDATE characters SET isDeleted = 1 WHERE seq = ?';
    let params = [req.params.seq];
    conn.query(sql, params,
        (err, rows, fields) => {
            if (err) res.send(err);
            else res.send(rows);
        }
    )
})

app.listen(port, () => console.log(`> Listening on port: ${port}`));
