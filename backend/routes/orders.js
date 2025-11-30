import express from 'express';
import { createOrder } from '../services/ordersService.js';

const orderRouter = express.Router();

orderRouter.post('/', async (req, res)=>{
    const {customer, items} = req.body
    console.log({customer, items})

    if(!customer || !items || items.length == 0){
        return res.status(400).json({message: "Invalid order data"})
    }

    const result = await createOrder({customer, items})
    console.log("Result is:", result)

    res.status(201).json({
        message: "Order created successfully",
        orderId: result.orderId
    })
})


export default orderRouter;