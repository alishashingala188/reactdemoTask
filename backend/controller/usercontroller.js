//onst { request } = require('express')
const Users = require('../model/userModel')
const { Joi } = require('express-validation')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserToken } = require('../Connect/auth')
const nodemailer =require('nodemailer');

//const { cloneDeep } = require('sequelize/types/utils');


//main work
//1. create 

const loginUser = async (req, res, next) => {
    try {
        const validateSchema = Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required()

        });

        const validate = validateSchema.validate(req.body);
        if (validate.error) {
            return res.status(412).json({
                status: 412,
                message: validate.error.details[0].message,
            });
        }

        const user = await Users.findOne({ where: { email: req.body.email } });
// token
        const token = await getUserToken(user)
        user.token = token
        console.log(user.token)


        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password,
        );

        if (!isPasswordValid) {
            return res.status(412).json({
                status: 412,
                message: "Invalid password",
            });
        }
        if (user) {
            return res.status(200).json({
                status: 200,
                message: "Login Successful",
                data: {
                    user,
                    token
                }
            })
        }
        next();
    } catch (error) {
        return res.status(412).json({
            status: 412,
            message: "not Login..",

        });
    }
};



//register

const adduser = async (req, res) => {
    try {
        const validateSchema = Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            contact_no: Joi.string().required(),
            address: Joi.string().required(),
            email: Joi.string().email().required(),
            
          
          
            password: Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
                .required()
                .messages({
                    "string.pattern.base":
                        "Password must contain 8 characters,one uppercase,one lowercase,one number and one special character",

                }),
                cpassword: Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
                .required()
                .messages({
                    "string.pattern.base":
                        "Password must contain 8 characters,one uppercase,one lowercase,one number and one special character",

                }),
        });
        const validate = validateSchema.validate(req.body);
        if (validate.error) {
            return res.status(412).json({
                status: 412,
                message: validate.error.details[0].message
            })
        }
        const user = await Users.findOne({ where: { email: req.body.email } });
        if (user) {
            return res.status(412).json({
                status: 412,
                message: 'email Id alredy in use..'
            });
        }
        bcrypt.hash(req.body.password, 10, async (error, hash) => {
            if (error) {
                return res.status(412).json({
                    status: 412,
                    message: "Error while hashing password"
                })
            }
            req.body.password = hash;

            const data = await Users.create(req.body);
            //token genrate after create
            const token = jwt.sign({
                id: data.id, email: data.email
            }, process.env.USER_SECRET_KEY);

            data.token = token;
            console.log(token)

            return res.status(200).json({
                status: 200,
                message: "user registered successfully",
                data: data,
                token: token
            });
        });
    } catch (error) {
        return res.status(412).json({
            status: 412,
            message: error.message,
        });
    }
}


//2 get all products

const getAlluser = async (req, res) => {
    let user = await Users.findAll(req.body)
    res.status(200).send(user)
}
//3 get single 
const getOneuser = async (req, res) => {

    let id = req.params.id
    let user = await Users.findOne({ where: { id: id } })
    res.status(200).send(user)
}
//reset password        
// send email Link For reset Password

const sendPasswordLink = async(req,res,user)=>{

    // Create a SMTP transporter object
    let  transporter = nodemailer.createTransport({
        service:"gmail",
      auth:{
        user: "demotask1234@gmail.com",
        pass: "rnqujnwkfmaszipf"
      }
    }) ;
   // console.log(transporter);

    try{
        console.log(req.body)
        const{ email }=req.body;

        //check  validation
         if(!email){
            res.status(401).json({ status: 401, message: "Enter Your Email" });
         };
            const userfind=await Users.findOne({where:{email: email }});
            console.log("users",userfind)
            //token generate

            const token =await jwt.sign(
                {
                    id:userfind.id,
                    email:userfind.email
                },
                process.env.USER_SECRET_KEY,
                {
                    expiresIn: "1h"
                }
            );
            console.log(token)
          
            //mail option
        const mailOption={
            from:"demotask1234@gmailcom",
            to:email,
            subject:"Sending Email For password Reset",
            text: `This Link Valid For 2 MINUTES http://localhost:3000/Forgot/${userfind.id}/${token}`
        }
console.log("mail",mailOption)
         //mail send

         transporter.sendMail(mailOption,(error,info)=>{
            if(error){
                console.log(error);
                res.status(401).json(error);
            }else{
                console.log('email sent')
                res.status(200).json({ status: 200, message: "Mail Send"})
            }
         })

    }catch(error){
        res.status(401).json({ status: 401, message: "invalid user"})

    }
}

//forget password

const forgetpassword=async(req,res)=>{
    const { id,token }=req.params;
    try{
        const validuser=await Users.findOne({  _id:id,verifytoken:token })
        console.log(validuser);

        //token verify

        const verifytoken=jwt.verify(token,process.env.USER_SECRET_KEY)
        console.log("hello ", verifytoken)

        if(validuser && verifytoken.id){
            res.status(201).json({ status: 201, validuser })
    
        }else{
            res.status(401).json({ status: 401, message: "user not exist" })
        }
    }catch(error){
        res.status(401).json({ status: 401, error })
    }
    };
//change password

const Fchangepassword=async(req,res)=>{
    const{ id,token }=req.params;
    const{password}=req.body;
    

    try{
        const validuser =await Users.findOne({ _id:id ,tokn:token })

        const verifytoken=jwt.verify(token,process.env.USER_SECRET_KEY) ;

        if(validuser && token){
            const newpassword=await bcrypt.hash(password, 10);
            
            const setnewuserpass = await Users.update({ password: newpassword },
                { where: { id: id } })
                res.status(201).json({ status: 201, setnewuserpass })
            } else {
              res.status(401).json({ status: 401, message: "user not exist" })
            }
        } catch (error) {
            res.status(401).json({
              status: 401,
              message: error.message
            })
        }
        
    }




module.exports = {
    adduser,
    getAlluser,
    getOneuser,
    loginUser,
    sendPasswordLink,
    forgetpassword,
    Fchangepassword
    


}