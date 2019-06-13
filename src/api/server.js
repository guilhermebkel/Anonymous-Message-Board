const express = require('express');
const server = express();

const databaseURI = "mongodb+srv://guilherme:123@cluster0-cjocp.mongodb.net/test?retryWrites=true&w=majority";
const databaseConnection = require('./db/database');
databaseConnection(databaseURI);

// Enables CORS Method
server.on('MethodNotAllowed', unknownMethodHandler);
function unknownMethodHandler(req, res) {
    if (req.method.toLowerCase() === 'options') {
        console.log('received an options method request');
      var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'Origin', 'X-Requested-With'];
  
      if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');
  
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
      res.header('Access-Control-Allow-Methods', res.methods.join(', '));
      res.header('Access-Control-Allow-Origin', req.headers.origin);
  
      return res.send(204);
    }
    else
      return res.send(new restify.MethodNotAllowedError());
}

// Hosts server on the needed PORT.
// If the app is hosted on internet,
// it goes to 'process.env.PORT' in order
// to use the host PORT, else, goes to '3000'.
server.listen(process.env.PORT || 3000, () => {
    console.log("Server listening on port", 3000);
});

// When you get to the root url and the 
// is working, it sends a response.
server.get("/", (req, res) => {
    res.json({"status": "Express server is running!"});
})