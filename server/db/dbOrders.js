

var dbConnect = require('./dbConnection');
var mongoose  = dbConnect.mongoose;
var store = dbConnect.store;

var schema = mongoose.Schema;

var orderSchema = new schema({
  costumerId:[{ type: schema.Types.ObjectId, ref: 'costumers' }],
  price:Number,
  numOfPersons:Number,
  foodIncloud:Boolean,
  baggageIncloud:Boolean,
  destination:String,
  forthDate:Date,
  backDate:Date
})

mongoose.model('orders', orderSchema);
var order = mongoose.model('orders');

module.exports = order;