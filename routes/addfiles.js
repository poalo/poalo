const router = require('express').Router()
const path = require('path')
const bodyParser = require('body-parser')
var util = require('util');
const axios = require('axios')
const crypto = require('crypto')
const fs = require('fs')
const FormData = require('form-data')
var multer = require('multer');
 const streamifier = require('streamifier');
// const storage = multer.diskStorage({
//     destination : function(req,file,cb){
//         cb(null, './uploads/')
//     },
//     filename : function(req,file,cb){
//         cb(null,file.originalname)
//     }
// })
// const upload = multer({ storage: storage })

var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

router.post('/', upload.single('files'),(req,res)=>{

  // Set current values
  const APP_TOKEN_KEY = 'tst:9jpMMy4DKNv0IOvRormcaIWj.AozHQBYak4EE2DgNfxPVhoHvXkk2bbPf'
  const APP_TOKEN_SECRET = 'Kpg02sqLicREA8bOXCJeXqfXo9PCpkzW'
  const applicantId = req.body.applicantId
  const idDocType =  req.body.idDocType
  const country = req.body.country
  const filePath =  req.file.filename
  const externalUserId = req.body.externalUserId
  const email = req.body.email
  const ttlInSecs = '600'
  axios.defaults.baseURL = 'https://test-api.sumsub.com';
  axios.defaults.headers.post['Accept'] = 'application/json';

// console.log(req.file.filename)
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


    console.log(config.data.getBuffer())

    return config
  }

console.log(req.file)

  function uploadIdDoc(applicantId, idDocType, country, filePath) {
    const form = new FormData();

    form.append('metadata', JSON.stringify({idDocType, country}));

    let fileParts = req.file.originalname.split('.')
    const fileName = idDocType + '.' + fileParts[fileParts.length - 1]
    const content = req.file.buffer
    form.append('content', content, { filename : fileName})

    axios.post(`/resources/applicants/${applicantId}/info/idDoc`, form, {
      headers: form.getHeaders()
    }).then(result => {
      console.log('result', result.data)
      res.send(result.data)
    }).catch(error => {
      console.error(error)
      res.send(error)
    })
  }

  uploadIdDoc(applicantId, idDocType, country, filePath)

})

module.exports = router;
