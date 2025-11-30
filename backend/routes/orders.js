import express from 'express';
import { createOrder } from '../services/ordersService.js';

const orderRouter = express.Router();

orderRouter.post('/', async (req, res) => {
  try {
    const { customer, items } = req.body;

    console.log('Received order data:', { customer, items }); 

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    const result = await createOrder({ customer, items });

    console.log('Result from createOrder:', result); 

    res.status(201).json({
      message: 'Order created successfully',
      orderId: result.orderId
    });

  } catch (error) {
    console.error('Error in orderRouter POST /:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


export default orderRouter;