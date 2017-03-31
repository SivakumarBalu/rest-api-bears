//Import the required packages
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//import the Bear Model
var Bear = require('./models/bear.js');
//Instance of express app created
var app = express();

//connect to MongoDB avaialble in mLab(DB as a service)
mongoose.connect('mongodb://siva:celeron@ds147080.mlab.com:47080/express1')

//Configure the bodyPaser to get the data from POST
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//set the listening port
var port = process.env.PORT || 8080;
//get a instance of Express Router
var router = express.Router();

//Test route to make suer everything is working 
router.get('/',function(req, res)
{
    res.json({message:"Home route is perfect!"});
});


//adding the /api to URL
app.use('/api',router);

//Start the server and output the status in console.
app.listen(port);
console.log('Magic happens on port ' + port);