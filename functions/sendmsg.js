const querystring = require('querystring');
const whatsappClient = require('./utils/whatsappMsg');

exports.handler = async (event, context) => {

  console.log("sending message");

  const params = querystring.parse(event.body);
  const to = params.to;
  const text = params.text;

  await whatsappClient.sendMessage(to, text).then(response => {
    console.log("response", response);
    return {
      statusCode: 200,
      body: "Mensaje enviado"
    };
  })
};
