import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { Button,Form,Col } from 'react-bootstrap'
import CheckoutSteps from './CheckoutSteps'

const PaymentScreen = () => {

    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart
    const dispatch=useDispatch()

    const navigate=useNavigate()

    if(!shippingAddress){
      navigate("/payment")
    }

    const [paymentMethod,setPaymentMethod]=useState('PayPal')
    


  


   
    const submitHandler=(e)=>{
        e.preventDefault()

        dispatch(savePaymentMethod(paymentMethod))

        navigate('/placeorder')

    }
  return (
    <>
    <CheckoutSteps step1 step2 step3/>
    <FormContainer>
        
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>

      <Form.Group>
        <Form.Label as="legend">Select Method</Form.Label>
     

      <Col>
      <Form.Check 
      type="radio"
      label="Paypal or Credit Card"
      id="PayPal"
      name="paymentMethod"
      value="PayPal"
      checked
      onChange={(e)=>setPaymentMethod(e.target.value)}

      
      
      >

      </Form.Check>
      </Col>
      </Form.Group>

     <Button type="submit" variant='primary' className='my-3'>Continue</Button>
            

      </Form>
    </FormContainer>
    </>
  )
}

export default PaymentScreen
