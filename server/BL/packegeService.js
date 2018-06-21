

var dbCostumer = require('./../db/dbCostumer');
var dbDestanation = require('./../db/dbDestanations');
var dbFlight = require('./../db/dbFlights');
var dbOrder = require('./../db/dbOrders');
var insertToDb = require('./insertTodb');
var updateToDb = require('./updateToDb');

function getCostumer(costumer){
        return new Promise((resolve,reject) => {
            dbCostumer.find({email:costumer.mail},(err,costumers) => { 
            if(costumers.length == 0){
                insertToDb.insertCostumerToDb(costumer).then((insertedCos) => {
                    resolve(insertedCos);
                })
            }else if(costumers.length > 0){
                resolve(costumers);
            }
            else{
                reject(Error("no costumers"));
            }
        })
    })
}

function getDestanations(){
    return new Promise((resolve,reject) => {
        dbDestanation.find({},(err,destanation) => { 
        if(destanation.length > 0){
            resolve(destanation);
        }else{
            reject(Error("not found destanations"));
        }
    })
})
}

function getShortDate(date){
    var dateObj = new Date(date);
    var month = dateObj.getUTCMonth() + 1; 
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = year + "/" + month + "/" + day;
    return newdate;
}

function checkIfFlightExcist(order,date,dest,origin){
    return new Promise((resolve,reject) => {
     var newdate = getShortDate(date);  
    dbFlight.find({date: newdate,destination:dest,CountryOfOrigin:origin},(err,flight) => {
        if(flight.length == 0){
          insertToDb.insertFlightToDb(order,newdate,dest,origin).then((getFlight) => {
              resolve(getFlight);
          })  
        }else if(flight.length > 0){
     updateToDb.updateFlight(flight[0],order).then((upFlight) => {
        resolve(upFlight);
      })
      }else{
        reject(Error("not found flights"))  
      }
     })
    })
}

function checkOrderNumber(num){
    return new Promise((resolve,reject) => {
      dbOrder.find({_id:num},(err,res) => {
        if(err) resolve([]);
        resolve(res);
      })  
    })    
}

module.exports = {
    getCostumer,
    getDestanations,
    checkIfFlightExcist,
    checkOrderNumber
}
