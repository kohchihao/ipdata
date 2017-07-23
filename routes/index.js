var express = require('express');
var maxmind = require('maxmind');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	//console.log(req.ip)
  	var ipAddr = req.headers["x-forwarded-for"];
  if (ipAddr){
    var list = ipAddr.split(",");
    ipAddr = list[list.length-1];
  } else {
    ipAddr = req.connection.remoteAddress;
  }
  	console.log(ipAddr+","+req.headers.host)
  	//console.log(req.headers)
  	
  	maxmind.open('GeoLite2-City.mmdb', (err, cityLookup) => {
  		var city = cityLookup.get(ipAddr);
  		var country = city.country.iso_code
  		city = city.city.names.en
  		
  		console.log(city)

  		res.json({ip: ipAddr,city: city,country:country})
	});

	//res.json({ip:ipAddr})

  	
});

module.exports = router;
