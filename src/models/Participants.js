import { Schema , Types , model } from "mongoose";


const participantSchema = new Schema({
    challangeId:{
        type:Types.ObjectId,
        ref:'Challange'
    },
    userId:{
        type:Types.ObjectId,
        ref:'User'
    },
    message:{
        type:String
    }


})

const Participant = model('Participant',participantSchema);

export default Participant;