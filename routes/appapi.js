const router = require('express').Router();
const hellosign = require('hellosign-sdk')({ key: '01907c62f628a5cdc66a48fb754467d7a2073f1d1114e7b86dcf26649ab641db'});

var multer = require('multer');
// const bodyParser = require('body-parser')
// const storage = multer.diskStorage({
//     destination : function(req,file,cb){
//         cb(null, './uploads/')
//     },
//     filename : function(req,file,cb){
//         cb(null,file.originalname)
//     }
// })
const upload = multer()

router.post('/',upload.none(),(req,res)=>{
    
    const clientId = JSON.stringify(req.body.client_id)
    console.log(clientId)
    hellosign.apiApp.get(req.body.client_id).then((result) => {
        res.send(result)
      }).catch((err) => {
        res.send(err)
      });
})

router.get('/list',(req,res)=>{
  hellosign.apiApp.list().then((result) => {
    res.send(result)
  }).catch((err) => {
    res.send(err)
  });
})

router.post('/create',upload.none(),(req,res)=>{
  
  const name = JSON.stringify(req.body.name);
  const domain = JSON.stringify(req.body.domain);
console.log(domain)
  const opts = {
    name: name,
    domain: domain
  
  };
  
  
  hellosign.apiApp.create(opts).then((result) => {
    console.log(result,'result')
    res.send(result)

  }).catch((err) => {
    console.log('err',err)
    res.send(err)
  });
})

router.post('/update',upload.none(),(req,res)=>{

  const name = JSON.stringify(req.body.name);
  const domain = JSON.stringify(req.body.domain);
  const client_id = JSON.stringify(req.body.client_id)
  const opts = {
    name: name,
    domain: domain
  };
  
  hellosign.apiApp.update(client_id, opts).then((result) => {
    res.send(result)
  }).catch((err) => {
    res.send(err)
  });
})

router.post('/delete',upload.none(),(req,res)=>{
  const client_id = JSON.stringify(req.body.client_id)
  hellosign.apiApp.delete(client_id).then((result) => {
    res.send(result)
  }).catch((err) => {
    res.send(err)
  });
})

module.exports = router; 