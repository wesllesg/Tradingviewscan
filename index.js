const axios = require('axios');
const https = require('https');
const express = require('express');
const app = express();

app.get('/', function(req, response) {
  var tickers = req.query.tickers;
  //console.log("tickers=" + tickers);
  const arrtickers = tickers.split(',');
  console.log(arrtickers);
  
const query = {
  "symbols": {
    "tickers": arrtickers,
    /*"tickers": [
      'BMFBOVESPA:BBAS3'
      //'POMO4.SAO'
    ],*/
    "query": {
      "types": []
    }
  },
  "columns": [
    'name',
    'change',
    'open',
    'high',
    'low',    
    'close',
    'volume',
    'description'
      ],
  /*"sort": {
    "sortBy": "name", 
    "sortOrder": "asc"
  },*/
  /*"range": [
    0, 20000
  ]*/
}


  
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
        if (i == 0){
          text += res.data.data[i].d;  
        }else{
          text += '\n'+res.data.data[i].d; 
        }
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
