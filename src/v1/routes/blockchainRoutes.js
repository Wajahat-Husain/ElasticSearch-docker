const express = require('express')
const blockchainController = require('../../controllers/blockchainController')

const router = express.Router()

router.post('/insertData', blockchainController.insertData)

router.get('/deleteDataFormExample1', blockchainController.deleteDataFormExample1)
router.get('/deleteDataFormExample2', blockchainController.deleteDataFormExample2)

router.get('/updateDataExample1', blockchainController.updateDataExample1)
router.get('/updateDataExample2', blockchainController.updateDataExample2)

router.get('/getExample1IndexerDetails', blockchainController.getExample1IndexerDetails)
router.get('/getExample2IndexerDetails', blockchainController.getExample2IndexerDetails)

router.get('/emptyIndexedData', blockchainController.emptyIndexedData)


module.exports = router
