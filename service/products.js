import Product from "../models/Products.js";

export async function createProduct(data){
    return await Product.create(data)
}

export async function getProducts(startIndex,endIndex,filter){

    const totalItems = (await Product.find()).length;
    const limit = 8;
    let lastPage = Math.floor(totalItems / limit);


   
    if(filter === 'newest'){
        lastPage = Math.floor(totalItems / limit)
        return {products:(await (Product.find().sort({createdAt:-1}).lean())).slice(startIndex,endIndex),lastPage};
    }else if(filter === 'oldest'){
        lastPage = Math.floor(totalItems / limit)
        return {products:(await (Product.find().sort({createdAt:1}).lean())).slice(startIndex,endIndex),lastPage};
    }else if(filter === 'A-Z'){
        lastPage = Math.floor(totalItems / limit)
        return {products:(await Product.find().sort({name:1})).slice(startIndex,endIndex),lastPage}
    }else if(filter === 'Z-A'){
        lastPage = Math.floor(totalItems / limit)
        return {products:(await Product.find().sort({name: -1})).slice(startIndex,endIndex),lastPage}
    }else if(filter === 'low'){
        lastPage = Math.floor(totalItems / limit)
        return {products:(await Product.find().sort({price: 1})).slice(startIndex,endIndex),lastPage}
    }else if(filter === 'high'){
        lastPage = Math.floor(totalItems / limit)
        return {products:(await Product.find().sort({price: -1})).slice(startIndex,endIndex),lastPage}
    }

    if(filter){
        const filteredProducts= (await Product.find({category:filter}));

        if(filteredProducts.length === 9){
            lastPage = 1;
        }else{
            lastPage = Math.ceil(filteredProducts.length / limit);
        }
    


     return {products:filteredProducts.slice(startIndex,endIndex),lastPage};
    
    }
  
    return {products:(await Product.find().lean()).slice(startIndex,endIndex),lastPage};
    
}

export async function getAllProduct(){
    return await Product.find().lean();
}



export async function getProduct(_id){
    return await Product.findById({_id}).lean();
}

export async function editProduct(_id,data) {
    return await Product.findByIdAndUpdate(_id,data)
}


export async  function deleteProduct(_id){
    return await Product.findByIdAndDelete(_id);
}


export async function  mostSellProduct() {
    return  await Product.find().sort({ sells : -1 }).limit(3).lean();   
}