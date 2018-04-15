const app = require('express')()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser')

function handleInboundSms(request, response) {
  const params = Object.assign(request.query, request.body)
  console.log(params)
  io.emit('chat message', '<b>+' + params.msisdn + "</b>: " + params.text);
  response.status(204).send()
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// nexmo inbound sms webhook
app.route('/webhooks/inbound-sms')
   .get(handleInboundSms)
   .post(handleInboundSms)

// ui
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// go go go
http.listen(3000, function(){
  console.log('listening on *:3000');
});
