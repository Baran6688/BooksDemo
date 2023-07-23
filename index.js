const express = require("express")
const app = express()
const mongoose = require('mongoose')
const path = require("path")
const ejs = require('ejs')
const methodOverride = require("method-override")



app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(methodOverride('_method'))

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        console.log("Connected to MongoDb")
    })
    .catch(er => { console.log("Cannot connect to MONGO SERVER!!!", er) })

const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    date: Date,
    pages: Number

})

const Book = mongoose.model("Book", bookSchema)










app.get("/", (req, res) => {
    res.send("HOMEE")
})

app.get("/new", (req, res) => {
    res.render("new")
})


app.post("/new", async (req, res) => {
    const { name, author, date } = req.body
    console.log(`Name is: ${name} and Author is ${author} and ${date}`)
    const newBook = await new Book(req.body)
    newBook.save()
    res.send(newBook)

})


app.listen(3000, () => { console.log("LISTENING FROM PORT 3000") })