import Challange from "../models/Challanges.js";
import Participant from "../models/Participants.js";
import User from "../models/User.js";

export async function createChallange(data){
    return await Challange.create(data)
}

export async function getAllChallanges(){
    return await Challange.find().lean();
}

export async function getChallange(_id){
    return await Challange.findById({_id}).lean();
}

export async function getUserChallangesCount(userId){
    const user =  await User.findById({_id:userId});
    return user.joinedChallanges;
}

export async function getSaveChallangesCount(userId){
    const user =  await User.findById({_id:userId});
    return user.savedChallanges;
}

export async function editChallange(_id,data) {
    return await Challange.findByIdAndUpdate(_id,data)
}


export async  function deleteChallange(_id){
    await Participant.deleteMany({challangeId:_id})
  
    await User.updateMany(
        {}, // Update all users
        { 
          $pull: { 
            savedChallanges: _id, 
            joinedChallanges:_id 
          } 
        }
      );
    
    
    return await Challange.findByIdAndDelete(_id);
}



export async  function saveChallange(userId,challangeId){

    const user = await User.findById({_id:userId});

    user.savedChallanges.push(challangeId);

    return user.save();
}