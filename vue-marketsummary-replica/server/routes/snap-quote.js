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

function getSnapQuote(location) {
    const snapQuoteFile = fs.readFileSync(`../API-calls/getSnapQuotes${location}.json`)
    const snapQuoteData = JSON.parse(snapQuoteFile)
    return snapQuoteData;
}

//**********************//
//*****  REQUESTS  *****//
//**********************//

router.get('/', (req, res) => {
    console.log(req.query.location)
    if(req.query.location == 'NA' || req.query.location == 'FOREX'){
        const responseData = getSnapQuote(req.query.location)
        res.status(200).json(responseData)
    } else {
        res.status(200).send('Make sure to include a valid location: NA. Default is Forex')
    }
})

//EXPORTING
module.exports = router; // exporting this route