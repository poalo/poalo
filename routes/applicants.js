
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router();
const app = express()
app.use(express.json())
const axios = require('axios')
const crypto = require('crypto')
const fs = require('fs')
const FormData = require('form-data')

console.log('helloll')
router.post('/',bodyParser.json(),(req,res)=>{

console.log('hello')
// console.log(JSON.parse(req.body))





// data.append('file',file,file.name)

// Set current values
const APP_TOKEN_KEY = 'tst:9jpMMy4DKNv0IOvRormcaIWj.AozHQBYak4EE2DgNfxPVhoHvXkk2bbPf'
const APP_TOKEN_SECRET = 'Kpg02sqLicREA8bOXCJeXqfXo9PCpkzW'
const externalUserId = '123456'
const ttlInSecs = '600'

axios.defaults.baseURL = 'https://test-api.sumsub.com';
axios.defaults.headers.post['Accept'] = 'application/json';
obj= {
    "externalUserId": "12356",
	"info": {
    "country": "GBR",
    "firstName": "Jane",
    "lastName": "Smith",
    "phone": "+449112081223",
    "dob": "2000-03-04",
    "placeOfBirth": "London"
	},
	"requiredIdDocs": {
		"docSets": [{
				"idDocSetType": "IDENTITY",
				"types": [
					"PASSPORT",
					"ID_CARD",
					"DRIVERS"
				]
			},
			{
				"idDocSetType": "SELFIE",
				"types": [
					"SELFIE"
				]
			},
			{
				"idDocSetType": "PROOF_OF_RESIDENCE",
				"types": [
					"UTILITY_BILL"
				]
			}
		]
	}
}


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




function requestAccessToken(ttlInSecs) {

  axios.post(`/resources/applicants`,
 data = req.body
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
