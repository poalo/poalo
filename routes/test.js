
const axios = require('axios')
const crypto = require('crypto')
const fs = require('fs')
const FormData = require('form-data')

// Set current values
const APP_TOKEN_KEY = 'tst:9jpMMy4DKNv0IOvRormcaIWj.AozHQBYak4EE2DgNfxPVhoHvXkk2bbPf'
const APP_TOKEN_SECRET = 'Kpg02sqLicREA8bOXCJeXqfXo9PCpkzW'
const applicantId = '5edf1e010a975a6579cd59cc'
const idDocType = 'PASSPORT'
const country = 'GBR'
const filePath = 'dummy.pdf'
const externalUserId = '123456'
const email = 'test-testr@tast.nq'
const ttlInSecs = '600'
axios.defaults.baseURL = 'https://test-api.sumsub.com';
axios.defaults.headers.post['Accept'] = 'application/json';

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


function uploadIdDoc(applicantId, idDocType, country, filePath) {
  const form = new FormData();

  form.append('metadata', JSON.stringify({idDocType, country}));

  let fileParts = filePath.split('.')
  const fileName = idDocType + '.' + fileParts[fileParts.length - 1]
  const content = fs.readFileSync(filePath)
  form.append('content', content, { filename : fileName})

  axios.post(`/resources/applicants/${applicantId}/info/idDoc`, form, {
    headers: form.getHeaders()
  }).then(res => {
    console.log('result', res.data)
  }).catch(error => {
    console.error(error)
  })
}

uploadIdDoc(applicantId, idDocType, country, filePath)
