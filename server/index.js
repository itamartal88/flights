


const express = require('express');
const http = require('http');
const app = express();
var ticketRouter = require('./routs/buyTickets');
var destanationRouter = require('./routs/destanation');
var orderRouter = require('./routs/order');
var myServer = http.createServer(app);
var bodyParser = require('body-parser');
var cors = require('cors');


 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());
 app.use(cors());
 app.use('/pictures', express.static(__dirname + '/Images'));


app.use('/ticket',ticketRouter); 
app.use('/dest',destanationRouter);
app.use('/order',orderRouter); 
myServer.listen(4000);

myServer.on('listening',()=>{
  console.log('server listening');
});




