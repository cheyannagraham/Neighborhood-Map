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
    console.log(req.body)
    request({
        url : `https://api.yelp.com/v3/businesses/search?term=${req.body.keyword}&location=${req.body.location}`,
        method: 'GET',
        'auth' : {
            'bearer' : '3Yd189W5j3gAG3VCG6L1mDurEi8fwJ340aLNzNR-gjfn__bvCPmFH3UOkuEr5Tq_Z0svny-KQcCfQL_eXWDzK327bfEOzX8g67Bgtuol8HTVPbbbBf5ebqMlksvGW3Yx'
        }
    },
    (error,response,body) => {
        error && res.send(error);

        console.log(response.statusCode);

        let places = JSON.parse(body).businesses
        .filter((bus,index) => index < 5 );


        // .map(place => ({
        //     id : place.id,
        //     addresss : place.location.display_address.join(' '),
        //     title : place.name,
        //     location : {
        //         lat : place.coordinates.latitude,
        //         lng : place.coordinates.longitude
        //         }
        //     })
        // );

        // console.log(places)

        res.send(places)



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