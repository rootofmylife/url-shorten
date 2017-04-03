var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var urlSchemav= new Schema({
    url: {
        type: String,
        unique: true
    },
    shortURL:{
        type: Number,
        unique: true
    }
})

module.exports = mongoose.model('Url', urlSchemav);