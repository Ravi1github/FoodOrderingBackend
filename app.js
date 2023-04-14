const express=require("express");
const app=express();
const PORT= process.env.PORT||4000;
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin , X-Requested-With,Content-Type,Accept"
    );
    next();
})
const bcrypt=require("bcryptjs");

const jwt=require("jsonwebtoken");
app.use(express.json());
//validator
const {body, validationResult}=require("express-validator");
require("./db/connection");


const User=require("./model/User");
const Fooditem=require('./model/foodschema');
const Foodcategory=require('./model/categoryschema');
const Order=require("./model/order");
const { default: mongoose } = require("mongoose");


app.get('/',(req,res)=>{
    res.send("hello wolrd");
});


//signup
app.post('/createuser',
[
   //validating
body('name',"name is invalid").isLength({min:2}),
body('email','email is invalid').isEmail(),
body('password','password is invalid').isLength({min:3})],

async(req,res)=>{
const errors=validationResult(req);
if(!errors.isEmpty())
{
    return res.status(400).json({errors:errors.array()});
}
  
//hashing password
const salt=await bcrypt.genSalt(10);
let secpassword=await bcrypt.hash(req.body.password,salt);


    try{
    const userdetails=await User.create({
        name:req.body.name,
        location:req.body.location,
        email:req.body.email,
        password:secpassword
     }).then(res.send({success:true}));

     
    }
    catch(err){
     console.log("error");
    }
});

//login

app.post('/loginuser',async(req,res)=>{
let email=req.body.email;
let password=req.body.password;
    try{
    const userdetails=await User.findOne({email:email});
   if(!userdetails)
   {
    return res.status(400).json({errors:"enter thee valid credentials"});
   }
const cmppassword=await bcrypt.compare(password,userdetails.password);

   if(!cmppassword)
   {
    return res.status(400).json({errors:"enter thee valid credentials"});
   }

//jwt tokken
const data={
    id:userdetails.id,
}
                 
//secret key
const authtoken=jwt.sign(data,"qewdewfenjenierfiejfowefowfoveinvienviknvkenvenvd");
   if(cmppassword)
   {
    return res.json({success:true,authtoken:authtoken});
   }
     
    }
    catch(err){
     console.log("error");
    }
})

//food display
app.get("/foodlist",async(req,res)=>{
    const foodlist=await Fooditem.find({});
    const foodcategory=await Foodcategory.find({});
    if(foodlist){
        res.status(201).send([foodlist,foodcategory]);
       
    }
    else{
        res.send("no product found");
    }
})
//foodorder
app.post('/orderdata',async(req,res)=>{
let data=req.body.order_data;
await data.splice(0,0,{Order_date:req.body.order_date});

let eID=await Order.findOne({email:req.body.email});

//if email not exist means new customer 
if(eID===null)
{
    try{
await Order.create({
    email:req.body.email,
    order_data:[data],
    order_date:req.body.order_date
}).then(()=>{
    res.json({success:true});
})
    }
    catch(err){
        console.log(err);
        res.send("false ");
    }
}

//
else{
try{

    await Order.findOneAndUpdate({email:req.body.email},
    { $push:{order_data:data} }).then(()=>{
        res.json({success:true});
    })
    
        
}
catch(err)
{
    res.send(err);
}


}

})



app.listen(PORT,()=>{
    console.log(`running at port at ${PORT}`);
});