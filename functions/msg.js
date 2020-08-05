import querystring from "querystring";

var twilio = require('twilio')
const { TWILIO_SID } = process.env;
const { TWILIO_TOKEN } = process.env;

var client = new twilio(TWILIO_SID, TWILIO_TOKEN);

async function sendMessage(to, text)
{
    // console.log(to)

    return client.messages.create({
        body: text,
        from: 'whatsapp:+14155238886',       
        to: 'whatsapp:+'+to 
    })
    .then((message) => console.log(message.sid));
}

exports.handler = async (event, context) => {

  const params = querystring.parse(event.body);
  const to = params.to;
  const text = params.text;

  await sendMessage(to, text).then(response => {
    console.log(response);
    return {
      statusCode: 200,
      body: "Mensaje enviado"
    };
  })
};
