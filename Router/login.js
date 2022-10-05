const express = require('express');
const root = express.Router();
var path = require("path");
var infoLogin = require("../model/adminRegSchema")
var bcrypt = require("bcrypt")
var jwt = require("jsonwebtoken");
const alert = require('alert');


const createToken = (id) => {
    return jwt.sign({ id }, "the secret", {
        expiresIn: 20 * 60
    })
}


root.get('/loginpage', async (req, res) => {
    await res.sendFile(await path.join(__dirname, "../views/login.html"));
})

root.get('/logout', async (req, res) => {
    console.log("indexpage");
    res.cookie("jwt",'',{maxAge : 1});
    res.sendFile(await path.join(__dirname, "../views/index.html"));
    console.log("exopres");
})

root.post('/login', async (req, res) => {
    const username = await req.body.userName;
    const password = await req.body.Password;

    await infoLogin.findOne({ userName: username }, async (err, data) => {
        if (await data == null) return alert("You need to signIn or userName invalid");
        console.log("coming");
        try {
            if (data) {
                var temp = await bcrypt.compare(password, data.Password)
                if (temp) {
                    console.log("y");
                    if (data.userName == username && data.userRole == "nurse") {
                        const token = await createToken(data.userName);
                        res.cookie('jwt', token)
                        console.log(res.cookie);
                        res.sendFile(await path.join(__dirname, "../views/doctorHomePage.html"))
                    }
                    else if (data.userRole == "doctor" && data.userName == username) {
                        const token = await createToken(data.userName);
                        res.cookie(`jwt`, token);
                        // res.cookie('jwt', token, { httpOnly: true, maxAge: 2 * 60 })
                        console.log(res.cookie);
                        res.sendFile(await path.join(__dirname, "../views/nurseHomePage.html"))
                    }
                    else {
                        res.sendFile(await path.join(__dirname, "../views/patientHome.html"))
                    }
                } else {
                    alert("incorrect password or userName")
                }
            } else {
                alert("error")
            }
        } catch (err) {
            alert("error in username or password invalid")
        }
    })
})

module.exports = root;
