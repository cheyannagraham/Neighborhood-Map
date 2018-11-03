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
		let businessesFound = resp.businesses.filter((bus,index) => index < 10 );
				
		markers = businessesFound.map(business => 

			({
				id : business.id,
				position : {
					lat : business.coordinates.latitude,
					lng : business.coordinates.longitude
				},
				address : business.location.display_address.join(' '),
				title : business.name,
				rating : business.rating,
				price : business.price,
				reviewCount : business.review_count,
				avatar : business.image_url,
				phone : business.display_phone,
				website : business.url
			})		
		);

		getBusinessInfo(markers)
		.then(resp => {
			res.send(resp);
		})		
	})
	.catch(error => res.send(error));	
});


const getBusinessInfo = (businesses) => {

	return Promise.all(businesses.map(business => {

		return fetch(`https://api.yelp.com/v3/businesses/${business.id}`, OPTIONS)
		.then(result => result.json())
		.then(resp => {
			business.hours = resp.hours;
			business.photos = resp.photos;
			return business;
		});
	}))
	.then(resp => resp)
	.catch(error => error);
}

app.listen(3002);