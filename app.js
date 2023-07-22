const express = require("express")
const app = express()
const ejs = require('ejs')

app.use(express.urlencoded({ extended: true }))
app.use('view engine', 'ejs')



app.get("/", (req, res) => {
    res.send("HOMEE")
})


app.listen(3000, () => console.log("LISTENING FROM PORT 3000"))