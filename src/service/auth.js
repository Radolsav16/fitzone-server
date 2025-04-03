import User from "../models/User.js";
import imageUrlConverter from "../utils/imageUrlConverter.js";
import { generateToken } from "../utils/token.js";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'
dotenv.config()

const secret = process.env.JWT_SECRET;

export async function login(data){

    const user = await User.findOne({email:data.email}).lean();

     data.password = data.password.trim()
     
     const isValid = await bcrypt.compare(data.password,user.password)


  
    if(!isValid){
        throw Error('Password is incorrect!')
    }

    const token = generateToken(user,secret)

    return {
        id:user._id,
        name:user.name,
        email:user.email,
        imageUrl:user.imageUrl,
        accessToken:token,
        cart:user.cart
    };
    
}

export async function register(data,imageUrl){
    const isUser = await User.findOne({email:data.email});



    if(isUser){
        throw Error('User with this email already exist!');
    }

    const image = imageUrlConverter(imageUrl);

    data.password = data.password.trim()

    data.password = await bcrypt.hash(data.password,10);

    

    const user = await User.create({name:data.name,email:data.email,password:data.password,imageUrl:image});


    const token = generateToken(user,secret)

    return {
        id:user._id,
        name:user.name,
        email:user.email,
        imageUrl:user.imageUrl,
        accessToken:token,
        cart:user.cart
    };
}

export async function getUser(userId){
    return await User.findById({_id:userId}).populate('likedPost').populate('savedChallanges').populate('joinedChallanges');
}

export async function getUsers(){
    return await User.find();
}


export async function deleteUser(userId){
    return await User.findByIdAndDelete({_id:userId});
}