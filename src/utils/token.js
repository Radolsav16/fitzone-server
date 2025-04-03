import jwt from 'jsonwebtoken';

export function generateToken(data,secret){

    const payload = {
        id:data._id,
        name:data.name,
        email:data.email,
        imageUrl:data.imageUrl
    }

    
    const token = jwt.sign(payload,secret);

    return token;
}


export function checkToken(token,secret){
    return jwt.verify(token,secret);
}