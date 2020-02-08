const app = require('express')()
const bodyParser = require('body-parser')
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// nexmo inbound sms webhook
app
  .route('/webhooks/inbound-sms')
  .get(handleInboundSms)
  .post(handleInboundSms)

function handleInboundSms(request, response) {
  const params = Object.assign(request.query, request.body)
  console.log(params)
  
  let date_ob = new Date();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  var time=('0'  + hours).slice(-2)+':'+('0' + minutes).slice(-2);

  var fromNo = (process.env.ANON ? params.From.slice(0,4) + "..."+params.From.slice(-4) : params.From)
  
  io.emit('chat message', '<i>[' + time + '] </i><b>' + fromNo +"</b>: " + params.Body);
  response.status(204).send()
}

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/number', function(req, res) {
    res.json({number: (process.env.NUMBER ? process.env.NUMBER : "UNKNOWN")})
})

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(port, function(){
  console.log('listening on *:'+port);
});
