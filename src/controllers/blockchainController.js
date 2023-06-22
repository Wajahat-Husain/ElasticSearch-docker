require('dotenv').config()
const { elasticConnection } = require('../elasticsearch_config/index')

const insertData = async (req, res) => {

  const { tableName, indexerName, query} = req.body;
  console.log(`tableName : ${tableName}, indexerName : ${indexerName}`)
  try {
  const elasticClient = await elasticConnection();
  delete query['_id']

    const response = await elasticClient.index({
      index: indexerName,
      body: query
    })
    console.log(`Data indexed at ${indexerName}:`)
    console.log(response)
    return res.status(200).send({ status: true, message: 'Data insert  successfully!', data: response});
  } catch (error) {
    console.error(`Error indexed at ${indexerName}:`)
    console.log(e.message)
    return res.status(500).send({ status: false, message: 'Failed to indexed.' });
  }


}

const deleteDataFormExample1 = async (req, res) => {

  const { id, cnic} = req.query;
  try {
  const elasticClient = await elasticConnection();
  const query = {
      bool: {
        must: [
          { match: { id: id } },
          { match: { cnic: cnic } },
        ]
      }
    };

  const response = await elasticClient.deleteByQuery({
    index: 'example1data',
    body: {
        query: query
    }
  });
      // console.log(response)
      if (response.deleted !== 0) {
        return res.status(200).send({ status: true, message: 'Data delete successfully!', data: response})
      } else {
        return res.status(200).send({ status: true, message: 'Data delete successfully!', data: response})
        
      }
  } catch (e) {
    console.error(`Error indexed at example1data :`)
    console.log(e.message)
    return res.status(500).send({ status: false, message: 'Failed to indexed.' });
  }

  
}

const deleteDataFormExample2 = async (req, res) => {

  const { from, blockNumber, contractAddress} = req.query;
  try {
  const elasticClient = await elasticConnection();
    const query = {
      bool: {
        must: [
          { match: { from: from } },
          { match: { blockNumber: blockNumber } },
          { match: { contractAddress: contractAddress } },
        ]
      }
    };
  
    const response = await elasticClient.deleteByQuery({
      index: 'example2data',
      body: {
        query: query
      }
    });
      // console.log(response)
      if (response.deleted !== 0) {
        return res.status(200).send({ status: true, message: 'Data delete successfully!', data: response})
      } else {
        return res.status(200).send({ status: true, message: 'Data delete successfully!', data: response})
        
      }
  } catch (e) {
    console.error(`Error indexed at example1data :`)
    console.log(e.message)
    return res.status(500).send({ status: false, message: 'Failed to indexed.' });
  }


}

const updateDataExample1 = async (req, res) => {

const { id, cnic, position} = req.query;
try {
  const elasticClient = await elasticConnection();
  console.log("Updating Token Index:",id, cnic)
  const Query = {
    bool: {
      must: [
        { match: { id: id } },
        { match: { cnic: cnic } },
      ]
    }
  };

  const replacement = {
    "position": position
  }

  const response = await elasticClient.search({
    index: 'example1data',
    scroll: '1m',
    size: 1000,
    body: {
      query: Query
    }
  });
    
  const hits = response.hits.hits;
  console.log(hits)
  if (hits.length > 0) {
      const documentId = hits[0]._id;
      await elasticClient.update({
      index: 'example1data',
      id: documentId,
      body: {
        doc: replacement
      }
    });

    const updatedDocument = await elasticClient.get({
      index: 'example1data',
      id: documentId
    });

    console.log('Data updated on example1Indexer : ', updatedDocument);
    return res.status(200).send({ status: true, message: 'Data update successfully!', data: updatedDocument})

  } else {
    console.log('No documents found to update on example1Indexer');
    return res.status(200).send({ status: true, message: 'No documents found to update!'})

  }

  
} catch (e) {
  console.error(`Error update indexing data on example1Indexer :`)
  console.log(e.message)
  // return res.status(500).send({ status: false, message: 'Failed to indexed.' });
}

  
}

