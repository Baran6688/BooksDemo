// Requiring Dependancies
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const methodOverride = require("method-override")
const Book = require("./models/book")
const engine = require('ejs-mate')


// Connecting MongoDB by Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        console.log("Connected to MongoDb")
    })
    .catch(er => { console.log("Cannot connect to MONGO SERVER!!!", er) })




// ejs stuff
app.set('views', __dirname + '/views')
app.engine('ejs', engine)
app.set('view engine', 'ejs')


// req.body requirements and Method Override
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))





app.get("/", async (req, res) => {
    const books = await Book.find()

    res.render("bookList", { books })
})

app.get("/new", (req, res) => {
    res.render("new")
})


app.post("/new", async (req, res) => {
    const { name, author, date } = req.body
    console.log(`Name is: ${name} and Author is ${author} and ${date}`)
    const newBook = await new Book(req.body)
    await newBook.save()
    res.redirect("/")

})

app.get("/show/:id", async (req, res) => {
    const { id } = req.params
    const book = await Book.findById(id)

    res.render("showBook", book)
})

app.delete("/delete/:id", async (req, res) => {
    const { id } = req.params
    await Book.findByIdAndDelete(id)
    res.redirect("/")
})


app.listen(3000, () => { console.log("LISTENING FROM PORT 3000") })