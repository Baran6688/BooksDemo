const mongoose = require('mongoose')


const Schema = mongoose.Schema
const Model = mongoose.model

const bookSchema = new Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, required: true },
    pages: { type: Number, required: true },
    description: { type: String, required: true }

})

module.exports = Model("Book", bookSchema)





