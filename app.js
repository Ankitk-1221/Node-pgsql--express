const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')
const moment = require('moment')
const helmet = require('helmet');

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// enable cors
app.use(cors());


app.options('*', cors());

const routes = require('./routes/routes');

//configure the app.
app.use(routes);


module.exports = app;



app.listen(8000, () => {
  console.log(`Server is running.`);
});

