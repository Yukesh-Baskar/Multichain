const express = require('express');
const root = express.Router();
var multichain = require('../middleware/mul.js')
const authenticate = require('../middleware/auth.js')

root.post('/publishPrescription', async (req, res) => {
    console.log("___", req.body);
    await multichain.publish({
        stream: "hospital",
        key: String(req.body.key),
        data: {
            "json": {
                prescription: req.body.prescription
            }
        }
    }, async (err, data) => {
        if (err) {
            res.json(err);
            console.log("err", err);
        } else {
            res.json("successfully entered patients prescription")
        }
    })
})


root.get('/publishStatus/:key/:status', async (req, res) => {
    console.log("___", req.params);
    await multichain.publish({
        stream: "hospital",
        key: String(req.params.key),
        data: {
            "json": {
                status: req.params.status
            }
        }
    }, async (err, data) => {
        if (err) {
            res.json(err);
            console.log("err", err);
        } else {
            multichain.listStreamKeyItems({
                stream: "hospital",
                key: String(req.params.key),
                verbose: true
            }, async (err, data) => {
                if (err) {
                    console.log(("__err", err));
                } else {
                    console.log(data[0], data[1], "__");
                    res.json(data)
                    // res.json(await { "infodetails": info[info.length - 2].data, "infostatus": info[info.length - 1].data });
                }
            })
        }
    })
})

root.get('/liststreamkeyitemswithdocname/:name',  authenticate.authenticate,async (req, res) => {
    console.log("params", req.params);
    multichain.listStreamKeyItems({
        stream: "hospital",
        key: req.params.name,
        verbose: true
    }, async (err, info) => {
        if (err) {
            console.log("err", err);
        } else if (info.length == 0) {
            return res.json(err)
        }
        else {
            console.log(info,"info");
            res.json(info)
            // if (info[info.length - 1].data.json.status == undefined) {
            //     console.log("full");
            //     res.json(await info[info.length - 1].data)
            // } else {
            //     console.log("statuswith");
            //     res.json(await { "infodetails": info[info.length - 2].data, "infostatus": info[info.length - 1].data });
            // }
        }
    })
})



root.get('/liststreamkeyitemss/:key', authenticate.authenticate,async (req, res) => {
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
            console.log(info[info.length - 1].data);
            if (info[info.length - 1].data.json.status == undefined) {
                console.log("full");
                res.json(await info[info.length - 1].data)
            } else {
                console.log("statuswith");
                res.json(await { "infodetails": info[info.length - 2].data, "infostatus": info[info.length - 1].data });
            }
        }
    })
})



// root.get('/liststreamkeyitemss/:key', async (req, res) => {
//     console.log("params", req.params);
//     multichain.listStreamKeyItems({
//         stream: "hospital",
//         key: String(req.params.key),
//         verbose: true
//     }, async (err, info) => {
//         if (err) {
//             console.log("err", err);
//         } else if (info.length == 0) {
//             return res.json(err)
//         }
//         else {
//             console.log(info[info.length - 1].data, "___", info[info.length - 2].data);
//             res.json({ "infodetails": info[info.length - 1].data, "infostatus": info[info.length - 2].data });
//         }
//     })
// })



















module.exports = root;