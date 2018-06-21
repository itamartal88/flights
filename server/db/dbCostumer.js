

var dbConnect = require('./dbConnection');
var mongoose  = dbConnect.mongoose;
var store = dbConnect.store;

var schema = mongoose.Schema;

var costumerSchema = new schema({
  name:String,
  email:String
})

mongoose.model('costumers', costumerSchema);
var costumer = mongoose.model('costumers');

module.exports = costumer;