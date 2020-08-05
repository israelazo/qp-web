const twilio = require('twilio');

const { TWILIO_SID } = process.env;
const { TWILIO_TOKEN } = process.env;

var client = new twilio(TWILIO_SID, TWILIO_TOKEN);

console.log("twilio", TWILIO_SID)

async function sendMessage(to, text)
{
    console.log("to", to);

    return client.messages.create({
        body: text,
        from: 'whatsapp:+14155238886',       
        to: 'whatsapp:+'+to 
    })
    .then((message) => console.log(message.sid));
}

module.exports = sendMessage;