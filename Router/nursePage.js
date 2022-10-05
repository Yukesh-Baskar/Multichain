const express = require('express');
const root = express.Router();
var multichain = require('../middleware/mul.js')
var rn = require('random-number');
let alert = require('alert');
const authenticate = require('../middleware/auth.js')
var infoDoc = require('../model/adminRegSchema')
var userid = {
    min: 1, max: 100, integer: true
}



// root.get('/gett', authenticate.authenticate,async (req, res) => {
//  res.send("hlo")
// })
root.post('/publishToDoctor/:docname',authenticate.authenticate, async (req, res) => {
    console.log("___", req.params);
    var ids = req.params.docname;

    var currentdate = new Date();
    var datetime = (currentdate.getDate()) + "/" + (currentdate.getMonth()) + "/" + (currentdate.getFullYear()) + " @ " + (currentdate.getHours()) + ":" + (currentdate.getMinutes()) + ":" + (currentdate.getSeconds());
    await infoDoc.findOne({userName : ids},async(err,data)=>{
        console.log(data === null);
        if(data === null) { 
            res.json("Only doctor can update patient details");
        }
        else {
            console.log("doc else value");
            await multichain.publish({
                stream: "hospital",
                key: ids,
                data: {
                    "json": {
                        doctor_name : ids,
                        name: req.body.name,
                        age: req.body.age,
                        blood_pressure: req.body.blood_pressure,
                        temperature: req.body.temperature,
                        disease: req.body.disease,
                        prescription: req.body.prescription,
                        mobile: req.body.mobile,
                        time: datetime
                    }
                }
            }, async (err, data) => {
                if (err) {
                    res.json(err);
                    console.log("err", err);
                } else {
                    res.json(ids)
                    console.log(ids,"ids");
                    // console.log(req.body)
        
                }
            })
            res.status(200);
        }
    });

    

    
})




root.post('/publish/:docname',authenticate.authenticate,async (req, res) => {
    console.log("___", req.params);
    var ids = String(rn(userid))
    var currentdate = new Date();
    var datetime = (currentdate.getDate()) + "/" + (currentdate.getMonth()) + "/" + (currentdate.getFullYear()) + " @ " + (currentdate.getHours()) + ":" + (currentdate.getMinutes()) + ":" + (currentdate.getSeconds());
    await infoDoc.findOne({ userName: req.params.docname }, async (err, data) => {
        console.log(data === null);
        if (data === null) {
            res.json("Only doctor can update patient details");
        }
        else {
            console.log("elseee value");
            await multichain.publish({
                stream: "hospital",
                key: ids,
                data: {
                    "json": {
                        id: ids,
                        doctor_name: req.params.docname,
                        name: req.body.name,
                        age: req.body.age,
                        blood_pressure: req.body.blood_pressure,
                        temperature: req.body.temperature,
                        disease: req.body.disease,
                        prescription: req.body.prescription,
                        mobile: req.body.mobile,
                        time: datetime
                    }
                }
            }, async (err, data) => {
                if (err) {
                    res.json(err);
                    console.log("err", err);
                } else {
                    res.json({ "id": ids, "body": req.body, "time": datetime })
                    // console.log(req.body)

                }
            })
            res.status(200);
        }
    });
})

root.get('/liststreamkeyitemss/:key',authenticate.authenticate, async (req, res) => {
    console.log("params", req.params);
    multichain.listStreamKeyItems({
        stream: "hospital",
        key: String(req.params.key),
        verbose: true
    }, async (err, info) => {
        if (err) {
            console.log("err", err);
        } else if (info.length == 0) {
            return res.json(err)
        }
        else {
            if (info[info.length - 1].data.json.status == undefined) {
                console.log("fullnurse");
                res.json(await info[info.length - 1].data)
            } else {
                console.log("nursestatus");
                // console.log(info[info.length - 2].data,"_");
                // console.log(info[info.length - 1].data,"_");
                res.json({ "infodetails": info[info.length - 2].data, "infostatus": info[info.length - 1].data });
            }
        }
    })
})

module.exports = root;