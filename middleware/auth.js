const express = require('express');
const req = require('express/lib/request');
const root = express.Router();
var userSchema = require('../model/adminRegSchema')
var alert = require('alert')
var jwt = require('jsonwebtoken')
var path = require("path");

exports.authenticate = async (req, res, next) => {
    const token = req.cookies.jwt;
console.log("auth");
    if (token) {
        jwt.verify(token,"the secret",async(err,decodetToken)=>{
            if (err) {
                alert("You must login first!")
                console.log('here');
            } else {
                console.log("auth");
                console.log(decodetToken);
                next()
            }
        })
    } else {
        alert("You must login")
        console.log('hereee');
    }
}


