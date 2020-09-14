/** @format */

const express = require("express");
const router = express.Router();
const key = "1vMMyLdNxNHPzF4dGXbgvoNlnjjYevErWpESg1ZCFCCLkonTW964gpSM"; // API Key
const secret =
  "52LSImPMwJ5K/0GIWAok+0o75tCaz+7g+rTo8f9prxDFN1H4H8/zCm7YxVh+1QT5cXKq325S+Gfan8cVKrx2pw=="; // API Private Key

Kraken = require("kraken-exchange");

const kraken = new Kraken(key, secret);

router.post("/price", (req, res) => {
  kraken.bidAsk(req.body.pair).then((result) => {
    res.send(result);
  });
});

router.get("/balance", (req, res) => {
  kraken
    .balance()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/balance", (req, res) => {
  console.log(req.body);
  kraken
    .tradeBalance(req.body.pair)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

// pair, type, ordertype, volume[, price[, price2[, leverage[, closetype[, closeprice[, closeprice2

router.post("/order", (req, res) => {
  const param = {
    pair: req.body.pair,
    type: req.body.type,
    ordertype: req.body.ordertype,
    volume: req.body.vol,
  };
  kraken
    .addOrder(param)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
  // kraken.addOrder(params)
});
// (async () => {

//     // Display user's balance
// 	console.log(await kraken.api('Balance'));

//     // Get Ticker Info
//     console.log('hello')
// 	console.log(await kraken.api('Ticker', { pair : 'XXBTZUSD' }));

// 	// Display user's balance
// 	console.log(await kraken.api('AddOrder',{pair : 'XXBTZUSD',type:"buy", ordertype: "market",volume:"0.001"}));

// 	// // Get Ticker Info
// 	// console.log(await kraken.api('Ticker', { pair : 'XXBTZUSD' }));
// })();

// const key          = '1vMMyLdNxNHPzF4dGXbgvoNlnjjYevErWpESg1ZCFCCLkonTW964gpSM'; // API Key
// const secret       = '52LSImPMwJ5K/0GIWAok+0o75tCaz+7g+rTo8f9prxDFN1H4H8/zCm7YxVh+1QT5cXKq325S+Gfan8cVKrx2pw=='; // API Private Key

// const KrakenClient = require('kraken-api');
// const kraken       = new KrakenClient(key, secret);

// (async () => {
//     const param = {
//         pair : 'XXRPZUSD',
//         type: 'buy',
//         ordertype : 'market',
//         volume : 100}
//     console.log(await kraken.api('AddOrder', param))
// 	// Display user's balance
// 	console.log(await kraken.api('Balance'));

// 	// Get Ticker Info
// 	console.log(await kraken.api('Ticker', { pair : 'XXBTZUSD' }));
// })();

module.exports = router;
