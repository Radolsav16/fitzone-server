import express from 'express';
import { configDatabase } from './configs/Database.js';
import dotenv from 'dotenv';
dotenv.config()
import cors from 'cors'
import multer from 'multer'
import { deleteUser, getUser, getUsers, login, register } from './service/auth.js';
import { createChallange, deleteChallange, editChallange, getAllChallanges, getChallange, getSaveChallangesCount, getUserChallangesCount, saveChallange} from './service/challanges.js';
import { createPost, deletePost, editPost, getAllPosts, getLatestPosts, getLikes, getPost, likePost, pushComment } from './service/blog.js';
import { createComment, getAllComments } from './service/comments.js';
import path from 'path'
import { checkToken } from './utils/token.js';
import { getLatestParticipants,  getParticipants, getUserParticipateCount, joinChallange } from './service/participants.js';
import { createProduct, deleteProduct, editProduct, getAllProduct, getProduct, getProducts, mostSellProduct } from './service/products.js';
import { createTestimonial, getThreeTestimonails } from './service/testimonials.js';
import { addToCart, deleteFromCart, emtpyCart, getCart } from './service/cart.js';
import { createOrder, getAllOrders, getUserOrder, orderRevenue, ordersCount } from './service/orders.js';
import { createReview, getProductRating, getReviews } from './service/reviews.js';


const PORT = process.env.PORT || 3030;
const Uri = 'mongodb+srv://todorovradoslav6:jsWCEmJavDiS6YYa@clusterfitzone.9af6p.mongodb.net/fitzone-app';
const JWT_SECRET = process.env.JWT_SECRET || 'fitzone-secret_sdfhbksjfb8374'




const app = express();

app.use(express.urlencoded({extended:false}))
app.use(express.json());


await configDatabase(Uri);

app.use(cors())

const upload = multer({dest :'uploads/'})

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


app.post('/auth/register',upload.single('file'),async (req, res) => {
   const imageUrl = `/uploads/${req.file.filename}`;
    try {
      const user = await register(req.body,imageUrl);
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err.message)
    }
});

app.post('/auth/login',upload.none(),async (req, res) => {
   try {
     const user = await login(req.body);
     res.status(200).json(user)
   } catch (err) {
     res.status(404).json(err)
   }
});

app.get('/auth/logout',async (req, res) => {
  const token = req.headers['x-authorization'];
  const isValidToken = checkToken(token,JWT_SECRET);

  if(isValidToken){
    res.status(204)
  }else{
    res.status(401).json()
  }
});



app.post('/create-challange', async (req, res) => {
  try {
    await createChallange(req.body)
    res.status(200);
  } catch (error) {
    res.status(500).json(error)
  }
});

app.get('/challanges', async (req, res) => {
  try {
    const data = await getAllChallanges()
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error)
  }
});

app.get('/challanges/:id', async (req, res) => {
  const {id} = req.params
  try {
    const data = await getChallange(id)
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error)
  }
});

app.put('/challanges/:id', async (req, res) => {
  const { id } = req.params
  try {
   await editChallange(id,req.body);
   res.status(204).json({message:"Succefully updated challange!"})
  } catch (error) {
    res.status(404).json({message:'Challange Not Found'})
  }
});


app.delete('/challanges/:id', async (req, res) => {
  const { id,userId } = req.params
  try {
   await deleteChallange(id,userId);
   res.status(204).json({message:"Succefully delete challange!"})
  } catch (error) {
    res.status(500).json(error)
  }
});


app.get('/joined-challanges/:userId',async (req, res) => {
  const { userId } = req.params
  try {
   const challangesCount = await getUserChallangesCount(userId);
   res.status(200).json(challangesCount)
  } catch (error) {
    res.status(500).json(error)
  }
})

app.get('/saved-challanges/:userId',async (req, res) => {
  const { userId } = req.params
  try {
   const challanges = await getSaveChallangesCount(userId);
   res.status(200).json(challanges)
  } catch (error) {
    res.status(500).json(error)
  }
})

