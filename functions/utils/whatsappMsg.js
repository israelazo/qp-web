const twilio = require('twilio');

const { TWILIO_SID, TWILIO_TOKEN } = process.env;

async function sendMessage(to, text)
{
    var client = new twilio(TWILIO_SID, TWILIO_TOKEN);

    return client.messages.create({
        body: text,
        from: 'whatsapp:+14155238886',       
        to: 'whatsapp:+'+to 
    })
    .then((message) => console.log(message.sid));
}

module.exports = { sendMessage };