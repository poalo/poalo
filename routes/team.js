const router = require('express').Router();
const hellosign = require('hellosign-sdk')({ key: '01907c62f628a5cdc66a48fb754467d7a2073f1d1114e7b86dcf26649ab641db'});
var multer = require('multer');
const upload = multer()
console.log('team')

router.get('/',upload.none(),(req,res)=>{
  // console.log(req.body)
console.log('working')
hellosign.team.get().then((result) => {
  res.send(result)
}).catch((err) => {
  res.send(err)
});

})

router.post('/create',upload.none(),(req,res)=>{
  const name = req.body.name
    hellosign.team.create({
        name: name
      }).then((result) => {
        res.send(result)
      }).catch((err) => {
        res.send(err)
      });
})

router.post('/',upload.none(),(req,res)=>{
  const name = JSON.stringify(req.body.name);
  hellosign.team.update({
    name: name
  }).then((result) => {
    res.send(result)
  }).catch((err) => {
    res.send(err)
  });
})

router.post('/destroy',upload.none(),(req,res)=>{
  // const name = JSON.stringify(req.body.name);
  hellosign.team.destroy().then((result) => {
    res.send(result)
  }).catch((err) => {
    res.send(err)
  });
})

router.post('/add_member',upload.none(),(req,res)=>{
  const email = JSON.stringify(req.body.email_address);
  hellosign.team.addMember({
    email_address: email
  }).then((result) => {
    res.send(result)
  }).catch((err) => {
    res.send(err)
  });
})

router.post('/remove_member',upload.none(),(req,res)=>{
  const email = JSON.stringify(req.body.email_address);
  hellosign.team.removeMember({
    email_address: email
  }).then((result) => {
    res.send(result)
  }).catch((err) => {
    res.send(err)
  });
})

module.exports = router; 