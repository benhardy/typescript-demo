var express = require('express');
 
var app = express.createServer(express.logger());
app.use(express.bodyParser());
 
app.put('/', function(req, res) {
  // unless the right content-type header is supplied, body will be undefined
  // e.g.: curl -X PUT -d '{"dog":"mort"}' -H 'Content-Type: application/json' http://localhost:3000/
  var body = req.body;
  var dog = body.dog; 
   
  console.log("body is : "  + JSON.stringify(body));
  console.log("dog is : "  + dog);
       
  res.contentType('json');
  res.send(JSON.stringify({ status: "success" }));
});
 
var port = process.env.PORT || 3000;
 
app.listen(port, function() {
  console.log("Listening on " + port);
});
