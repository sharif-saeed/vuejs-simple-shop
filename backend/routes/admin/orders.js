import express from "express"
import { adminGetOrders } from "../../services/admin/adminOrderService.js"


const adminOrderRoute = express.Router()

adminOrderRoute.get("/", async (req,res)=>{
    const orders = await adminGetOrders()
    res.json(orders)
})

export default adminOrderRoute