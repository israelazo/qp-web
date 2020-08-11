const faunadb = require('faunadb');

const q = faunadb.query;

getClientByKey = async (dbclient, ref) => {

  return dbclient.query(q.Get(q.Ref(`classes/client/${ref}`)))
    .then((response) => {
      console.log('success', response)
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    }).catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
};

module.exports = { getClientByKey };