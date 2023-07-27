const mongoose = require("mongoose")

const Schema = mongoose.Schema
const Model = mongoose.model
const passportLocalMongoose = require("passport-local-mongoose")


const userSchema = new Schema({
    name: String,
    posts: { type: [Schema.Types.ObjectId], ref: "Book" },



    // statics: {
    //     findByName(name) {
    //         return this.find({ name: new RegExp(name, 'i') });
    //     }
    // }

})



userSchema.plugin(passportLocalMongoose)


module.exports = Model("User", userSchema)


