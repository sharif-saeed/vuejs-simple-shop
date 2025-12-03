import express from 'express';
import { getProducts } from '../services/productsService.js';

const router = express.Router();

router.get("/", async(req, res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10

    const category = req.query.category || null
    const search = req.query.search || null
    const sort = req.query.sort || null

    const products = await getProducts({page, limit, category, search, sort})
    res.json(products)
})

export default router;