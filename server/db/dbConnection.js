



    var mongoose = require('mongoose');
    
     var store = mongoose.connect('mongodb://localhost:27017/flights');
    
    
    module.exports = {
        mongoose,
        store
    }

    



 
