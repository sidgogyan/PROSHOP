import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';


// @desc Auth user and get token
// @route POST /api/users/login
// @acccess public

const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email})
    
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(401)
        throw new Error('Invalid Email or password')
    }
})



// @desc Register a new User
// @route POST /api/users
// @acccess public

const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;
    const userExits=await User.findOne({email})
    
   if(userExits){
    res.status(400)
    throw new Error('user already exits')
   }

   const user=await User.create({name,email,password})

   if(user){
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user._id)
    })
   }
   else{
    res.status(400)
     throw new Error('invalid user data')
   }
})


// @desc getuserProfile
// @route GET /api/users/profile
// @acccess private

const getUserProfile=asyncHandler(async(req,res)=>{
  
const user=await User.findById(req.user._id)

if(user){
res.json({
    _id:user._id,
    name:user.name,
    email:user.email,
    isAdmin:user.isAdmin
})
}
else{
    res.status(404)
    throw new Error('user not found')
}
})


// @desc updateUserProfile
// @route put /api/users/profile
// @acccess private

const updateUserProfile=asyncHandler(async(req,res)=>{
  
const user=await User.findById(req.user._id)

if(user){
  user.name=req.body.name||user.name
  user.email=req.body.email||user.email
  if(req.body.password){
    user.password=req.body.password;

  }
  const updatedUser=await user.save();

  res.json({
    _id:updatedUser._id,
    name:updatedUser.name,
    email:updatedUser.email,
    isAdmin:updatedUser.isAdmin,
    token:generateToken(updatedUser._id)
})
}
else{
    res.status(404)
    throw new Error('user not found')
}
})


export {authUser,registerUser,getUserProfile,updateUserProfile}