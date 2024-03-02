
const mongoose=require("mongoose");

mongoose.set('strictQuery', false);                  
mongoose.connect("mongodb://127.0.0.1/foodOrdering").then(()=> {
    console.log("db has connected successfully ")
}).catch((err)=> {
    console.log("some error has occured occured")
});
    