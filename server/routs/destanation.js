

var express = require('express');
var tickectRouter = express.Router();
var blPackege = require('./../BL/packegeService');


tickectRouter.get('/getAll',(req,res) => {
   blPackege.getDestanations().then((destanation) =>{
    res.json(destanation);
  }).catch(function(error) {
    console.log(error);
  });
});



module.exports = tickectRouter;