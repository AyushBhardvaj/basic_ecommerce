import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import multer from "multer";
import productRouter from "./routes/productRoute.js";
import Stripe from "stripe";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({limit: '50mb', extended: true }));
app.use(express.json({limit: '50mb'}));

const upload = multer();

//Api
app.use("/api/auth", upload.none(), authRouter);
app.use("/api/product", productRouter)

//Stripe Payment
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      mode: "payment",
      line_items: req.body.map(item => {
        return {
          price_data: {
            currency:"inr",
            product_data:{
              name: item.name
            },
            unit_amount: (item.price)*100
          },
          quantity: item.quantity
        }
      }),
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/failure"
    })
    res.status(200).json(session.id)
    // res.status(200).json({message: "payment recieved"})
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

//Mongoose
const port = process.env.PORT || 9000;
const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => console.log(`Server Port: ${port}`));
  } catch (error) {
    console.log(`${error} did not connect`);
  }
};

connectToMongo();
