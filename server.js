const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const port = process.env.PORT || 8000;
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get('/users', function(req, res) {
  knex('users').then((result) => {
    //console.log(result)
    res.render('users',{userResults: result});
  })
  .catch((err) => {
    console.error(err)
  });
});

app.get('/profile/:id', function(req, res) {
  knex('users')
    .where('id', req.params.id)
    .limit(1)
    .then((result)=>{
      console.log(result[0]);
      res.render('profile',{userResults: result[0]});
    })
    .catch((err)=>{
      console.error(err);
    })
});

app.get('/edit/:id', function(req, res) {
  knex('users')
    .where('id', req.params.id)
    .limit(1)
    .then((result)=>{
      console.log(result[0]);
      res.render('edit', {userResults: result[0]});
    })
    .catch((err)=>{
      console.error(err);
    })
});

// Update one user
app.post('/edit/:id', function(req, res) {
  //console.log("******");
  //console.log(req.body);
  //console.log("req params - ", req.params.id);
  knex('users')
    .update(req.body)
    .where('id', req.params.id)
    .then((result) => {
      //console.log(result);
      res.redirect("/users");
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(400);
    });
});





app.listen(port, function() {
  console.log('Listening on', port);
});
