const express = require('express')
const cors = require('cors')
const yelp = require('yelp-fusion');
const bodyParser = require('body-parser')

const app = express();
const client = yelp.client('3Yd189W5j3gAG3VCG6L1mDurEi8fwJ340aLNzNR-gjfn__bvCPmFH3UOkuEr5Tq_Z0svny-KQcCfQL_eXWDzK327bfEOzX8g67Bgtuol8HTVPbbbBf5ebqMlksvGW3Yx');
app.use(cors());



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.post('/', (req, res) => {

  client.search({
    term: req.body.keyword,
    location: req.body.location
  }).then(response => {
    //   console.log(response);
    // res.send(response.jsonBody.businesses[0].name);
    // res.send(typeof response.statusCode)
    if(response.statusCode === 200) res.send(response.jsonBody.businesses.filter((bus,index) => index < 5));

  }).catch(e => {
    res.send('api',e);
  });

}) 


app.listen(3002)