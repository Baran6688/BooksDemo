const express = require("express")
const app = express()
const mongoose = require('mongoose')
const ejs = require('ejs')



app.use(express.urlencoded({ extended: true }))
app.use('view engine', 'ejs')

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        console.log("Connected to MongoDb")
    })
    .catch(er => { console.log("Cannot connect to MONGO SERVER!!!", er) })



app.get("/", (req, res) => {
    res.send("HOMEE")
})




app.listen(3000, () => console.log("LISTENING FROM PORT 3000"))