import { Schema, Types, model } from "mongoose";

const testimonialsSchema = new Schema({
  author:{
    type:Types.ObjectId,
    ref:'User'
  },
  testimonial:{
    type:String
  }
});

const Testimonial = model("Testimonial", testimonialsSchema);

export default Testimonial;
