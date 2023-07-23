const mongoose = require('mongoose')


const Schema = mongoose.Schema
const Model = mongoose.model

const bookSchema = new Schema({
    name: String,
    author: String,
    date: Date,
    pages: Number

})

module.exports = Model("Book", bookSchema)





