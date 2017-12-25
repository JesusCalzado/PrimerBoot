'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express().use(bodyParser.json());


app.listen(1337, function(){
	console.log("El servicio esta iniciado");	
});

app.post('/webhook', function(req, res){
	let body = req.body;
	if (body.object == 'page'){
		
		body.entry.forEach(function(entry){
			let webhookevent = entry.messaging[0];
			console.log('webhookevent'+webhookevent);
		});
		res.sendStatus(200);
		
	}else{
		res.sendStatus(404);
	}	

});

app.get('/webhook', (req, res) => {

	// Your verify token. Should be a random string.
	let VERIFY_TOKEN = "EAAEcSKJ63N8BACEFLjDGKnNZCe7zVZAhSGwhviBes5k8lJ9TtnZAqWOrGl1kACa3CmKOdIfukzZAnbIKSr8ojStypTiIPVYxcznrXir3lDWDx10NPPtlAyuLY78aKezqtXteQa9SKO7TldLky9tIdGDvJwSfZAZBxeE9g7hciOPQZDZD"
	  
	// Parse the query params
	let mode = req.query['hub.mode'];
	let token = req.query['hub.verify_token'];
	let challenge = req.query['hub.challenge'];
	  
	// Checks if a token and mode is in the query string of the request
	if (mode && token) {
	
	  // Checks the mode and token sent is correct
	  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
		
		// Responds with the challenge token from the request
		console.log('WEBHOOK_VERIFIED');
		res.status(200).send(challenge);
	  
	  } else {
		// Responds with '403 Forbidden' if verify tokens do not match
		res.sendStatus(403);      
	  }
	}else{
		res.sendStatus(403);      
	}
  });