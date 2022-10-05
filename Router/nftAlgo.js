const algosdk = require('algosdk');
const crypto = require('crypto');
const fs = require('fs').promises
// see ASA param conventions here: https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0003.md
// for JavaScript SDK doc see: https://algorand.github.io/js-algorand-sdk/

const creator = alice.addr;
const defaultFrozen = false;    
const unitName = "ALICEART"; 
const assetName = "Alice's Artwork@arc3";
const url = "https://path/to/my/nft/asset/metadata.json";
const managerAddr = undefined; 
const reserveAddr = undefined;  
const freezeAddr = undefined;
const clawbackAddr = undefined;
const total = 1;                // NFTs have totalIssuance of exactly 1
const decimals = 0;             // NFTs have decimals of exactly 0
const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    from:creator,
    total,
    decimals,
    assetName,
    unitName,
    assetURL: url,
    assetMetadataHash: metadata,
    defaultFrozen,
    freeze: freezeAddr,
    manager: managerAddr,
    clawback: clawbackAddr,
    reserve: reserveAddr,
    suggestedParams: params,});
    console.log("txn");