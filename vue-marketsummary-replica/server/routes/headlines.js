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

function getHeadlines(){
    const headlinesFile = fs.readFileSync(`../API-calls/getHeadlines.json`)
    const headlinesData = JSON.parse(headlinesFile)
    return headlinesData;
}

//**********************//
//*****  REQUESTS  *****//
//**********************//

router.get('/', (_req, res) => {
    const getHeadlinesData = getHeadlines()
    res.status(200).json(getHeadlinesData)
})


//EXPORTING
module.exports = router; // exporting this route