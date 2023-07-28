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



bookSchema.methods.Adduserfor = async function (UserId) {
    const theUser = await User.findByIdAndUpdate(UserId, { $push: { posts: this._id } })
    await theUser.save()
}



bookSchema.post('findOneAndDelete', async function (doc) {
    const foundUser = await User.findByIdAndUpdate(doc.user, { $pull: { posts: doc._id } });
    await foundUser.save()
})


module.exports = Model("Book", bookSchema)





