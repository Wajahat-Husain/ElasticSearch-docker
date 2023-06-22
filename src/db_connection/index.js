const { MongoClient } = require('mongodb')
const uri = 'mongodb://localhost:27017/'
const client = new MongoClient(uri)
const db_connection = async () => {

  await client.connect();
  const database = client.db('TestDatabase')
  return database;

}

module.exports = { db_connection }
