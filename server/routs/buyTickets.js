

var express = require('express');
var tickectRouter = express.Router();
var blPackege = require('./../BL/packegeService');
var blInsert = require('./../BL/insertTodb');


tickectRouter.post('/order',(req,res) => {
   blPackege.getCostumer(req.body).then((costumer) =>{
   blInsert.insertOrderToDb(costumer,req.body).then((order) => {
   blPackege.checkIfFlightExcist(order[0],req.body.dates[0],req.body.dest[0],req.body.dest[1]).then((flight1) => {
   blPackege.checkIfFlightExcist(order[0],req.body.dates[1],req.body.dest[1],req.body.dest[0]).then((flight2) => {
    res.json(order);
     }) 
    })  
   })  
  }).catch(function(error) {
    console.log(error);
  });
});

module.exports = tickectRouter;