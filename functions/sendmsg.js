const querystring = require('querystring');
const whatsappClient = require('./utils/whatsappMsg');
const faunadb = require('faunadb')
const q = faunadb.query;

exports.handler = async (event, context) => {

  console.log("sending message");

  const params = querystring.parse(event.body);
  const to = params.to;
  const text = params.text;

  const dbclient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })

  const msgItem = {
    data: {
      to: to,
      text: text,
      twilioID: null,
      status: 0,
      clientID: '1234567',
      dateSent: new Date(),
    }
  }

  const response = await dbclient.query(q.Create(q.Ref('classes/message'), msgItem))

  console.log(response);

  // .then((response) => {
  //   console.log('success', response)
  //   /* Success! return the response with statusCode 200 */
  //   return response;
  // }).catch((error) => {
  //   console.log('error', error)
  //   /* Error! return the error with statusCode 400 */
  //   return error;
  // })

  return await whatsappClient.sendMessage(to, text).then(response => {
    return {
      statusCode: 200,
      body: "Mensaje enviado"
    };
  })
};
