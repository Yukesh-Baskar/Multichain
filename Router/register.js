const express = require('express');
const root = express.Router();
var path = require("path");
// const bodyParser = require('body-parser')
const adminshema = require('../model/adminRegSchema')
var bcrypt = require('bcrypt')
// const { check, validationResult } = require('express-validator')
// root.use(bodyParser.json())
// var cors = require('cors');
// root.use(cors())
// root.use(bodyParser.json());
// root.use(bodyParser.urlencoded({ extended: true }));


root.get('/registerPage', async (req, res) => {
    res.sendFile(await path.join(__dirname, "../views/register.html"));
})

root.post('/register',
//  check('userName').isLength({min : 6}).withMessage("userName must have atleast 6 chaeacters!!!"),
//     check('Password').isLength({ min: 6 }).matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/).withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long'),
    async (req, res) => {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   return res.json({ errors: errors.array() });
        // }

        //if(adminshema.findOne({userRole : req.body.userRole}) == req.body.userRole) return res.status(400).send("Doctor already registered");
        const emailexist = await adminshema.findOne({ userRole: req.body.userRole })
        // if (req.body.userRole == "doctor") {
        //     if (emailexist) return res.json('Doctor userRole is already taken!!!')
        // }
        if (req.body.Password != req.body.confirmPassword) return res.json("Password and confirm password does'nt match!");
        else if (req.body.userName == '') return res.json("userName should not be empty!!!")
        else if (req.body.userRole == '') return res.json("userRole is empty!!!")
        else if (req.body.Password == '') return res.json("Password field is empty!!!")

        var adminreg = new adminshema({
            userName: req.body.userName,
            userRole: req.body.userRole,
            Password: await bcrypt.hash(req.body.Password, 10),
            confirmPassword: await bcrypt.hash(req.body.confirmPassword, 10)
        })
        console.log("come");
        try {
            if (req.body != null) {
                adminreg.save()
                res.json("Registered successfully")
            }
        } catch (error) {
            res.json(error);
        }
    })

module.exports = root;
