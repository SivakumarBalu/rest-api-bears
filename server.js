//Import the required packages
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//import the Bear Model
var Bear = require('./models/bear.js');
//Instance of express app created
var app = express();

//make the mongoose promise as global promises since it is depricated and to avoid the warnings
mongoose.Promise = global.Promise;
//connect to MongoDB avaialble in mLab(DB as a service)
mongoose.connect('mongodb://siva:celeron@ds147080.mlab.com:47080/express1')

//Configure the bodyPaser to get the data from POST
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//set the listening port
var port = process.env.PORT || 8080;
//get a instance of Express Router
var router = express.Router();

//middleware to use all the requests
router.use(function(req, res, next){
    console.log('Something is happening');
    next();
})

//ROUTES FOR api
// on routes that end in /bears

router.route('/bears')

  .post(function(req, res){
      var bear = new Bear();
      bear.name = req.body.name;
      bear.save(function(err){
          if (err)
          res.send(err);

          res.json({message:"Bear Created!"});
      });
  })

  .get(function(req, res){
      Bear.find(function(err, bears){
          if (err)
          res.send(err);

          res.json(bears);
      });
  });

//Routes that end in /bears/:bear_id
router.route('/bears/:bear_id')

  .get(function(req, res){
      Bear.findById(req.params.bear_id,function(err,bear){
          if(err)
          res.send(err);

          res.json(bear);
      });
  })

  .put(function(req, res){
      Bear.findById(req.params.bear_id,function(err,bear){

          if(err)
          res.send(err);

          bear.name = req.body.name;
          bear.save(function(err) {
              if(err)
              res.send(err);
              res.json({message:'Bear Updated'});
          });
      });
  })

  .delete(function(req, res){
      Bear.remove({_id: req.params.bear_id}, function(err, bear){
          if(err)
          res.send(err);

          res.json({message:'Successfully deleted'});
      });
  });
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