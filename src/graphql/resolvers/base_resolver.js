const example1_resolvers = require('./example1_resolver')
const example2_resolvers = require('./example2_resolver')


const base_resolver = [example1_resolvers, example2_resolvers]

module.exports = base_resolver
