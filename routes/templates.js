const router = require('express').Router();
const hellosign = require('hellosign-sdk')({ key: '01907c62f628a5cdc66a48fb754467d7a2073f1d1114e7b86dcf26649ab641db'});
const fs = require('fs')
var multer = require('multer');
const bodyParser = require('body-parser')
// const storage = multer.diskStorage({
//     destination : function(req,file,cb){
//         cb(null, './uploads/')
//     },
//     filename : function(req,file,cb){
//         cb(null,file.originalname)
//     }
// })
// const upload = multer({ storage: storage })
const upload = multer()

router.post('/',upload.none(),(req,res)=>{
    console.log(req.body.id)
    hellosign.template.get(req.body.id).then((result) => {
        res.send(result)
      }).catch((err) => {
        res.send(err)
      });


})

router.post('/list',upload.none(),(req,res)=>{
  const page = req.body
    hellosign.template.list({ page }).then((result) => {
        res.send(result)
      }).catch((err) => {
        res.send(err)
      });
})

router.post('/add_user',upload.none(),(req,res)=>{
  const email = req.body.email;
    hellosign.template.addUser(req.body.templateId, { email_address: email }).then((result) => {
        res.send(result)
      }).catch((err) => {
        res.send(err)
      });
})

router.post('/remove_user',upload.none(),(req,res)=>{
  const email = req.body.email;
    hellosign.template.removeUser(req.body.templateId, { email_address: email }).then((result) => {
        res.send(result)
      }).catch((err) => {
        res.send(err)
      });
})



router.post('/delete',upload.none(),(req,res)=>{
    hellosign.template.delete(templateId).then((result) => {
        res.send(result)
      }).catch((err) => {
        res.send(err)
      });
})
router.post('/files',(req,res)=>{
    hellosign.template.files('fc9f89c940ee781d46857b03e2ba9fc8b6437650', (err, result) => {
        const file = fs.createWriteStream('files.pdf');
      
        result.pipe(file);
      
        file.on('finish', () => {
          file.close();
        });
      });
})
router.post('/update_files',(req,res)=>{
res.send('Not available')
})

module.exports = router;