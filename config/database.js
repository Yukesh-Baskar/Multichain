require('dotenv').config()
const mongoose = require('mongoose')

module.exports = connect = () => {
    mongoose.connect(process.env.DB_CONNECT, async (err, res) => {
        if (err) {
            console.log("DB Connection issue")
        } else {
            console.log("db created successfully")
        }
    })
}

