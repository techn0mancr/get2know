// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Come join the game! Click on this www.google.com',
     from: '+19802701555',
     to: process.env.RECEIVER_PHONE_NUMBER
   })
  .then(message => console.log(message.sid));


