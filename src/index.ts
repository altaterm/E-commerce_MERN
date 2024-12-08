import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import { seedInitialProducts } from "./services/productService";
import productRoute from "./routes/productRoute"
const app=express()
const port =3001


app.use(express.json())


mongoose.connect("mongodb://127.0.0.1/ecommerce")
.then(() => console.log("Mongo connected!"))
.catch((err)=> console.log("failed to connect ", err))


// seed the product to database
seedInitialProducts();
app.use('/user',userRoute)
app.use('/product',productRoute)

app.listen(port, ()=> {
    console.log('server is running at : http://localhost:3001')
})