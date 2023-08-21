//importing express and initializing it on data
const express = require('express');
const app = express();

//solving CORS:
const cors = require('cors');
app.use(cors())

//reading/writting files
const fs = require('fs');

//defining server address and port
const PORT = 3030;
const hostname = '127.0.0.1';


//importing the routes
const headlineRoute = require('./routes/headlines');
const marketActivityRoute = require('./routes/market-activity');
const marketQuoteRoute = require('./routes/market-quote');
const marketStatsRoute = require('./routes/market-stats');
const snapQuoteRoute = require('./routes/snap-quote');

//**********************//
//***** START HERE *****//
//**********************//


//Middleware:
app.use(express.json()); // -> to use Json format

app.use('/headlines', headlineRoute);
app.use('/market-activity-stats', marketActivityRoute);
app.use('/market-quotes', marketQuoteRoute);
app.use('/market-stats', marketStatsRoute);
app.use('/snap-quotes', snapQuoteRoute);


//root access
app.get('/', (_req, res) => {
    res.status(200).send('Accessed root /')
})

//warehouse access
// app.use('/warehouse', warehouseRoute)

//Listening for access on PORT
app.listen(PORT, hostname, () => {
    console.log(`Server running on port ${PORT}`);
});