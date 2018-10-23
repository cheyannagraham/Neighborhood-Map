const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const request = require('request');
const fetch = require('node-fetch');

const app = express();
const KEY =	'3Yd189W5j3gAG3VCG6L1mDurEi8fwJ340aLNzNR-gjfn__bvCPmFH3UOkuEr5Tq_Z0svny-KQcCfQL_eXWDzK327bfEOzX8g67Bgtuol8HTVPbbbBf5ebqMlksvGW3Yx';
 

app.use(cors());
app.use(bodyParser.json());


app.post('/', (req, res) => {
	let markers;

	request	({
		url : `https://api.yelp.com/v3/businesses/search?term=${req.body.keyword}&location=${req.body.location}&radius=20000`,
		method: 'GET',
		'auth' : {
			'bearer' : KEY
		}
	},
	(error,response,body) => {
		error && res.send(error);
		console.log(response.statusCode);   

		let businessesFound = JSON.parse(body).businesses ? 
		JSON.parse(body).businesses.filter((bus,index) => index < 5 ) : 
		[];

				
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
		)
		getBusinessInfo(markers)
		.then(resp => {
			console.log('resp',resp)
		})
	});


}) 

const getBusinessInfo = (businesses) => {

	//get businesses photos & hours
	return Promise.all(businesses.map(bus => {

	// let markers = businesses.map(business => {
		return fetch(`https://api.yelp.com/v3/businesses/${bus.id}`,
		{
			method : 'GET',
			headers : {
				Authorization : `bearer ${KEY}`

			}

		})
		.then(result => result.json())

		// })
		// .then(resp => resp.json())
		// // (error,response,body) => {
		// // 	if(error) return (error);
		// // 	let results = JSON.parse(body);
		// 	// console.log(typeof results)
		// 	// console.log(typeof body)
		// .then(resp => {
		// 	bus.hours = resp.hours;
		// 	bus.photos = resp.photos;
		// 	console.log('resp.photos',resp.photos);
		// 	return bus;

		// })
		// .catch(error => {
		// 	return error
		// })

	}))
	.then(resp => resp)
	.catch(error => error)



		// }); 

	// })

	// console.log('bus',businesses[0]);
	// return businesses


}


app.listen(3002);