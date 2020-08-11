const querystring = require('querystring');
const faunadb = require('faunadb');
const moment = require('moment');

const whatsappClient = require('./utils/whatsappMsg');
const client = require('./client/client');

const q = faunadb.query;

exports.handler = async (event, context) => {

  // console.log("sending message");
  const params = querystring.parse(event.body);
  const to = params.to;
  const text = params.text;
  const key = params.key;

  const dbclient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })

  const qpclient = await client.getClientByKey(dbclient, key);

  // console.log("got client", qpclient.id);

  const msgItem = {
    data: {
      to: to,
      text: text,
      twilioID: null,
      status: 0,
      clientRef: qpclient.id,
      dateSent: moment().toISOString(),
    }
  }

  await dbclient.query(q.Create(q.Ref('classes/message'), msgItem));
  await whatsappClient.sendMessage(to, text);
  return {
    statusCode: 200,
    body: "Message sent"
  };
};
