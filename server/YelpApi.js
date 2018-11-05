const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');

const app = express();
const KEY =	'jr5Z-pi9dFQQONE_BV8vHZ8qwTgdcQg-I51siNCEd3c4YLChsSTZlcXwkl-RE5JSKmReynakwf4xXEPy38zXSs0Ly4TXoXkqSY5YU1yjL_oBiOfnnB2jcrLxJ-_dW3Yx';
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
	.catch(error => res.send(error));	
});


const getBusinessInfo = (businesses) => {

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