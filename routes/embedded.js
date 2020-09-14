const router = require('express').Router();
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

console.log('embed')
router.post('/sign_url',upload.none(),(req,res)=>{
    // hellosign.signatureRequest.createEmbedded(opts).then((res) => {
    //     const signature = res.signature_request.signatures[0];
    //     const signatureId = signature.signature_id;
      
    //     return hellosign.embedded.getSignUrl(signatureId);
    //   }).then((result) => {
    //     console.log('The sign url: ' + res.embedded.sign_url);
    //     res.send(result)
    //   }).catch((err) => {
    //     res.send(err)
    //   });
    res.send('Not found')
})

router.post('/edit_url',upload.none(),(req,res)=>{
    hellosign.embedded.getEditUrl(req.body.templateId).then((result) => {
        res.send(result)
      }).catch((err) => {
        res.send(err)
      });
})

module.exports = router; 