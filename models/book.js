const mongoose = require('mongoose')


const Schema = mongoose.Schema
const Model = mongoose.model
const User = require("./user")

const bookSchema = new Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, required: true },
    pages: { type: Number, required: true },
    description: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    datePosted: { type: Date, default: Date.now() }

})



bookSchema.methods.Adduserfor = async function (user) {
    const UserPosts = user.posts
    UserPosts.unshift(this._id)
    user.save()
}

bookSchema.post('findOneAndDelete', async function (doc) {
    foundUser = await User.findById(doc.user)
    const UserPosts = foundUser.posts
    const indexOfitem = UserPosts.indexOf(doc._id)
    UserPosts.splice(indexOfitem, 1)
    await foundUser.save()
})


module.exports = Model("Book", bookSchema)





