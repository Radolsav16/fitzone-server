import { Schema, Types, model } from "mongoose";

const productsSchema = new Schema({
  name: {
    type:String
  },
  description: {
    type:String
  },
  category: {
    type:String
  },
  price: {
    type:Number
  },
  stock: {
    type:Number
  },
  image: {
    type:String
  },
  rating: {
    type:Number
  },
  sells:{
    type:Number
  },
  reviews: [{
    type:Types.ObjectId
  }],
},{
    timestamps:true
});

const Product = model("Product", productsSchema);

export default Product;
