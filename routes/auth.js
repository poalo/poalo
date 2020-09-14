const router = require('express').Router();
const hellosign = require('hellosign-sdk')({ key: '01907c62f628a5cdc66a48fb754467d7a2073f1d1114e7b86dcf26649ab641db'});
var multer = require('multer');
const upload = multer()
//hello sign apis
console.log('hello', process.env.API_KEY)
console.log(process.env.DB_CONNECT)
//Get Accounts
router.get('/account',(req,res)=>{
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    console.log(username,password)



hellosign.account.get().then((result) => {
  console.log(result)
  res.send(result)
}).catch((err) => {
    res.send(err)
});
})

router.post('/update',upload.none(),(req,res)=>{
console.log(req.body.callback_url)
    hellosign.account.update({
        callback_url: req.body.callback_url
      }).then((result) => {
        res.send(result)
      }).catch((err) => {
        res.send(err)
      });
})

router.post('/account/create',upload.none(),(req,res)=>{
    const email = JSON.stringify(req.body.email_address);
    
    hellosign.account.create({
        email_address: req.body.email_address
      }).then((result) => {
          console.log(result)
        res.send(result)
      }).catch((err) => {
        res.send(err)
      });
})

router.post('/account/verify',upload.none(),(req,res)=>{
    const email = JSON.stringify(req.body.email_address);
    hellosign.account.verify({
        email_address: req.body.email
      }).then((result) => {
        console.log(result)
        res.send(result)
      }).catch((err) => {
        res.send(err)
      });
})



module.exports = router;