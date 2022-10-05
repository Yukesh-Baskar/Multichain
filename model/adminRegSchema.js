const mongoose = require('mongoose')
const Admin = mongoose.Schema({
    userName : {
       type : String,
       required : true
    },
    userRole : {
       type : String,
       required : true
    },
    Password : {
       type : String,
       required : true
    },
    confirmPassword : {
       type : String,
       required : true
    }
})
module.exports = mongoose.model('users',Admin)
