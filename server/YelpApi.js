const express = require('express')
const cors = require('cors')
// const yelp = require('yelp-fusion');
const bodyParser = require('body-parser')
const request = require('request');

const app = express();
// const client = yelp.client('3Yd189W5j3gAG3VCG6L1mDurEi8fwJ340aLNzNR-gjfn__bvCPmFH3UOkuEr5Tq_Z0svny-KQcCfQL_eXWDzK327bfEOzX8g67Bgtuol8HTVPbbbBf5ebqMlksvGW3Yx');
app.use(cors());



app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));


app.post('/', (req, res) => {
    // res.send(req.body)
    console.log(req.body)
    request({
        url : 'https://api.yelp.com/v3/businesses/search?term=coffee&location=california',
        method: 'GET',
        'auth' : {
            'bearer' : '3Yd189W5j3gAG3VCG6L1mDurEi8fwJ340aLNzNR-gjfn__bvCPmFH3UOkuEr5Tq_Z0svny-KQcCfQL_eXWDzK327bfEOzX8g67Bgtuol8HTVPbbbBf5ebqMlksvGW3Yx'
        }
    },
    (error,response,body) => {
        console.log(response.statusCode)

    });



  

}) 


app.listen(3002)





























// client.search({
//     term: req.body.keyword,
//     location: req.body.location,
//     radius: 16093
//   }).then(response => {
//     //   console.log(response);
//     // res.send(response.jsonBody.businesses[0].name);
//     // res.send(typeof response.statusCode)
//     if(response.statusCode === 200) res.send(response.jsonBody.businesses.filter((bus,index) => index < 5));

//   }).catch(e => {
//     res.send('api',e);
//   });