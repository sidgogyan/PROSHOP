import express from 'express'
import protact from '../middleware/authMiddkeware.js';
import { addOrderItems } from '../controllers/OrderController.js';
const router=express.Router()



router.post("/",protact,addOrderItems)


export default router;