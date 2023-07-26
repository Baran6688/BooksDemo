const Book = require("./models/book")

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login")
    }
    next()
}


const isBookuser = async (req, res, next) => {
    const { id } = req.params
    const book = await Book.findById(id)

    if (book.user.equals(req.user._id)) {
        return next()
    }
    res.redirect(`/show/${id}`)

}

module.exports = { isLoggedIn, isBookuser }
