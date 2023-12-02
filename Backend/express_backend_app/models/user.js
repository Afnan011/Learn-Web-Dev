const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    
    name : {
        type: String,
        required: true
    },

    rollNo : {
        type: String,
        required: true
    },

    whichClass : {
        type: String,
        required: true
    }

})


module.exports = mongoose.model('User', userSchema)