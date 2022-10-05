const express = require('express');
const root = express.Router();
var path = require("path");
//const multichain = require('..');
var admin = require('../model/adminRegSchema')

let multichain = require("multichain-node")({
     port: process.env.MULTICHAIN_PORT,
     host: process.env.MULTICHAIN_HOST,
     user: process.env.MULTICHAIN_RPC,
     pass: process.env.MULTICHAIN_PASSWORD
 });

root.get('/', async (req, res) => {
     res.sendFile(await path.join(__dirname, "../views/index.html"));
})

root.get('/logout',async(req,res)=>{
     res.cookie("jwt",'',{maxAge : 1});
     res.sendFile(await path.join(__dirname, "../views/index.html"));
})

root.get('/doctor',async(req,res)=>{
     res.sendFile(await path.join(__dirname, "../views/viewedPatientDoc.html"));
})

root.get('/getinfo',async(req, res) => {
     // if (admin.userName == true) {
          multichain.getInfo(async(err, data) => {
               if (err) {
                    res.json(err)
                    console.log(err);
               } else {
                    await res.json(data);
                    console.log("_____", data);
               }
          })
     // } else {
     //      res.json("Only admin can view getInfo")
     // }
})


module.exports = root;
