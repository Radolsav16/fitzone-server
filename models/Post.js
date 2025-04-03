import { Schema , model , Types } from "mongoose";


const postSchema = new Schema({
    title:String,
    category:String,
    description:String,
    content:String,
    image:String,
    author:{
        type:Types.ObjectId,
        ref:'User'
    },
    likes:[],
    comments:[]
},{
    timestamps:true
})

const Post = model('Post',postSchema);


export default Post;