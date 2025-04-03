import Comment from "../models/Comments.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

export async function createPost(data){
    return await Post.create(data)
}

export async function getAllPosts(filter){
   
    if(filter){
        filter = filter[0].toUpperCase() + filter.slice(1);
        return await Post.find({category:filter}).populate('author').lean()
    }

    return await Post.find().populate('author').lean();


}

export async function getLatestPosts(){
    const post = await  Post.find().lean();

    return post.slice(0,3)
}

export async function getPost(_id){
    return await Post.findById({_id}).populate('author').lean();
}

export async function editPost(_id,data) {
    return await Post.findByIdAndUpdate(_id,data)
}


export async  function deletePost(_id){
    await Comment.deleteMany({postId : _id})
    await User.updateMany(
        {},
        { 
          $pull: { 
            likedPost: _id, 
          } 
        }
      );
    return await Post.findByIdAndDelete(_id);
}

export async  function pushComment(_id,comment){
    return await Post.findByIdAndUpdate(_id,{$push:{comments:comment}},{new:true})
}


export async  function likePost(postId,userId){
    const user = await User.findById({_id:userId});

    user.likedPost.push(postId);

    await user.save()
    
    const post = await Post.findById(postId)
    post.likes.push(userId)

    return post.save();
}


export async  function getLikes(postId){
    const post = await Post.findById(postId).lean();
    const likes = post.likes.length
    return likes;
}
