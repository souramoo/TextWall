# TextWall
Text a number to have it appear on the screen/wall, great for parties!

As part of my college's MCR committee, I had to help organise a bop (themed party) in the college bar.

I thought a nice addition (along with my mad DJ skillz ;) ) would be to put up a thing on all of the TV screens around the bar where people could text messages (SMS) and have it appear for everyone to see.

Naturally, it went down very well and got quite abused...

## How to do it yourself
Fairly straightforward node.js script. To run this, you will need a cloud-based phone number, e.g. from Nexmo (https://www.nexmo.com) (I had £10 of free credit from them from a recent hackathon I went to...)

1. `npm install`
2. `node app.js`
3. `ngrok http 3000` to get a free reverse tunnel from the web
4. Rent a free cloud number from Nexmo
5. Add the ngrok url + /webhooks/inbound-sms to the inbound sms webhook url under settings at nexmo
6. Change the number in index.html and style with css/your browser's inspector
7. Load up `localhost:3000` in your browser and make it fullscreen and put it up on all the screens around the bar!
