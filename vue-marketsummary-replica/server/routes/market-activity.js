const express = require('express');
const app = express();
const router = express.Router(); // using routing to the server.js
const fs = require('fs');

//MIDDLEWARE
app.use(express.json()); // allow to use json

//**********************//
//***** START HERE *****//
//**********************//

//***** FUNCTIONS ******/

// read files WarehouseJSON and InventoriesJSON
function readSymbolFile(symbol) {
    const readMarketActivitySymbolFile = fs.readFileSync(`../API-calls/getMarketActivityStats${symbol}.json`)
    const symbolData = JSON.parse(readMarketActivitySymbolFile)
    return symbolData;
}


//**********************//
//*****  REQUESTS  *****//
//**********************//

router.get('/', (req, res) => {
    if(req.query.symbol == 'AMX' || req.query.symbol == 'NSD' || req.query.symbol == 'NYE' || req.query.symbol == 'TSV' || req.query.symbol == 'TSX') {
        const responseData = readSymbolFile(req.query.symbol)
        res.status(200).json(responseData)
    } else {
        res.status(200).send('Make sure to include a valid symbol: AMX, NSD, NYE, TSV, or TSX.')
    }
})

//EXPORTING
module.exports = router; // exporting this route