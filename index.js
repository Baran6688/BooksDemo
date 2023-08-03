// Requiring Dependancies
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const methodOverride = require("method-override")
const engine = require('ejs-mate')
const session = require("express-session")
const passport = require('passport')
const localStrategy = require('passport-local')
const User = require("./models/user")
const MongoDbStore = require("connect-mongo")(session)



// Connecting MongoDB by Mongoose
mongoose.connect('mongodb+srv://baranali6688:1234@books.p6iwptq.mongodb.net/?retryWrites=true&w=majority')
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

const store = new MongoDbStore({
    url: 'mongodb+srv://baranali6688:1234@books.p6iwptq.mongodb.net/?retryWrites=true&w=majority',
    secret: 'nazanm',
    touchafter: 24 * 60 * 60
})
store.on("error", function (err) { console.log(err) })


const sessionConfing = {
    store: store,
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




// Routes
userRoute = require("./routes/user")
app.use("/", userRoute)

bookRoute = require("./routes/books")
app.use("/", bookRoute)




app.listen(3000, () => { console.log("LISTENING FROM PORT 3000") })