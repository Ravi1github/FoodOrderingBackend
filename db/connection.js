
const mongoose=require("mongoose");

mongoose.set('strictQuery', false);                  
// mongoose.connect("mongodb://127.0.0.1/foodOrdering").then(()=> {
//     console.log("db has connected successfully ")
// }).catch((err)=> {
//     console.log("error occured")
// });
  
// cloud connect                                
mongoose.connect('mongodb+srv://ravikumar87070rk:88740rK@cluster0.yokcqlo.mongodb.net/foodorder?retryWrites=true&w=majority&appName=Cluster0').then(()=> {
    console.log("db has connected successfully with mongoDB ")
    }).catch((err)=> {
         console.log("error occured")
 });