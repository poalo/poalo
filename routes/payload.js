const router = require('express').Router()
const request = require('request');
router.get('/',(req,res)=>{

var options = {
    url : 'https://test-api.sumsub.com/resources/auth/login',
      method : 'POST',
    //   path: '',
      headers: {
        'Authorization': 'Basic d2xseHBheV9zaW1vbmVfd2xseF90ZXN0OjNBMHh1cXZqMGtzNOKAmQ=='
      },
      maxRedirects: 20
    };



function callback(error, response, body) {
  if (!error ) {
    // console.log(response)
    const info = JSON.parse(body);
    console.log(info.payload)

    res.send(info)


  }
  else{
      console.log(error)
      res.send(error)
  }
}

request(options, callback);

})

module.exports = router;
