import Participant from "../models/Participants.js";
import User from "../models/User.js";

export async function  joinChallange(challangeId,userId,message) {
    const user = await User.findById({_id:userId})
    user.joinedChallanges.push(challangeId);
    await user.save();

    const newParticipant =  await Participant.create({challangeId,userId,message})
    return await Participant.findById({_id:newParticipant._id}).populate('userId').lean();
}

export async function  getParticipants(id) {
   const participants =  await Participant.find({challangeId:id}).populate('userId').lean();

   return participants
}

export async function getLatestParticipants() {
    return (await Participant.find().populate('userId').populate('challangeId').lean()).slice(-3)
}

export async function getUserParticipateCount(id) {
    return (await Participant.find({userId:id}).lean()).length;
}