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

function getSnapQuote() {
    const snapQuoteFile = fs.readFileSync(`../API-calls/getSnapQuotes.json`)
    const snapQuoteData = JSON.parse(snapQuoteFile)
    return snapQuoteData;
}

//**********************//
//*****  REQUESTS  *****//
//**********************//

router.get('/', (_req, res) => {
    const getData = getSnapQuote();
    res.status(200).json(getData)
})

//EXPORTING
module.exports = router; // exporting this route