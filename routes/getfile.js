

const router = require('express').Router()
const bodyParser = require('body-parser')
const axios = require('axios')
const crypto = require('crypto')
const fs = require('fs')
const FormData = require('form-data')

var multer = require('multer');

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, './uploads/')
    },
    filename : function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({ storage: storage })



router.post('/', bodyParser.json(),(req,res)=>{
    console.log('hello')
    console.log(req.body)
    console.log(req.file)
    // Set current values
const APP_TOKEN_KEY = 'tst:9jpMMy4DKNv0IOvRormcaIWj.AozHQBYak4EE2DgNfxPVhoHvXkk2bbPf'
const APP_TOKEN_SECRET = 'Kpg02sqLicREA8bOXCJeXqfXo9PCpkzW'
const externalUserId = '123456' || req.body.uID
const ttlInSecs = '600'
const appi = req.body.appid;
console.log(appi)

axios.defaults.baseURL = 'https://test-api.sumsub.com';
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

axios.interceptors.request.use(sign, function (error) {
    return Promise.reject(error);
  });


  function sign(config) {
    let ts =  Math.round(Date.now() / 1000);

    let hmacSha256 = crypto.createHmac('sha256', APP_TOKEN_SECRET)
    hmacSha256.update(ts + config.method.toUpperCase() + config.url)
    if (config.data) {
      var buf = Buffer.from(JSON.stringify(config.data));
        console.log(config.data)
      hmacSha256.update(buf)
  }

    config.headers['X-App-Token'] = APP_TOKEN_KEY
    config.headers['X-App-Access-Ts'] = ts
    config.headers['X-App-Access-Sig'] = hmacSha256.digest('hex')

    return config
  }
//   var readable = fs.createReadStream(req.file);
const filex = req.file;
var formData = {
    Data: req.body,
    file:  filex,
  };

function requestAccessToken(ttlInSecs) {

  axios.get(`/resources/applicants/${appi}/status`,
 ).then(result => {
    console.log('result', result.data)
    res.send(result.data)
  }).catch(error => {
    console.error(error)
    res.send(error)
  })
}
requestAccessToken(ttlInSecs)

})

module.exports = router;
