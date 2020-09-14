/** @format */

const router = require("express").Router();
const BitGo = require("bitgo");
var bitgo = new BitGo.BitGo({
  env: "test",
  accessToken:
    "7d2eb5788ad169b5dc44a76dc4e76f5888df24261ae9368457507c68a15799f0",
});

// router.get('/s',(req,res)=>{
//     var wallets = bitgo.wallets();
//     wallets.list({}, function callback(err, data) {
//     // handle error, do something with wallets
//     for (var id in data.wallets) {
//       console.log('wallet')
//       var wallet = data.wallets[id].wallet;
//       console.log(JSON.stringify(wallet, null, 4));
//     }
//     console.log('hello')
//     res.send(wallets)
//     });

// })

router.get("/balance", (req, res) => {
  var wallets = bitgo.wallets();
  var data = {
    type: "safehd",
    id: req.body.id,
  };
  wallets.get(data, function callback(err, wallet) {
    if (err) {
      // handle error
      res.send(err);
    }
    // Use wallet object here
    console.dir(wallet);
    console.dir(wallet.balance());
    res.send(wallet);
  });
});

// router.get('/create',(req,res)=>{
//   var data = {
//     "passphrase": 'password',
//     "label": 'label',
//     "backupXpubProvider": "keyternal"
//   }

//   bitgo.wallets().createWalletWithKeychains(data, function(err, result) {
//     if (err) { console.dir(err); throw new Error("Could not create wallet!"); }
//     console.dir(result.wallet.wallet);
//     console.log("User keychain encrypted xPrv: " + result.userKeychain.encryptedXprv);
//     console.log("Backup keychain xPub: " + result.backupKeychain.xPub);
//   });
// })

// router.get('/addaddress',(req,res)=>{
//   var id = '5f2e7707fcb3770062af7dc033bdb51a';
// bitgo.wallets().get({ "id": id }, function callback(err, wallet) {
//   if (err) {
//     throw err;
//   }
//   wallet.createAddress({ "chain": 0 }, function callback(err, address) {
//     console.dir(address);
//   });
// });
// })

//create address

router.post("/createaddress", (req, res) => {
  var id = req.body.id;
  bitgo.wallets().get({ id: id }, function callback(err, wallet) {
    if (err) {
      res.send(err);
    }
    wallet.createAddress({ chain: 0 }, function callback(err, address) {
      console.dir(address);
      res.send(address);
    });
  });
});

//generate wallet

router.post("/create", (req, res) => {
  console.log(req.body);
  var data = {
    passphrase: req.body.password,
    label: req.body.label,
    backupXpubProvider: "keyternal",
  };

  bitgo.wallets().createWalletWithKeychains(data, function (err, result) {
    if (err) {
      res.send("Could not create wallet!");
    }
    console.dir(result.wallet.wallet);
    console.log(
      "User keychain encrypted xPrv: " + result.userKeychain.encryptedXprv
    );
    console.log("Backup keychain xPub: " + result.backupKeychain.xPub);
    res.send(result);
  });
});

//list wallet

router.get("/listwallet", (req, res) => {
  var wallets = bitgo.wallets();
  wallets.list({}, function callback(err, data) {
    // handle error, do something with wallets

    for (var id in data.wallets) {
      var wallet = data.wallets[id].wallet;
      console.log(JSON.stringify(wallet, null, 4));
    }
    res.send(data.wallets);
  });
});

//list balances

//get wallet

router.post("/getwallet", (req, res) => {
  var wallets = bitgo.wallets();
  var data = {
    type: req.body.type,
    id: req.body.id,
  };
  wallets.get(data, function callback(err, wallet) {
    if (err) {
      // handle error
      res.send(err);
    }
    // Use wallet object here
    console.dir(wallet);
    console.dir(wallet.balance());
    res.send(wallet);
  });
});

//list addresses

//freeze wallet

router.post("/freeze", (req, res) => {
  bitgo.wallets().get({ id: req.body.id }, function (err, wallet) {
    bitgo.unlock({ otp: "0000000" }, function (err) {
      if (err) {
        res.send("Could not unlock!");
      }
      wallet.freeze({ duration: 400000 }, function (err, result) {
        console.dir(result);
        res.send(result);
      });
    });
  });
});

//get unspent
router.get("/unspent", (req, res) => {
  console.log("hello");
  var id = req.body.id;
  bitgo.wallets().get({ id: id }, function callback(err, wallet) {
    if (err) {
      res.send(err);
    }
    wallet.unspents(function callback(err, wallet) {
      // handle error, use unspents
      console.log(err);
      console.dir(wallet);
      res.send(wallet);
    });
  });
});

//get maximum spendable

//list transfers

//get transfers

//get transfer by sequence id
router.get("/transfersid", (req, res) => {
  var walletId = "3912WFZ7516VhHBddjkwXvWaJTMK7cPLxX";
  var sequenceId = "hello123";

  bitgo
    .wallets()
    .get({ id: "3912WFZ7516VhHBddjkwXvWaJTMK7cPLxX" }, function callback(
      err,
      wallet
    ) {
      if (err) {
        res.send(err);
      }
      wallet.getWalletTransactionBySequenceId(
        { sequenceId: sequenceId },
        function callback(err, transaction) {
          console.log(JSON.stringify(transaction, null, 4));
        }
      );
    });
});

//build a transaction

router.get("/send", (req, res) => {
  var destinationAddress = req.body.destAdd;
  var amountSatoshis = req.body.amountSat * 1e8; // send 0.1 bitcoins
  var walletPassphrase = req.body.walletPhrase; // replace with wallet passphrase

  bitgo.wallets().get({ id: req.body.walletId }, function (err, wallet) {
    if (err) {
      res.send("Error getting wallet!");
    }
    console.log("Balance is: " + (wallet.balance() / 1e8).toFixed(4));

    wallet.sendCoins(
      {
        address: destinationAddress,
        amount: amountSatoshis,
        walletPassphrase: walletPassphrase,
      },
      function (err, result) {
        if (err) {
          res.send("Error sending coins!");
          return process.exit(-1);
        }

        console.dir(result);
        res.send(result);
      }
    );
  });
});

module.exports = router;
