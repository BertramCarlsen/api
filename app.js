const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('index'));

app.post('/', function (req, res) {
	let website = req.body.website;
	let url = `https://www.dr.dk/mu-online/api/1.3/list/view/lastchance?limit={limit}&offset={offset}&channel={channel}`
	request(url, function err (err, response, body) {
		if (err){
			res.render('index', {website: null, error: 'Error, please try again'});
		} else {
			let website = JSON.parse(body);

			if(website.main == undefined) {
				res.render('index', {website: null, error: 'Error, please try again'});
			} else {
				let websiteText = `${website.main.Title} = ${expiresSoon}`;
				res.render('index', {website: websiteText, error: null});
			}
		}
	})
	console.log(req.body.website);
})

app.listen(port, () => console.log(`App listening on port ${port}.`));