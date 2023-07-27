const express = require("express")
const router = express.Router()
const User = require("../models/user")
const passport = require('passport')




router.get('/register', (req, res) => {
    if (req.user) {
        return res.redirect("/")
    }
    res.render("register")

})




router.post('/register', async (req, res) => {

    try {
        const { name, username, password } = req.body
        const newUser = await new User({ name, username })
        const registerUser = await User.register(newUser, password)

        res.redirect('/')
    } catch (e) {
        res.redirect('/register')
    }


})

router.get("/login", (req, res) => {
    if (req.user) {
        return res.redirect("/")
    }
    res.render("login")

})


router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
});


router.get('/logout', async (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });

});


router.get("/account/:id", async (req, res) => {
    const { id } = req.params
    const theUser = await User.findById(id).populate("posts")
    res.render("UserPosts", { theUser })
})

module.exports = router