const updateDataExample2 = async (req, res) => {

  const { from, blockNumber, contractAddress, to, transactionHash} = req.query;
  try {
    console.log("Updating Token Index:",from, blockNumber, contractAddress)
    const elasticClient = await elasticConnection();
    const query = {
      bool: {
        must: [
          { match: { from: from } },
          { match: { blockNumber: blockNumber } },
          { match: { contractAddress: contractAddress } },
        ]
      }
    };
    console.log("query",query)
    const response = await elasticClient.search({
      index: 'example2data',
      scroll: '1m',
      size: 1000,
      body: {
        query: query
      }
    });
    console.log("response", response)

    const replacement = {
      "to": to,
      "transactionHash": transactionHash
    }
      
    const hits = response.hits.hits;
    console.log(hits)
    if (hits.length > 0) {
        const documentId = hits[0]._id;
        await elasticClient.update({
        index: 'example2data',
        id: documentId,
        body: {
          doc: replacement
        }
      });
  
      const updatedDocument = await elasticClient.get({
        index: 'example2data',
        id: documentId
      });
  
      console.log('Data updated on tokendata:', updatedDocument);
      return res.status(200).send({ status: true, message: 'Data update successfully!', data: updatedDocument})
    } else {
      console.log('No documents found to update on tokendata');
    }
  
    
  } catch (e) {
    console.error(`Error update indexing data on tokendata :`)
    console.log(e.message)
    // return res.status(500).send({ status: false, message: 'Failed to indexed.' });
  } 

}

const getExample1IndexerDetails = async (req, res) => {

  try {

    const { name } = req.query;
    console.log(` name : ${name}`)
    const elasticClient = await elasticConnection();
    const response = await elasticClient.search({
      index: 'example1data',
      scroll: '1m',
      size: 1000,
      body: {
        query: {
          match: {
            name: {
              query: name
            },
          }
        }
      }
    })
    const hits = response.hits.hits;
    console.log(hits);
  
    const documents = hits.map(hit => hit._source);
    // console.log(documents);
    if(documents.length){
      return res.status(200).send({ status: true, message: 'Data found successfully!', data: documents });
    }else{
      return res.status(200).send({ status: true, message: 'Data not exist on tokenIndexer!' });
    }

  } catch (e) {
    console.log(e.message)
    return res.status(500).send({ status: false, message: 'Failed to retrieve data.' });
  }

}

const getExample2IndexerDetails = async (req, res) => {

  try {

    const { from, blockNumber } = req.query;
    console.log(` from : ${from} , blockNumber : ${blockNumber}`)
    const elasticClient = await elasticConnection();
    const response = await elasticClient.search({
      index: 'example2data',
      scroll: '1m',
      size: 1000,
      body: {
        query: {
          bool: {
            must: [
              {
                match: {
                  from: from
                }
              },
              {
                match: {
                  blockNumber: blockNumber
                }
              }
            ]
          }
        }
      }
    })
    const hits = response.hits.hits;
    console.log(hits);
  
    const documents = hits.map(hit => hit._source);
    // console.log(documents);
    if(documents.length){
      return res.status(200).send({ status: true, message: 'Data found successfully!', data: documents });
    }else{
      return res.status(200).send({ status: true, message: 'Data not exist on tokenIndexer!' });
    }

  } catch (e) {
    console.log(e.message)
    return res.status(500).send({ status: false, message: 'Failed to retrieve data.' });
  }

}

const emptyIndexedData = async (req, res) => {

  try {
    const { indexerName } = req.query;
    console.log(`indexerName : ${indexerName}`)
    const elasticClient = await elasticConnection();
    const response = await elasticClient.deleteByQuery({
      index: indexerName,
      body: {
        query: {
          match_all: {} // Match all documents
        }
      }
    });
    if (response.deleted !== 0) {
      return res.status(200).send({ status: true, message: 'Data Delete successfully!', data: response});
    } else {
      console.log(`Failed to delete documents from ${indexerName} indexer`);
    }

  } catch (error) {
    console.error('Error deleting data : ')
    console.log(error.message)
  }


}

module.exports = {
  
  insertData,
  deleteDataFormExample1,
  deleteDataFormExample2,
  updateDataExample1,
  updateDataExample2,
  getExample1IndexerDetails,
  getExample2IndexerDetails,
  emptyIndexedData

}


