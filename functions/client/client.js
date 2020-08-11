const faunadb = require('faunadb');

const q = faunadb.query;

getClientByKey = async (dbclient, ref) => {

  const response = await dbclient.query(
                          q.Paginate(
                            q.Match(
                              q.Index(`clientByKey`),`${ref}`)
                            )
                          );
  //q.Get(q.Ref(`classes/client/${ref}`))

  // const client = await dbclient.query(q.Get(q.Ref(response.data[0])))
  // console.log({id: response.data[0].id, data: client.data});

  return {id: response.data[0].id, data: {}};
};

module.exports = { getClientByKey };