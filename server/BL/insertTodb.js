

var dbCostumer = require('./../db/dbCostumer');
var dbDestanation = require('./../db/dbDestanations');
var dbOrder = require('./../db/dbOrders');
var dbFlight = require('./../db/dbFlights');

function insertCostumerToDb(costumer){
    return new Promise((resolve,reject) => {
    var objInsert = new dbCostumer({
        name:costumer.name,
        email:costumer.mail
    });
        objInsert.save(function(err, response) {
           if (err) throw err;
          resolve([objInsert]);
      });
    })    
}

function insertOrderToDb(costumer,order){
    return new Promise((resolve,reject) => { 
        var objInsert = new dbOrder({
            costumerId:costumer[0]._id,
            price:order.price,
            numOfPersons:order.numberOfPersons,
            foodIncloud:order.food,
            baggageIncloud:order.baggege,
            destination:order.dest[0],
            forthDate:order.dates[0],
            backDate:order.dates[1]
        });
            objInsert.save(function(err, response) {
               if (err) throw err;
              resolve([objInsert]);
          });
    })
}

function insertFlightToDb(order,date,dest,origin){
    console.log(order);
    return new Promise((resolve,reject) => { 
        var objInsert = new dbFlight({
            destination:dest,
            date:date,
            CountryOfOrigin:origin,
            passengers:order._id
        });
            objInsert.save(function(err, response) {
               if (err) throw err;
              resolve([objInsert]);
          });
    })    
}

module.exports = {
    insertCostumerToDb,
    insertOrderToDb,
    insertFlightToDb
}