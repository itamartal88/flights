

var dbConnect = require('./dbConnection');
var mongoose  = dbConnect.mongoose;
var store = dbConnect.store;

var schema = mongoose.Schema;

var flightsSchema = new schema({
  destination:String,
  date:Date,
  CountryOfOrigin:String,
  passengers:[{ type: schema.Types.ObjectId, ref: 'orders' }]
})

mongoose.model('flights', flightsSchema);
var flights = mongoose.model('flights');

module.exports = flights;