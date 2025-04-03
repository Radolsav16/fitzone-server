import { Schema , model , Types } from "mongoose";


const reviewSchema = new Schema({
   author:{
      type:Types.ObjectId,
      ref:'User'
   },
   productId:{
    type:Types.ObjectId,
    ref:'Product'
   },
   title:{
    type:String
   },
   review:{
    type:String
   },
   rating:{
    type:Number
   }
},{
    timestamps:true
})

const Review = model('Review',reviewSchema);


export default Review;