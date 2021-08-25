if (process.env.NODE_ENV === 'development') {
    require('dotenv');
}
const express = require('express');
const cors = require('cors');


const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`app listen in port ${port}`);
})