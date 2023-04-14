const mongoose=require('mongoose');
const {Schema}=mongoose;
const UserSchema=new Schema({
CategoryName:{
    type:String,
    required:true
},
name:{
    type:String,
    required:true
},
img:{
    type:String,
    required:true
},
option:[

    {
        half:{
            type:String,
            required:true
        },
        full:{
            type:String,
            required:true
        }
    }
],

description:{
    type:String,
    required:true
}

});



const Fooditem=mongoose.model("Fooditem",UserSchema);
module.exports=Fooditem;