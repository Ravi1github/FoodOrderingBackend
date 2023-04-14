const mongoose = require('mongoose')

const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
      
    },

});

const Orders=mongoose.model("Orders",OrderSchema);
module.exports=Orders;
