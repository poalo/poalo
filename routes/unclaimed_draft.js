const router = require('express').Router();
const FormData = require('form-data')
const hellosign = require('hellosign-sdk')({ key: '01907c62f628a5cdc66a48fb754467d7a2073f1d1114e7b86dcf26649ab641db'});

var multer = require('multer');
const bodyParser = require('body-parser')
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, './uploads/')
    },
    filename : function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({ storage: storage })


router.post('/create',upload.single('files'),(req,res)=>{
  
 console.log(req.file.originalname)
const path = './uploads/' + req.file.originalname;
  const filex = req.file;
 
    const opts = {
          test_mode : parseInt(req.body.test_mode, 10),
          files :  [ path]
      };
      
      hellosign.unclaimedDraft.create(opts).then((result) => {
        res.send(result)
      }).catch((err) => {
         res.send(err)
      });
})

router.post('/create_embedded',upload.single(),(req,res)=>{
  console.log(req.file.originalname)
  const path = './uploads/' + req.file.originalname;
  const filex = req.file; 
  console.log(data)
    const opts = {
        data
      };

    // const opts = {
    //     test_mode: 1,
    //     clientId: 'b6b8e7deaf8f0b95c029dca049356d4a2cf9710a',
    //     type: 'request_signature',
    //     subject: 'The NDA we talked about',
    //     requester_email_address: 'alice@example.com',
    //     files: [path],
    //     is_for_embedded_signing: 1
    //   };
      
      opts.files = filex
      hellosign.unclaimedDraft.createEmbedded(opts).then((result) => {
        res.send(result)
      }).catch((err) => {
        res.send(err)
      });
})

router.post('/create_embedded_with_template',upload.none(),(req,res)=>{
  const data = JSON.stringify( req.body)
  console.log(data)
    const opts = {
        data
      };
      
      hellosign.unclaimedDraft.createEmbeddedWithTemplate(opts).then((result) => {
        res.send(result)
      }).catch((err) => {
        res.send(err)
      });
      
})

router.post('/edit_and_resend',(req,res)=>{
    res.send('Comming soon')
})

module.exports = router; 