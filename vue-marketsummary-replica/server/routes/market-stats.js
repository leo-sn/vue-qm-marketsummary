const express = require('express');
const app = express();
const router = express.Router(); // using routing to the server.js
const fs = require('fs');


//MIDDLEWARE
app.use(express.json());

//**********************//
//***** START HERE *****//
//**********************//

//***** FUNCTIONS ******/

function readSymbolFile(symbol) {
    const readMarketStatsSymbolFile = fs.readFileSync(`../API-calls/getMarketStats${symbol}.json`)
    const symbolData = JSON.parse(readMarketStatsSymbolFile)
    return symbolData;
}

//**********************//
//*****  REQUESTS  *****//
//**********************//

router.get('/', (req, res) => {
    if(req.query.symbol == 'AMX' || req.query.symbol == 'NGS' || req.query.symbol == 'NYE') {
        const responseData = readSymbolFile(req.query.symbol)
        res.status(200).json(responseData)
    } else {
        res.status(200).send('Not a valid symbol. Try: NGS, AMX, or NYE.')
    }
})


//EXPORTING
module.exports = router; // exporting this route