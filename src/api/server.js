const express = require('express');
const server = express();
const databaseConnection = require('./db/connect');

const databaseURI = 'postgres://asuvkjitnmsvig:d2e2eda2b507c7c03cdba16993fcc9fcf68c68b610c377863902722c3b28b7fa@ec2-23-21-91-183.compute-1.amazonaws.com:5432/d4mckkcajlj6f3';
databaseConnection(databaseURI)
.then((data) => console.log('Connected to database!'))
.catch((error) => console.error('Error when trying to connect to database'));

// Enables CORS
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

server.listen(process.env.PORT || 3000, () => {
    console.log("Server listening on port", 3000);
});

server.get("/", (req, res) => {
    res.json({"status": "Express server is running!"});
})