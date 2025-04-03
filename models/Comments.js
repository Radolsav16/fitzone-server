import {Schema , model , Types} from 'mongoose'


const commentSchema = new Schema({
    userId:{
        type:Types.ObjectId,
        ref:'User'
    },
    postId:{
        type:Types.ObjectId,
        ref:'Post'
    },
    comment:String,
},{
    timestamps:true
})


const Comment = model('Comment',commentSchema);


export default Comment;