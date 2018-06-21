


var dbCostumer = require('./../db/dbCostumer');
var dbDestanation = require('./../db/dbDestanations');
var dbOrder = require('./../db/dbOrders');
var dbFlight = require('./../db/dbFlights');

function deleteFromFlight(order,date,dest){
    console.log(order);
    return new Promise((resolve,reject) => { 
    dbFlight.update({destination:dest,date:date},{$pull:{passengers:order._id}},
        {upsert: true},function(err,callback){
            if(err) throw err;
            resolve(callback);  
      }
    )  
 })    
}

function deleteFromOrder(id){
    return new Promise((resolve,reject) => {   
    dbOrder.deleteOne({_id:id},(err,res) => {
        if(err) throw err;
        resolve(res);  
    })
    })     
}



module.exports = {
    deleteFromFlight,
    deleteFromOrder
}