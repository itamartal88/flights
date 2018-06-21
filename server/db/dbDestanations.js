


var dbConnect = require('./dbConnection');
var mongoose  = dbConnect.mongoose;
var store = dbConnect.store;

var schema = mongoose.Schema;

var destanationSchema = new schema({
  name:String,
  img:String,
  price:Number
})

mongoose.model('destanations', destanationSchema);
var destanation = mongoose.model('destanations');

module.exports = destanation;