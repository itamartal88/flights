


var express = require('express');
var orderRouter = express.Router();
var blPackege = require('./../BL/packegeService');
var blDelete = require('./../BL/deleteFromDb');
var blUpdate = require('./../BL/updateToDb');

orderRouter.post('/number',(req,res) => {
   blPackege.checkOrderNumber(req.body.num).then((order) =>{
    res.json(order);
  }).catch(console.log())
});

orderRouter.post('/delete',(req,res) => {
  blDelete.deleteFromFlight(req.body,req.body.forthDate,req.body.destination).then((flight1) => {
  blDelete.deleteFromFlight(req.body,req.body.backDate,'Tel aviv').then((flight2) => {
  blDelete.deleteFromOrder(req.body._id).then((order) => {
    res.json(order);
    })
   })  
  }).catch(function(error) {
    console.log(error);
  });
})

orderRouter.post('/edit',(req,res) => {
 blUpdate.updateOrder(req.body).then((order) => {
   res.json(order);
 }).catch(function(error) {
  console.log(error);
});
});


module.exports = orderRouter;