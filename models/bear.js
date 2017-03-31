var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
//Define the Bear Model
var BearSchema = new Schema({
    name: String
});

//Export the Bear Data Model
module.exports = mongoose.model('Bear', BearSchema);