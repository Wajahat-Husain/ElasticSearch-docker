const { db_connection} = require('../../db_connection/index')
const { elasticConnection } = require('../../elasticsearch_config/index')
const query = async (table_name, query = {}) => {

  const db = await db_connection();
  const coll = db.collection(table_name)
  const result = await coll.find(query, {}).toArray()
  return result

}
const example2_resolvers = {
  Query: {
    getUserData: async () => {
      const result = await query('Example2_Table')
      return result
    },
    getUserInfo: async (parent, args) => {
      const elasticClient = elasticConnection()
      console.log(elasticClient)
      try {
        const response = await elasticClient.search({
          index: 'example2data',
          scroll: '1m', // Set the scroll time
          size: 1000, // Number of results per batch
          body: {
            query: {
              match: {
                transactionHash: args.transactionHash
              }
            }
          }
        })
        const results = response.hits.hits.map(hit => hit._source)
        return results
      } catch (error) {
        console.log(error)
        return {}
      }
    },
    getDataFromDb: async (parent, args) => {
      const result = await query('Example2_Table', {
        transactionHash: args.transactionHash
      })
      return result
    }
  }
}

module.exports = example2_resolvers
