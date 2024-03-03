const mongoose=require("mongoose");
require("dotenv").config();
mongoose.set('strictQuery', false);                  
// mongoose.connect("mongodb://127.0.0.1/foodOrdering").then(()=> {
//     console.log("db has connected successfully ")
// }).catch((err)=> {
//     console.log("error occured")
// });
  
// cloud connect                                
mongoose.connect(process.env.DATABASE).then(()=> {
    console.log("db has connected successfully with mongoDB ")
    }).catch((err)=> {
         console.log("error occured")
 });