import express from "express"
import { adminCreateProduct, adminDeleteProduct, adminGetProducts, adminUpdateProduct } from "../../services/admin/adminProductService.js"

const adminProductRoutes = express.Router()


adminProductRoutes.get("/", async(req, res)=>{
    const products = await adminGetProducts()
    res.json(products)
})


adminProductRoutes.post("/", async(req, res)=>{
   const id = await adminCreateProduct(req.body)
   res.json({success:true, id})
})

adminProductRoutes.put("/:id", async(req, res)=>{
    await adminUpdateProduct(req.params.id, req.body)
    res.json({success:true})
})


adminProductRoutes.delete("/:id", async(req, res)=>{
    await adminDeleteProduct(req.params.id)
    res.json({success:true})
})

export default adminProductRoutes