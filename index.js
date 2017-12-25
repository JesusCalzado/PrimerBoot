var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var Regex = require('regex');
const APP_TOKEN = 'EAAEcSKJ63N8BACEFLjDGKnNZCe7zVZAhSGwhviBes5k8lJ9TtnZAqWOrGl1kACa3CmKOdIfukzZAnbIKSr8ojStypTiIPVYxcznrXir3lDWDx10NPPtlAyuLY78aKezqtXteQa9SKO7TldLky9tIdGDvJwSfZAZBxeE9g7hciOPQZDZD'

var app = express();
app.use(bodyParser.json());

app.listen(1337, function () {
	console.log("El servicio esta iniciado");
});

app.get('/', function (req, res) {
	res.send("Bienvenidovvvfv");
});

app.get('/webhook', function (req, res) {
	if (req.query['hub.verify_token'] == 'test_token_say_hello') {
		res.send(req.query['hub.challenge']);
	} else {
		res.send('No estas autorizado');
	}
});


app.post('/webhook', function (req, res) {
	var data = req.body;
	var myJSON = JSON.stringify(data);
	console.log("myJSON: " + myJSON);
	if (data.object == 'page') {
		data.entry.forEach(function (pageEntry) {
			pageEntry.messaging.forEach(function (messagingEvent) {
				try {
					if (messagingEvent.message.text) {
						console.log("Ha enviado un texto :), procesamos la informacion");
						receiveMessage(messagingEvent);
					}else{
						sendMessageText(messagingEvent.sender.id,"Por ahora solo entiendo texto :(")
					}
				} catch (ex) {
					console.log("######Hubo una excepción");
					sendMessageText(messagingEvent.sender.id,"Hubo un error en el servicio :(")
					res.sendStatus(403);
				}
			});
		});
		res.sendStatus(200);

	}
});

function receiveMessage(event) {
	var senderID = event.sender.id;
	var messageText = event.message.text;
	console.log('senderID:' + senderID);
	console.log('messageText:' + messageText);
	evaluateMessage(senderID, messageText);
}

function evaluateMessage(recipientId, message) {
	var finalMessage = '';

	console.log('message:' + message);
	if (message.search(/hola/i) >= 0) {
		finalMessage = 'Hola como estas soy Osito :)';
	}
	else {
		if (message.search(/estas/i) >= 0) {
			finalMessage = 'Estoy bien gracias :)';
		} else {
			if (message.search(/años/i) >= 0) {
				finalMessage = 'Tengo 1 añito :) ';
			}
			else {
				if (message.search(/juga/i) >= 0) {
					finalMessage = 'Que juegas? :) ';
				}
				else {
					finalMessage = 'Hola no entiendo lo que me dices estoy aprendiendo :), repetire lo que escribiste: ' + message;
				}

			}
		}
	}
	sendMessageText(recipientId, finalMessage);
}

function sendMessageText(recipientId, message) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			text: message
		}
	};
	callSendAPI(messageData)
}

function callSendAPI(messageData) {
	request({
		uri: 'https://graph.facebook.com/v2.6/me/messages',
		qs: { access_token: APP_TOKEN },
		method: 'POST',
		json: messageData
	}, function (error, responde, data) {
		if (error) {
			console.log('Hubieron errores');
		} else {
			console.log('OK...');
		}

	});
}

function isContain(sentence, word) {
	return sentence.indexOf(word) > -1;
}