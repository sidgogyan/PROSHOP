import express from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userControllers.js';
import protact from '../middleware/authMiddkeware.js';
const router=express.Router()


router.post('/',registerUser);

router.post('/login',authUser)

router.route('/profile').get(protact,getUserProfile).put(protact,updateUserProfile)


export default router;