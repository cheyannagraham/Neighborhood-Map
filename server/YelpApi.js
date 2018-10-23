const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');

const app = express();
const KEY =	'3Yd189W5j3gAG3VCG6L1mDurEi8fwJ340aLNzNR-gjfn__bvCPmFH3UOkuEr5Tq_Z0svny-KQcCfQL_eXWDzK327bfEOzX8g67Bgtuol8HTVPbbbBf5ebqMlksvGW3Yx';
const OPTIONS = {
	method : 'GET',
	headers : {
		Authorization : `bearer ${KEY}`
	}
} 

app.use(cors());
app.use(bodyParser.json());


app.post('/', (req, res) => {
	let markers;

	fetch(`https://api.yelp.com/v3/businesses/search?term=${req.body.keyword}&location=${req.body.location}&radius=20000`,OPTIONS)
	.then(resp => resp.json())
	.then(resp => {
		let businessesFound = resp.businesses.filter((bus,index) => index < 5 );
				
		markers = businessesFound.map(bus => 

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
		);

		getBusinessInfo(markers)
		.then(resp => {
			res.send(resp);
		})		
	})	
});



const getBusinessInfo = (businesses) => {

	//get businesses photos & hours
	return Promise.all(businesses.map(bus => {

		return fetch(`https://api.yelp.com/v3/businesses/${bus.id}`,
		{
			method : 'GET',
			headers : {
				Authorization : `bearer ${KEY}`
			}

		})
		.then(result => result.json())
		.then(resp => {
			bus.hours = resp.hours;
			bus.photos = resp.photos;
			return bus;
		});
	}))
	.then(resp => resp)
	.catch(error => error);
}


app.listen(3002);