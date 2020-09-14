const router = require('express').Router();
const hellosign = require('hellosign-sdk')({ key: '01907c62f628a5cdc66a48fb754467d7a2073f1d1114e7b86dcf26649ab641db'});
const fs = require('fs');
var multer = require('multer');

// const storage = multer.diskStorage({
//     destination : function(req,file,cb){
//         cb(null, './uploads/')
//     },
//     filename : function(req,file,cb){
//         cb(null,file.originalname)
//     }
// })
// const upload = multer({ storage: storage })
const upload1 = multer()

router.post('/',upload1.none(),(req,res)=>{
    console.log(req.body.id)
    
    hellosign.signatureRequest.get(req.body.id).then((result) => {

      result.signature_request.signing_url = 'heljlj'
        res.send(result)
      }).catch((err) => {
        res.send(err)
      });
})

router.post('/list/',upload1.none(),(req,res)=>{
    
    const page = req.body.page
    hellosign.signatureRequest.list({ page }).then((result) => {
        res.send(result)
      }).catch((err) => {
        res.send(err)
      });
})

// router.post('/send',upload.single('files'), (req,res)=>{
//     // console.log(req.file)
//     console.log(req.body)
//     const opts = {
//         test_mode: 1,
//         title: 'test.',
//         subject: 'The NDA we talked about',
//         message: 'Please sign this NDA and then we can discuss more.',
//         signers: [
//           {
//             email_address: 'nizamiwork@outlook.com',
//             name: 'Alice',
//             order: 0
//           },
//           {
//             email_address: 'bob@example.com',
//             name: 'Bob',
//             order: 1
//           }
//         ],
//         cc_email_addresses: ['lawyer@example.com', 'ceo@example.com'],
//         files: ['./uploads/Untitled document (1).pdf'],
//         // metadata: {
//         //   clientId: '1234',
//         //   custom_text: 'NDA #9'
//         // }
//       };
      
//       hellosign.signatureRequest.send(opts).then((result) => {
//         res.send(result)
//       }).catch((err) => {
//         res.send(err)
//       });
// })

router.post('/send_with_template',upload1.none(),(req,res)=>{
  console.log(req.body)
  const data = JSON.stringify( req.body)
  console.log(data)
    const opts = {
        data
      };
    // const opts = {
    //     test_mode: req.body.test_mode,
    //     template_id: req.body.template_id,
    
    //     signers: [
    //       {
    //         email_address: req.body.signersClientemail_address,
    //         name: req.body.signersClientname,
    //         role: 'Client'
    //       }
    //     ],
    //     ccs: [
    //       {
    //         email_address: req.body.ccsAdministratoremail_address,
    //         role_name: 'Accounting'
    //       }
    //     ]
    //   };
      
      hellosign.signatureRequest.sendWithTemplate(opts).then((result) => {
        res.send(result)
      }).catch((err) => {
        res.send(err)
      });

})

router.post('/remind',upload1.none(),(req,res)=>{

    console.log(req.body)
    hellosign.signatureRequest.remind(req.body.id, { email_address: req.body.email_address }).then((result) => {
      console.log('hello')
        req.send(result)
      }).catch((err) => {
        res.send(err)
      });
})



router.post('/update',(req,res)=>{
    
    res.send('Not available')
})

router.post('/cancel',upload1.none(),(req,res)=>{
  console.log(req.body)
    hellosign.signatureRequest.cancel(req.body.id);
    res.send('cancelled')
})

router.post('/remove',(req,res)=>{
    res.send('Not available')
})

router.post('/files',upload1.none(),(req,res)=>{
  console.log(req.body)
    hellosign.signatureRequest.download(req.body.id, { file_type: req.body.file_type }, (err, result) => {
        const file = fs.createWriteStream('files.zip');
        // console.log(res)
        if(result === null){
          console.log('heeloo')
          res.send('no file found')
        }else{
          result.pipe(file);
      
          file.on('finish', () => {
            file.close();
          });
        }
       
      });
})


router.post('/create_embedded_with_template',upload1.none(),(req,res)=>{
  
  const data = JSON.stringify( req.body)
  console.log(data)
    const opts = {
        data
      };

  //   // 
  //   //  const opts = req.body; 
  //     hellosign.signatureRequest.createEmbeddedWithTemplate(opts).then((result) => {
  //       res.send(result)
  //     }).catch((err) => {const opts = {
  //       test_mode: req.body.test_mode,
  //       clientId: req.body.id,
  //       template_id: req.body.template_id,
  //       subject: req.body.subject,
  //       message: req.body.message,
  //       signers: [
  //         {
  //           email_address: req.body.signersExampleRoleemail_address,
  //           name: req.body.signersExampleRolename,
  //           role: 'Client'
  //         }
  //       ],
  //       ccs: [
  //         {
  //           email_address: 'bob@example.com',
  //           role_name: 'Accounting'
  //         }
  //       ],
  //       custom_fields: [
  //         {
  //           Cost: '$20,000'
  //         }
  //       ]
  //     };
  //       res.send(err)
  //     });

  // const opts = {
  //   test_mode: 1,
  //   clientId: 'b6b8e7deaf8f0b95c029dca049356d4a2cf9710a',
  //   template_id: 'c26b8a16784a872da37ea946b9ddec7c1e11dff6',
  //   subject: 'Purchase Order',
  //   message: 'Glad we could come to an agreement.',
  //   signers: [
  //     {
  //       email_address: 'alice@example.com',
  //       name: 'Alice',
  //       role: 'Client'
  //     }
  //   ],
  //   ccs: [
  //     {
  //       email_address: 'bob@example.com',
  //       role_name: 'Accounting'
  //     }
  //   ],
  //   custom_fields: [
  //     {
  //       Cost: '$20,000'
  //     }
  //   ]
  // };
  
  hellosign.signatureRequest.createEmbeddedWithTemplate(opts).then((result) => {
    res.send(result)
  }).catch((err) => {
    res.send(err)
  });

})


router.post('/destroy',(req,res)=>{
    res.send('Not available')
})

module.exports = router ; 
