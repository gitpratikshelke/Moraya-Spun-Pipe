const express = require('express');

const mongoose = require('mongoose');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");
// const {upload,uploadToS3} = require('./aws/app');
const {multerUpload,deleteImageFromS3} = require('./aws/app');
const multer = require("multer");
const multerS3 = require("multer-s3");
const cors = require('cors');
const Product = require('./models/products'); // adjust path as needed
const Review = require('./models/review');
const nodemailer = require("nodemailer");
const User= require('./models/user'); // adjust path as needed
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));



// app.use(express.static(path.join(__dirname, '../client/dist')));


// MongoDB connection
mongoose.connect(process.env.MongoDB_String, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// 1️⃣ GET /products/:limit - fetch a specific number of products
// app.get('/products/:limit/:category/:query', async (req, res) => {
//   const limit = parseInt(req.params.limit);
//   const category = req.params.category;

//   try {
//     let products;

//     if (category === 'All') {
//       products = await Product.find();
//     } else {
//       products = await Product.find({ category }).limit(limit);
//     }

//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch products' });
//   }
// });




app.get('/products/:limit/:category/:query', async (req, res) => {
  const limit = parseInt(req.params.limit);
  const category = req.params.category;
  const query = req.params.query;

  try {
    let filter = {};

    if (category !== 'All') {
      filter.category = category;
    }

    if (query !== 'All') {
      filter.title = { $regex: query, $options: 'i' }; // case-insensitive title match
    }

    const products = await Product.find(filter).limit(limit);
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// 2️⃣ GET /product/:id - fetch a single product by ID
app.get('/product/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching product' });
  }
});

app.post('/product', async (req, res) => {
    try {
      const products = req.body;
  
      if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'Request body must be a non-empty array of products' });
      }
  
      // Validate required fields in each product
      for (const product of products) {
        const { title, description, image, price, soldBy,type,category } = product;
        if (!title || !description || !image || !price || !soldBy|| !type || !category) {
          return res.status(400).json({ error: 'Missing required fields in one or more products' });
        }
      }
  
      const insertedProducts = await Product.insertMany(products);
      res.status(201).json({ message: 'Products added successfully', products: insertedProducts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add products' });
    }
});

// GET /products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// const { deleteImageFromS3 } = require('./path/to/deleteImageFromS3'); // Adjust the path

function extractKeyFromUrl(url) {
  if (!url) return null;
  const parts = url.split('.amazonaws.com/');
  return parts.length > 1 ? parts[1] : null;
}

// DELETE /products/:id
app.delete('/deleteproduct/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log("Delete")
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Optional: adjust based on how you store image keys
    const imageKey = extractKeyFromUrl(product.image);

    // Delete image from S3
    if (imageKey) {
      await deleteImageFromS3(imageKey);
    }

    // Delete product from DB
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: 'Product and image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete product or image' });
  }
});

app.get('/orderDetails', async (req, res) => {
  try {
    const orders = await User.find({});
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});




app.post("/upload", async (req, res) => {
  try {

    const file=await multerUpload(req, res);
    if (!file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    // Step 2: Extract product metadata from form-data
    const { title, description, price, soldBy, size, shape, type,category } = req.body;

    // Step 3: Create product document with S3 image URL
    const product = new Product({
      title,
      description,
      price,
      soldBy,
      size,
      shape,
      type,
      image: file.location, // Store the S3 image URL
      category,
    });

    // Step 4: Save product to MongoDB
    await product.save();

    // Step 5: Respond with success
    res.status(201).json({
      message: 'Product created successfully',
      product,
      imageUrl: file.location,
    });
  } catch (err) {
    res.status(500).json({
      error: 'Failed to create product',
      details: err.message,
    });
  }
  });



  


  app.post("/send-email", async (req, res) => {
    const { email, mobile, id,name } = req.body;
    
    if (!email || !mobile || !id) {
      return res.status(400).json({ error: "Email, mobile, and productId are required." });
    }
  
    try {
      // Find the product in MongoDB
      const product = await Product.findOne({_id:id});
      if (!product) {
        return res.status(404).json({ error: "Product not found." });
      }
  
      const { title, soldBy, price, size, shape, type } = product;
  
      // Set up the transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "moryaspunpipe@gmail.com",
          pass: "deam snqq wdvz xcux", // Use environment variable in production
        },
      });
  
      // Email content
      const mailOptions = {
        from: "moryaspunpipe@gmail.com",
        to: "pratikshelke8383@gmail.com",
        subject: `Quote Request for ${title}`,
        text: `
  You have received a quote request:
  
  Product Details:
  - Title: ${title}
  - Sold By: ${soldBy}
  - Price: ${price}
  - Size: ${size}
  - Shape: ${shape}
  - Type: ${type}
  
  Customer Contact:
  - Email: ${email}
  - Mobile: +91 ${mobile}
        `,
      };
  
      await transporter.sendMail(mailOptions);

      const user= new User({
      name,
      mobile,
      email,
      id,
    });

    // Step 4: Save product to MongoDB
    await user.save();
  
      res.status(200).json({ message: "Email sent successfully." });

    } catch (error) {
      console.error("Email send error:", error);
      res.status(500).json({ error: "Failed to send email." });
    }
  });


  //Reviews


  app.post("/review", async (req, res) => {
    const { id, rating, feedback,name } = req.body;
  
    if (!id || !rating || !feedback) {
      return res.status(400).json({ error: "Product ID, rating, and feedback are required." });
    }
  
    try {
      let review = await Review.findOne({ id: id });
  
      if (review) {
        console.log(name);
        // If review exists, push to arrays and save
        review.id=id;
        review.rating.push(rating);
        review.feedback.push(feedback);
        review.name.push(name);
        await review.save();
      } else {
        // If no review exists, create a new one
        console.log(name);
        review = new Review({
          id: id,
          rating: [rating],
          feedback: [feedback],
          name: [name]
        });
        await review.save();
      }
  
      res.json({ message: "Review added successfully" });
    } catch (error) {
      console.error("Review error:", error);
      res.status(500).json({ error: "Failed to add review" });
    }
  });
  
  app.get("/reviews/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const response = await Review.findOne({ id });
  
      if (!response) {
        console.log("Hello")
        return res.json({ message: "No reviews found for this product." });
      }
  
      const reviews = response.rating.map((rate, index) => ({
        name:response.name[index],
        rating: rate,
        feedback: response.feedback[index],
      }));
  
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });
  
  



  // const client = new Client({
  //   authStrategy: new LocalAuth()
  // });

  // client.on('qr', qr => {
  //     // Generate and scan this QR code with your phone
  //     qrcode.generate(qr, { small: true });
  // });

//   app.post('/send-whatsapp', async (req, res) => {
//     const { phone, message } = req.body;

//     if (!phone || !message) {
//         return res.status(400).json({ message: 'Phone number and message are required' });
//     }

//     client.on('ready', () => {
//       console.log('Client is ready!');
  
//       const number = '919307608068'; // Change to the recipient's number with country code
//       const chatId = number + "@c.us";
//       const message = "Hello from Node.js using whatsapp-web.js!";
  
//       client.sendMessage(chatId, message);
//     });
  
//     client.initialize();

//   res.send("Message sent successfully.");
// });
app.use(express.static(path.join(__dirname,'../client/dist')));


app.get('/explore/:defaultCategory', (req, res) => {
  res.sendFile(path.join(__dirname,'../client/dist/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname,'../client/dist/index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'../client/dist/index.html'));
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
