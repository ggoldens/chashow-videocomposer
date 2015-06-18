var express = require('express');
var app = express();
var download = require('./download');
var composer = require('./composer');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/compose', function(req, response) {
  //var zip_url = req.query.zip_url;
  var zip_url = 'http://s3.amazonaws.com/tokbox.com.archive2/45222032%2F1a34abc6-16cf-4754-b596-b95335f2bbd9%2Farchive.zip?Expires=1434668171&AWSAccessKeyId=AKIAI6LQCPIXYVWCQV6Q&Signature=tCq0GDD%2Bkssp32R6%2BMMDh9ysfmg%3D';
  var event_id = req.query.event_id;
  var dest = "./downloads/video"+event_id+".zip";
  download(zip_url, dest, function() {
    console.log("the file " + dest + " was created succesfully!");
    composer(dest);
  });

  
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://chatshow-tesla.herokuapp.com');

  res.setHeader('Access-Control-Allow-Origin', 'https://a-random-site.herokuapp.com');
  res.setHeader('Access-Control-Allow-Origin', 'https://chatshow.s3.amazonaws.com');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
