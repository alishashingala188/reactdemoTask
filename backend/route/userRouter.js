//imporrt controller product,review
const usercontroller=require('../controller/usercontroller')
const router = require("express").Router();
const { loginUser } = require('../Connect/auth')
const { verifyUserToken } = require('../Connect/auth');


//doctor Route

router.get('/Home', verifyUserToken, (req, res) =>{
    return res.status(200).json({
        status: 200,
        message: "User found!",
        data: {
          // message:"not valid user",
          user: req.user,
        },
      });
});


router.post('/adduser',usercontroller.adduser)
router.get('/alluser',usercontroller.getAlluser)
router.post('/loginuser',usercontroller.loginUser)
router.post("/sendPasswordLink",usercontroller.sendPasswordLink)
router.get("/forgetpassword/:id/:token",usercontroller.forgetpassword)
router.post('/:id/',usercontroller.getOneuser)
 router.post('/:id/:token',usercontroller.Fchangepassword)
// router.delete('/:id',usercontroller.deleteuser)


module.exports=router