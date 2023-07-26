const mongoose = require('mongoose')


const Schema = mongoose.Schema
const Model = mongoose.model

const bookSchema = new Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, required: true },
    pages: { type: Number, required: true },
    description: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    datePosted: { type: Date, default: Date.now() }

})

module.exports = Model("Book", bookSchema)





