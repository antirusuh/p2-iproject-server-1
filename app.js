if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express');
const cors = require('cors');
const router = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`app listen in port ${port}`);
})