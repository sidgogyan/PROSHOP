import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import {useNavigate, useSearchParams } from 'react-router-dom'
import { Form,Row,Button,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const LoginScreen = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch=useDispatch()
    const userLogin=useSelector(state=>state.userLogin)
    const {loading,error,userInfo}=userLogin
    const [query]=useSearchParams()
    const redirect=query.get("redirect")?`/${query.get("redirect")}`:"/"
    const navigate=useNavigate()


    useEffect(()=>{
        if(userInfo){
            
            navigate(redirect)
            
        }
    },[redirect,navigate,userInfo])
    
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(login(email,password))
        console.log("sid")
        navigate(redirect)
    }
  return (
    <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant={'danger'}>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
            
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


            <Button type='submit' variant='primary' className='my-2'>Sign In</Button>
        </Form>

        <Row className='py-3'>
            <Col>
            New Customer?{' '}<Link to={redirect?`/register?redirect=${redirect}`:'/register'}>Register</Link>
            </Col>

        </Row>
      
    </FormContainer>
  )
}

export default LoginScreen
