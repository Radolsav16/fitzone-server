import User from "../models/User.js";


export async function addToCart(userId,productId,quantity){


    const user = await User.findById({_id:userId});
    const cart = user.cart;


    const product = cart.find(i => i.productId == productId);

  

    if(product){
        product.quantity += quantity;
        return user.save()
    }

    user.cart.push({productId,quantity})
    

    return  user.save()
}

export async function emtpyCart(userId){


    const user = await User.findById({_id:userId});
   

    user.cart = [];
    
    return  user.save()
}


export async function getCart(userId){
    const user = await User.findById({_id:userId}).populate(
        {
            path:'cart.productId',
            model:'Product'
        }
    );


    

    return user.cart
}


export async function deleteFromCart(userid,productId) {
    const user = await User.findById({_id:userid});

    const index = user.cart.findIndex(o => o.productId == productId);

    user.cart.splice(index,1);

    return user.save()
}

