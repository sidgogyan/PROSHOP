import Header from "./components/Header";
import Footer from "./components/Footer";
import {Container} from 'react-bootstrap';
import HomeScreen from "./screens/HomeScreen";
import {Route, BrowserRouter as Router,Routes} from 'react-router-dom';
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";



function App() {
  return (
   <Router>
    <Header/>
   <main className="py-3">
    <Container> 
      <Routes>
      
      <Route path="/login" element={<LoginScreen/>}/>
      <Route path="/register" element={<RegisterScreen/>}/>
      <Route path="/profile" element={<ProfileScreen/>}/>
      <Route path="/shipping" element={<ShippingScreen/>}/>
      <Route path="/payment" element={<PaymentScreen/>}/>
      <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
      <Route  path="/product/:id" element={<ProductScreen/>}/>
      <Route  path="/cart/:id?" element={<CartScreen/>}/>
      <Route exact path="/" element={<HomeScreen/>} />
      </Routes>
       
    </Container>
   </main>
   <Footer/>
  </Router>
  );
}

export default App;
