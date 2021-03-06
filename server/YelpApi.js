const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');

const app = express();
const KEY =	'KEY';
const OPTIONS = {
	method : 'GET',
	headers : {
		Authorization : `bearer ${KEY}`
	}
} 

app.use(cors());
app.use(bodyParser.json());

app.get('/*', (req, res) => {
	let markers;

	fetch(`https://api.yelp.com/v3/businesses/search?term=${req.query.keyword}&location=${req.query.location}&radius=20000`,OPTIONS)
	.then(resp => resp.json())
	.then(resp => {
		if(resp.error) {
			res.send(resp);
		} else {
		
			let businessesFound = (resp.businesses || []).filter((bus,index) => index < 5 );
					
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


		}
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
