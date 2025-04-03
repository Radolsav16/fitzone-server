import Comment from "../models/Comments.js";

export async function createComment(data){
   const comment = await Comment.create(data);
   return (await comment.populate('userId'))
}

export async function getAllComments(postId){
    return await Comment.find({postId}).populate('userId').lean();
}
