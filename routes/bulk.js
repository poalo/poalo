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

router.post('/',(req,res)=>{
res.send('Comming Soon')
})

router.post('/list',(req,res)=>{
res.send('Comming Soon')
})

module.exports = router; 