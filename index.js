const axios = require('axios');
const https = require('https');
const express = require('express');
const app = express();


const query = {
  /*"symbols": {
    "tickers": [],
    "query": {
      "types": []
    }
  },*/
  "columns": [
    "description",
    "name"
  ],
  "sort": {
    "sortBy": "name", 
    "sortOrder": "asc"
  },
  /*"range": [
    0, 20000
  ]*/
}

app.get('/', function(req, response) {

  const res = axios.create({
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    httpsAgent: new https.Agent({ rejectUnauthorized: false })
  })
    .post('https://scanner.tradingview.com/brazil/scan', query)
    .then(res => {
      //console.log(res.data.data);
      var arrayResponse = res.data.data;
      //console.log(arrayResponse.length);

      var text = "";
      for (var i = 0; i < arrayResponse.length; i++) {
        text += '\n'+res.data.data[i].d;
        //console.log(res.data.data[i].d);
      }
      console.log(text);
      console.log('quantidade total=' + i);

      //response.send(res.data.data.d);
      //response.send(res.data.data);
      response.send(text);
    })
    .catch(err => console.log(err.message))

});


app.listen(3000, function() {
  console.log('App escutando na porta 3000!');
});
