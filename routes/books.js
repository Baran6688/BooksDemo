const express = require("express")
const router = express.Router()
const { isLoggedIn, isBookuser } = require("../middleware")
const Book = require("../models/book")
const User = require("../models/user")


router.get("/", async (req, res) => {
    const books = await Book.find()

    res.render("bookList", { books })
})


router.get("/new", isLoggedIn, (req, res) => {

    res.render("new")
})


router.post("/new", isLoggedIn, async (req, res) => {

    const newBook = await new Book({ ...req.body, user: req.user.id })
    await newBook.save()
    res.redirect(`/show/${newBook.id}`)

})

router.get("/show/:id", async (req, res) => {
    const { id } = req.params
    const book = await Book.findById(id).populate("user")

    res.render("showBook", book)
})

router.get("/edit/:id", isLoggedIn, isBookuser, async (req, res) => {
    const { id } = req.params
    const book = await Book.findById(id)

    res.render("editBook", book)
})

router.patch("/edit/:id", isLoggedIn, isBookuser, async (req, res) => {
    const { id } = req.params

    const book = await Book.findByIdAndUpdate(id, req.body)

    await book.save()
    res.redirect(`/show/${id}`)

})

router.delete("/delete/:id", isLoggedIn, isBookuser, async (req, res) => {
    const { id } = req.params
    await Book.findByIdAndDelete(id)

    res.redirect("/")
})


module.exports = router
