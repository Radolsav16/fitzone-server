import { Schema , model ,Types } from "mongoose";


const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String
    },
    savedChallanges:[{
        type:Types.ObjectId,
        ref:'Challange'
    }],
    likedPost:[{
        type:Types.ObjectId,
        ref:'Post'
    }],
    joinedChallanges:[{
        type:Types.ObjectId,
        ref:'Challange'
    }],
    cart:[{
        productId:{
            type:String,
            ref:'Product'
        },
        quantity:{
            type:Number,
        }
    }]


})


const User = model('User',userSchema);

export default User;