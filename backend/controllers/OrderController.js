import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js';

// @desc create a new order
// @route POST /api/orders
// @acccess Private

const addOrderItems=asyncHandler(async(req,res)=>{
    
    const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body

    
    if(orderItems && orderItems.length===0){
        res.status(400)
        throw new Error('No Order Items')
        return
    }
    else{
        const order=new Order({
            orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice,
            user:req.user._id

        })
        

        const createdOrder=await order.save()
        res.status(201).json(createdOrder)
    }
})

export {addOrderItems}