import express from "express"
const app=express();
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import colors from 'colors'
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";


import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config();

connectDB()

app.use(express.json())


app.get((req,res)=>{
   return res.send("Api is running")
})


app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)

app.use(notFound)



app.use(errorHandler)





const PORT=process.env.PORT || 5000;
app.listen(PORT,console.log(`server is running in ${process.env.NODE_ENV} on PORT ${PORT}`.yellow.bold));