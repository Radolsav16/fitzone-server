import Product from "../models/Products.js";
import Review from "../models/Review.js";

export async function createReview(data){
    const review = await Review.create(data)
    const product = await Product.findById({_id:data.productId});
    product.reviews.push(review._id);
    product.save()
    
    return review.populate('author')
}

export async function getReviews(productId) {
    return await Review.find({productId}).populate('author').lean()   
}

export async function getProductRating(productId) {
    const reviews =  await Review.find({productId});
    
    if(reviews.length === 0){
        return 5
    }
    
    const sumOfRatings = reviews.reduce((total,item) => {
        return total += item.rating;
    },0)

    return Math.ceil(sumOfRatings / reviews.length);
}