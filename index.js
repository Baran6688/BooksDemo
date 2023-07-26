// Requiring Dependancies
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const methodOverride = require("method-override")
const Book = require("./models/book")
const engine = require('ejs-mate')
const session = require("express-session")
const passport = require('passport')
const localStrategy = require('passport-local')
const User = require("./models/user")
const { isLoggedIn, isBookuser } = require("./middleware")



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


// req.body requirements, Method Override and Public Directory 
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))


// Session Stuff and Passport Stuffs


const sessionConfing = {
    secret: 'nazanm',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7

    }
}
app.use(session(sessionConfing))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//Sessions I work with
app.use((req, res, next) => {
    res.locals.currentUser = req.user
    next()

})



// const isBookuser = async (req, res, next) => {
//     const { id } = req.params
//     const book = await Book.findById(id)
//     if (book.user !== req.user.id) {
//         return res.redirect(`/show/${id}`)
//     }
//     next()
// }





app.get("/", async (req, res) => {
    const books = await Book.find()

    res.render("bookList", { books })
})


app.get('/register', (req, res) => {
    res.render("register")
    console.log(req.user)
})




app.post('/register', async (req, res) => {
    try {
        const { name, username, password } = req.body
        const newUser = await new User({ name, username })
        const registerUser = await User.register(newUser, password)

        res.redirect('/')
    } catch (e) {
        res.redirect('/register')
    }

})

app.get("/login", (req, res) => {
    res.render("login")

})


app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
});


app.get('/logout', async (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });

});

app.get("/new", isLoggedIn, (req, res) => {

    res.render("new")
})


app.post("/new", isLoggedIn, async (req, res) => {

    const newBook = await new Book({ ...req.body, user: req.user.id })
    await newBook.save()
    res.redirect(`/show/${newBook.id}`)

})

app.get("/show/:id", async (req, res) => {
    const { id } = req.params
    const book = await Book.findById(id).populate("user")

    res.render("showBook", book)
})

app.get("/edit/:id", isLoggedIn, isBookuser, async (req, res) => {
    const { id } = req.params
    const book = await Book.findById(id)

    res.render("editBook", book)
})

app.patch("/edit/:id", isLoggedIn, isBookuser, async (req, res) => {
    const { id } = req.params

    const book = await Book.findByIdAndUpdate(id, req.body)

    await book.save()
    res.redirect(`/show/${id}`)

})

app.delete("/delete/:id", isLoggedIn, isBookuser, async (req, res) => {
    const { id } = req.params
    await Book.findByIdAndDelete(id)

    res.redirect("/")
})




app.listen(3000, () => { console.log("LISTENING FROM PORT 3000") })