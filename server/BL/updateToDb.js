

var dbCostumer = require('./../db/dbCostumer');
var dbDestanation = require('./../db/dbDestanations');
var dbOrder = require('./../db/dbOrders');
var dbFlight = require('./../db/dbFlights');

function updateFlight(flight,order){
    return new Promise((resolve,reject) => { 
    dbFlight.update({_id:flight._id},{$push: {passengers:order._id}},
        {upsert: true},function(err,callback){
            if(err) throw err;
            resolve(callback);  
        }
    )   
 })    
}

function updateOrder(order){
    return new Promise((resolve,reject) => { 
    dbOrder.update({_id:order._id},{$set: {price:order.price, numOfPersons:order.numOfPersons,
    foodIncloud:order.foodIncloud, baggageIncloud:order.baggageIncloud,
    destination:order.destination,forthDate:order.forthDate,backDate:order.backDate }},
    {upsert: true},function(err,callback){
        if(err) throw err;
        resolve(callback);  
    }
      )
    })       
}




module.exports = {
    updateFlight,
    updateOrder
}