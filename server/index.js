const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
   host: 'localhost',
   user: 'lott',
   password: '9503',
   database: 'cruddb',
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {

   const sql_select = 
      "SELECT * FROM movie_reviews;"
   db.query(sql_select, (err, result) => {
      res.send(result)
   })
});

app.post("/api/insert", (req, res) => {
   const movie_name = req.body.movie_name
   const movie_review = req.body.movie_review

   const sql_insert = "INSERT INTO movie_reviews (movie_name, movie_review) VALUES (?, ?);"
   db.query(sql_insert, [movie_name, movie_review], (err, result) => {
      if (err) console.log(err)
   })
});

app.delete("/api/delete", (req, res) => {
   const movie_name = req.body.movie_name
   const sql_delete = "DELETE FROM movie_reviews WHERE movie_name = ?;"

   db.query(sql_delete, movie_name, (err, result) => {
      if (err) console.log(err)
   })
});

app.put("/api/update", (req, res) => {
   const movie_name = req.body.movie_name
   const movie_review = req.body.movie_review
   const sql_update = "UPDATE movie_reviews SET movie_review = ? WHERE movie_name = ?;"

   db.query(sql_update, [movie_review, movie_name], (err, result) => {
      if (err) console.log(err)
   })
});

app.listen(3001, () => {
   console.log("running on port 3001");
});

