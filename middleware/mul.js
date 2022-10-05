require("dotenv").config()

let multichain = require("multichain-node")({
    port: process.env.MULTICHAIN_PORT,
    host: process.env.MULTICHAIN_HOST,
    user:  process.env.MULTICHAIN_RPC,
    pass: process.env.MULTICHAIN_PASSWORD
});

module.exports = multichain;