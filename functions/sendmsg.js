const querystring = require('querystring');
const faunadb = require('faunadb');
const moment = require('moment');

const whatsappClient = require('./utils/whatsappMsg');
// const client = require('./client/client');

const q = faunadb.query;

exports.handler = async (event, context) => {

  console.log("sending message");

  const params = querystring.parse(event.body);
  const to = params.to;
  const text = params.text;
  const key = params.key;

  const dbclient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })

  // const qpclient = await client.getClientByKey(dbclient, key);

  const msgItem = {
    data: {
      to: to,
      text: text,
      twilioID: null,
      status: 0,
      clientRef: key,
      dateSent: moment().toISOString(),
    }
  }

  await dbclient.query(q.Create(q.Ref('classes/message'), msgItem)).then(() => {
    return await whatsappClient.sendMessage(to, text).then(() => {
      return {
        statusCode: 200,
        body: "Message sent"
      };
    })
  })
};
