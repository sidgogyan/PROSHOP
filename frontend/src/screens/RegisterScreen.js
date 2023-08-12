import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import {useNavigate, useSearchParams } from 'react-router-dom'
import { Form,Row,Button,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const RegisterScreen = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [message,setMessage]=useState(null)
    const dispatch=useDispatch()
    const userRegister=useSelector(state=>state.userRegister)
    const {loading,error,userInfo}=userRegister
    const [query]=useSearchParams()
    const redirect=query.get("redirect")?query.get("redirect"):"/"
    const navigate=useNavigate()


    useEffect(()=>{
        if(userInfo){
           
            navigate(redirect)
            
        }
    },[redirect,navigate,userInfo])
    
    const submitHandler=(e)=>{
        e.preventDefault()
        if(password!=confirmPassword){
            setMessage('Password do not match')
        }
        else{
        dispatch(register(name,email,password))
        }
        
    }
  return (
    <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant={'danger'}>{message}</Message>}
        {error && <Message variant={'danger'}>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>

            
        <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                type="text" 
                placeholder='Enter Name' 
                value={name} 
                onChange={(e)=>setName(e.target.value)}></Form.Control>

            </Form.Group>
            
            <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                type="email" 
                placeholder='Enter Email' 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}></Form.Control>

            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="password" 
                placeholder='Enter Password' 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}></Form.Control>

            </Form.Group>

            <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                type="password" 
                placeholder='Enter Confirm Password' 
                value={confirmPassword} 
                onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>

            </Form.Group>


            <Button type='submit' variant='primary' className='my-2'>Register</Button>
        </Form>

        <Row className='py-3'>
            <Col>
            Have An Account?{' '}<Link to={redirect?`/login?redirect=${redirect}`:'/login'}>Login</Link>
            </Col>

        </Row>
      
    </FormContainer>
  )
}

export default RegisterScreen
