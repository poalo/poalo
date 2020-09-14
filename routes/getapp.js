const axios = require('axios')
const crypto = require('crypto')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router();
const app = express()

console.log('hkj')
router.post('/app',bodyParser.json(),(req,res)=>{
console.log('sfkl')
    // Set current values
const APP_TOKEN_KEY = 'tst:9jpMMy4DKNv0IOvRormcaIWj.AozHQBYak4EE2DgNfxPVhoHvXkk2bbPf'
const APP_TOKEN_SECRET = 'Kpg02sqLicREA8bOXCJeXqfXo9PCpkzW'
const appId = req.body.appId
const ttlInSecs = '600'
console.log(appId)
axios.defaults.baseURL = 'https://test-api.sumsub.com';
axios.defaults.headers.get['Authorization'] = 'application/json';


axios.interceptors.request.use(sign, function (error) {
  return Promise.reject(error);
});


function sign(config) {
  let ts =  Math.round(Date.now() / 1000);

  let hmacSha256 = crypto.createHmac('sha256', APP_TOKEN_SECRET)
  hmacSha256.update(ts + config.method.toUpperCase() + config.url)
  if (config.data) {
    hmacSha256.update(config.data.getBuffer())
}

  config.headers['X-App-Token'] = APP_TOKEN_KEY
  config.headers['X-App-Access-Ts'] = ts
  config.headers['X-App-Access-Sig'] = hmacSha256.digest('hex')

  return config
}



function requestAccessToken(appId, ttlInSecs) {

  axios.get(`/resources/applicants/${appId}`
  ).then(result => {
    console.log('result', result.data)
    res.send(result.data)
  }).catch(error => {
    console.error(error)
    res.send(error)
  })
}

requestAccessToken(appId, ttlInSecs)
})

module.exports = router;
