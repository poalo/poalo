const router = require('express').Router();
const hellosign = require('hellosign-sdk')({ key: '01907c62f628a5cdc66a48fb754467d7a2073f1d1114e7b86dcf26649ab641db'});

var multer = require('multer');

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, './uploads/')
    },
    filename : function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({ storage: storage })


// router.get('/',multer.single('file'),(req,res)=>{

// })

router.post('/send',upload.single('files'), (req,res)=>{
  const data = JSON.stringify( req.body)
  const filex = req.file;
  console.log(data)
    const opts = {
        data
      };
    // const opts = {
    //     test_mode: req.body.test_mode,
    //     title: 'test.',
    //     subject: 'The NDA we talked about',
    //     message: 'Please sign this NDA and then we can discuss more.',
    //     signers: [
    //       {
    //         email_address: 'nizamiwork@outlook.com',
    //         name: 'Alice',
    //         order: 0
    //       },
    //       {
    //         email_address: 'bob@example.com',
    //         name: 'Bob',
    //         order: 1
    //       }
    //     ],
    //     cc_email_addresses: ['lawyer@example.com', 'ceo@example.com'],
    //     files: ['./uploads/Untitled document (1).pdf'],
    //     // metadata: {
    //     //   clientId: '1234',
    //     //   custom_text: 'NDA #9'
    //     // }
    //   };
    opts.files = filex
      
      hellosign.signatureRequest.send(opts).then((result) => {
        res.send(result)
      }).catch((err) => {
        res.send(err)
      });
})

router.post('/create_embedded',upload.single('files'),(req,res)=>{
  const data = JSON.stringify( req.body)
  const filex = req.file;
  console.log(data)
    const opts = {
        data
      };
    opts.files = filex;

    // const opts = {
    //     test_mode: req.body.test_mode,
    //     clientId: req.body.client_id,
    //     title: 'NDA with Acme Co.',
    //     subject: 'The NDA we talked about',
    //     message: 'Please sign this NDA and then we can discuss more.',
    //     signers: [
    //       {
    //         email_address: req.body.signersemail_address,
    //         name: req.body.signersname,
    //         order: 0
    //       },
    //       {
    //         email_address: 'bob@example.com',
    //         name: 'Bob',
    //         order: 1
    //       }
    //     ],
    //     cc_email_addresses: ['lawyer@example.com'],
    //     files: ['./uploads/Untitled document (1).pdf']
    //   };
      
      hellosign.signatureRequest.createEmbedded(opts).then((result) => {
        res.send(result)
      }).catch((err) => {
        res.send(err)
      });
      
})

router.post('/create_embedded_draft',upload.single('files'),(req,res)=>{
  const data = JSON.stringify( req.body)
  const filex = req.file
  console.log(data)
    const opts = {
        data
      };
      opts.files = filex ; 
  // const opts = {
  //     test_mode: req.body.test_mode,
  //     clientId: req.body.client_id,
  //     title: 'embedded draft test',
  //     subject: 'embedded draft test',
  //     message: 'embedded draft test',
  //     signer_roles: [
  //       {
  //         name: 'Manager',
  //         order: 0
  //       },
  //       {
  //         name: 'Employee',
  //         order: 1
  //       }
  //     ],
  //     files: ['./uploads/Untitled document (1).pdf']
  //   };
    
    const results = hellosign.template.createEmbeddedDraft(opts).then((result) => {
      res.send(result)
    }).catch((err) => {
      res.send(err)
    });
  })

module.exports = router;