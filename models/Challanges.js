import { Schema , Types , model } from "mongoose";


const challangeSchema = new Schema({
    name:{
        type:String,
    },
    type:{
        type:String,
        enum:['strength','cardio','flexibility','weight_loss']
    },
    difficulty:{
        type:String,
        enum:['beginner','intermediate','advanced']
    },
    duration:{
        type:String,
        enum:["7","14","30"]
    },
    equipment:{
        type:String,
        enum:["none","dumbbells","resistance_bands","yoga_mat","barbell","treadmill"]
    },
    image:{
        type:String,
    },
    description:{
        type:String,
    },
    ownerId:{
        type:Types.ObjectId,
        ref:'User'
    }

})

const Challange = model('Challange',challangeSchema);

export default Challange;