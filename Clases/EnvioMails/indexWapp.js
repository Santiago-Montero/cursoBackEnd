// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = 'AC87691f170bf51dd27127a6af34589b9f'
const authToken = 'f5353f8a127a984549c1c2926c192ba5'

const client = require('twilio')(accountSid, authToken);

client.messages.create({
    from: 'whatsapp:+14155238886',
    body: 'join husband-vast',
    to: 'whatsapp:+5491138122180'
})
.then(message => console.log(message.sid))
.catch((error) => console.log(error));