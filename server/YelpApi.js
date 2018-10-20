const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const request = require('request');

const app = express();

app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));


app.post('/', (req, res) => {
	console.log(req.body)
	request({
		url : `https://api.yelp.com/v3/businesses/search?term=${req.body.keyword}&location=${req.body.location}&radius=20000`,
		method: 'GET',
		'auth' : {
			'bearer' : '3Yd189W5j3gAG3VCG6L1mDurEi8fwJ340aLNzNR-gjfn__bvCPmFH3UOkuEr5Tq_Z0svny-KQcCfQL_eXWDzK327bfEOzX8g67Bgtuol8HTVPbbbBf5ebqMlksvGW3Yx'
		}
	},
	(error,response,body) => {
		error && res.send(error);
		console.log(response.statusCode);   

		let results = JSON.parse(body).businesses ? 
		JSON.parse(body).businesses.filter((bus,index) => index < 5 ) : 
		[];
				
		let markers = results.map(bus =>
			({
				id : bus.id,
				position : {
					lat : bus.coordinates.latitude,
					lng : bus.coordinates.longitude
				},
				address : bus.location.display_address.join(' '),
				title : bus.name,
				rating : bus.rating,
				price : bus.price,
				reviewCount : bus.review_count,
				avatar : bus.image_url,
				phone : bus.display_phone,
				website : bus.url
			})
		)
		res.send(markers)
	}); 
}) 


app.listen(3002);