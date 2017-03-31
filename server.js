//Import the required packages
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

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