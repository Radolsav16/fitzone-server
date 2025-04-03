import { Schema , model , Types } from "mongoose";


const orderSchema = new Schema({
    userId:{
        type:Types.ObjectId
    },
    address:{
        type:String
    },
    contact:{
        type:String
    },
    products:[{ type: Types.ObjectId, ref: "Product" }],
    total:{
        type:Number
    }
},{
    timestamps:true
})

const Order = model('Order',orderSchema);


export default Order;