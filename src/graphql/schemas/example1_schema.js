const { gql } = require('apollo-server-express')
const example1_types = gql`
  type blockchain_data {
    id: Int
    name: String
    cnic: String
    position: String
  }
  type Query {
    getUserData: [blockchain_data]
    getUserInfo(id: Int): [blockchain_data]
    getDataFromDb(id: Int): [blockchain_data]
  }
`

module.exports = example1_types