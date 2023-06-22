const elasticsearch = require('@elastic/elasticsearch')
var elasticClient = null
const connectToElastic = () => {
  elasticClient = new elasticsearch.Client({
    node: 'http://localhost:9200',
    log: 'trace',
    auth: {
      username: 'elastic',
      password: 'wajii123'
    }
  })
}

const elasticConnection = () => {
  return elasticClient
}

module.exports = { connectToElastic, elasticConnection }