app.post('/join-challange/:userId/:challangeId', async (req, res) => {
  const { userId , challangeId } = req.params
  try {
   const challange = await joinChallange(challangeId,userId,req.body.message);
   res.status(200).json(challange)
  } catch (error) {
    res.status(500).json(error)
  }
});

app.get('/challange-participants/:id', async (req, res) => {
  const { id } = req.params
  try {
   const participants = await getParticipants(id);

   res.status(200).json(participants)
  } catch (error) {
    res.status(500).json(error)
  }
});

app.post('/challange-save/:userId/:challangeId', async (req, res) => {
  const { userId , challangeId} = req.params
  

  try {
   await saveChallange(userId,challangeId);
   res.status(200).json({message:"Succesfull save challange"})
  } catch (error) {
    res.status(500).json(error)
  }
});


app.get('/latest-participants-challanges', async (req, res) => {
  try {
   const challanges = await getLatestParticipants();

   res.status(200).json(challanges)
  } catch (error) {
    res.status(500).json(error)
  }
});


app.get('/user-participant-count/:userId', async (req, res) => {
  const {userId} = req.params;
  
  try {
   const count = await getUserParticipateCount(userId);

   res.status(200).json(count)
  } catch (error) {
    res.status(500).json(error)
  }
});


app.post('/blog/create-post', async (req, res) => {
  try {
    await createPost(req.body)
    res.status(200).json({message:"Succesfully added post!"});
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
});

app.get('/blog/posts', async (req, res) => {
  const {filter} = req.query;
  try {
    const data = await getAllPosts(filter)
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
});

app.get('/blog/latest-posts', async (req, res) => {
  try {
    const data = await getLatestPosts()
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
});


app.get('/blog/post/:id', async (req, res) => {
  const {id} = req.params
  try {
    const data = await getPost(id)
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
});

app.put('/blog/post/:id', async (req, res) => {
  const { id } = req.params
  try {
   await editPost(id,req.body);
   res.status(204).json({message:"Succefully updated post!"})
  } catch (error) {
    res.status(500).json(error)
  }
});


app.delete('/blog/post/:id', async (req, res) => {
  const { id } = req.params
  try {
   await deletePost(id);
   res.status(204).json({message:"Succefully delete post!"})
  } catch (error) {
    res.status(500).json(error)
  }
});


app.get('/blog/comments/:postId',async (req, res) => {
  const { postId } = req.params;
  try {
   const data = await getAllComments(postId);
   res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error)
  }
})

app.post('/blog/comment/', async (req, res) => {
  try {
    const comment = await createComment(req.body)
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
});

app.get('/blog/like/:postId/:userId', async (req, res) => {
  const {postId , userId} = req.params
  try {
     const post = await likePost(postId,userId)
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
});

app.get('/blog/likes/:postId/', async (req, res) => {
  const {postId} = req.params
  try {
     const likes = await getLikes(postId)
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
});

app.get('/user/:userId/', async (req, res) => {
  const {userId} = req.params
  try {
     const user = await getUser(userId)
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
});

app.get('/users', async (req, res) => {
  try {
     const users = await getUsers()
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
});

app.delete('/user/:userId', async (req, res) => {
  const { userId } = req.params
  try {
   await deleteUser(userId);
   res.status(204).json({message:"Succefully delete user!"})
  } catch (error) {
    res.status(500).json(error)
  }
});


app.post('/create-product/', async (req, res) => {

  try {
   await createProduct(req.body);
   res.status(200).json({message:"Succesfull create product"})
  } catch (error) {
    res.status(500).json(error)
  }
});

app.get('/products/', async (req, res) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const filter = req.query.filter
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  
  try {
     const products = await getProducts(startIndex,endIndex,filter)
     
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
});

app.get('/all-products/', async (req, res) => {
  try {
     const products = await getAllProduct()
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
});


app.get('/products/:id', async (req, res) => {
  const {id} = req.params
  try {
     const product = await getProduct(id)
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
});



app.put('/product/:id', async (req, res) => {
  const {id} = req.params
  try  {
   await editProduct(id,req.body);
   res.status(200).json({message:"Succesfull edit product"})
  } catch (error) {
    res.status(500).json(error)
  }
});

app.delete('/product/:id', async (req, res) => {
  const { id } = req.params
  try {
   await deleteProduct(id);
   res.status(204).json({message:"Succefully delete product!"})
  } catch (error) {
    res.status(500).json(error)
  }
});


app.get('/most-sell-products/', async (req, res) => {
  const {id} = req.params
  try {
     const product = await mostSellProduct(id)
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
});

app.post('/create-testimonial', async (req, res) => {
  try {
     await createTestimonial(req.body)
    res.status(200).json({message:'Succesfull send testimonials'});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
});

app.get('/testimonials', async (req, res) => {
  try {
     const testimonials = await getThreeTestimonails(req.body)
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
});

app.post('/add-to-cart/:userId/:productId',async (req,res) => {
  const {userId, productId} = req.params
  const {quantity} = req.body;
  try {
    await addToCart(userId,productId,quantity)
   res.status(200).json({message:'Succesfull added'});
 } catch (error) {
   res.status(500).json({message:error.message})
 }
})

app.get('/cart/:userId',async (req,res) => {
  const {userId} = req.params
  try {
    const cart = await getCart(userId)
   res.status(200).json(cart);
 } catch (error) {
   res.status(500).json({message:error.message})
 }
})

app.delete('/delete-from-cart/:productId/:userId', async (req, res) => {
  const {productId , userId } = req.params
  try {
   await deleteFromCart(userId,productId);
   res.status(204).json({message:"Succefully delete item!"})
  } catch (error) {
    res.status(500).json(error)
  }
});

app.delete('/emtpy-cart/:userId',async (req, res) => {
  const { userId } = req.params
  try {
   await emtpyCart(userId);
   res.status(204).json({message:"Succefully empty cart!"})
  } catch (error) {
    res.status(500).json(error)
  }
})

app.post('/order/:userId',async (req,res) => {
  const {userId} = req.params
  try {
    await createOrder(userId,req.body)
   res.status(200).json({message:'Succesfull added'});
 } catch (error) {
   res.status(500).json({message:error.message})
 }
})

app.get('/orders',async (req,res) => {
  try {
    const orders = await getAllOrders()
   res.status(200).json(orders);
 } catch (error) {
   res.status(500).json({message:error.message})
 }
})

app.get('/orders/revenue',async (req,res) => {
  try {
    const revenue = await orderRevenue()
   res.status(200).json(revenue);
 } catch (error) {
   res.status(500).json({message:error.message})
 }
})

app.get('/orders-count',async (req,res) => {
  try {
    const count = await ordersCount()
   res.status(200).json(count);
 } catch (error) {
   res.status(500).json({message:error.message})
 }
})

app.get('/orders/:userId',async (req,res) => {
  const {userId} = req.params
  try {
    const orders = await getUserOrder(userId)
   res.status(200).json(orders);
 } catch (error) {
   res.status(500).json({message:error.message})
 }
})

app.post('/create-review',async (req,res) => {
  try {
    const review = await createReview(req.body)
   res.status(200).json(review);
 } catch (error) {
   res.status(500).json({message:error.message})
 }
})

app.get('/reviews/:productId',async (req,res) => {
  const {productId} = req.params
  try {
    const reviews = await getReviews(productId)
   res.status(200).json(reviews);
 } catch (error) {
   res.status(500).json({message:error.message})
 }
})

app.get('/product/rating/:productId',async (req,res) => {
  const {productId} = req.params
  try {
    const rating = await getProductRating(productId)
   res.status(200).json(rating);
 } catch (error) {
   res.status(500).json({message:error.message})
 }
})


app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))