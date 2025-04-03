import Testimonial from "../models/Testimonials.js";

export async function createTestimonial(data){
    return await Testimonial.create(data)
}

export async function  getThreeTestimonails() {
    const testimonials = await Testimonial.find().populate('author').lean()
    
      return testimonials.slice(0,3); 
}