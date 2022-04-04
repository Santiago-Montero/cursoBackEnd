const twilio = require('twilio')

const accountSid = 'AC87691f170bf51dd27127a6af34589b9f'
const authToken = 'f5353f8a127a984549c1c2926c192ba5'

const client = twilio(accountSid, authToken)

client.messages.create({
    body: 'Hola soy un SMS desde Node.js!',
    from: '+18285648984',
    to: '+541138122180'
})
.then((message) =>  console.log(message))
.catch((error) =>  console.log(error))
