var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res) {
knex.raw(`select * from shops`).then(function(shops){
  res.render('shopsViews/allShops', {
    shops:shops.rows});
  });
});

router.get('/new', function(req, res) {
res.render('shopsViews/addShop');

});

router.post('/',function(req,res){
  knex.raw(`insert into shops (name,city) values('${req.body.name}','${req.body.city}')`).then(function(){
    res.redirect('/');
  });
});


router.get('/:id', function(req, res) {
  knex.raw(`select * from shops where id = ${req.params.id}`).then(function(shops){
    res.send(shops.rows);
  });
});


router.post('/', function(req,res){
  knex.raw(`insert into shops (name,city) values('${req.body.name}','${req.body.city}')`).then(function(){

    knex.raw(`select * from shops`).then(function(shops){
      res.send(shops.rows);
    });
  });
});


router.patch('/:id', function(req, res) {
knex.raw(`update shops
  set
  name = '${req.body.name}',
  city = '${req.body.city}'
  WHERE id = ${req.params.id}
  `).then(function(){
    knex.raw(`select * from shops`).then(function(shops){
      res.send(shops.rows);
    });
  });
});


router.delete('/:id',function(req,res){
  knex.raw(`delete from shops WHERE id = ${req.params.id}`).then(function(){
    knex.raw(`select * from shops`).then(function(shops){
    res.send(shops.rows);
    });
  });
});

module.exports = router;
