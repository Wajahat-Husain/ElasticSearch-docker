const { gql } = require('apollo-server-express')
const example2_types = gql`
  type blockchain_data {
    from: String
    blockNumber: Int
    contractAddress: String
    gasUsed: Int
    status: Boolean
    to: String
    transactionHash: String
    transactionIndex: Int
  }
  type Query {
    getUserData: [blockchain_data]
    getUserInfo(transactionHash: String): [blockchain_data]
    getDataFromDb(transactionHash: String): [blockchain_data]
  }
`

module.exports = example2_types