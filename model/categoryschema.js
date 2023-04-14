const mongoose=require('mongoose');
const {Schema}=mongoose;
const FoodSchema=new Schema({
CategoryName:{
    type:String,
    required:true
}

});



const Foodcategorys=mongoose.model("Foodcategorys",FoodSchema);
module.exports=Foodcategorys;