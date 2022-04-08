import './App.css';
import Products from './components/Products';
import NavBarUser from './components/User/NavBarUser'
import CheckoutPage from './components/CheckoutPage';
import CheckoutCard from './components/CheckoutCard';
import {Route, Routes } from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom'
import SignIn from './components/SignIn';
import RegistroForm from './components/Registro/Registro';
import AddCategorie from './components/CrearNuevaCategorie/AddCategorie'
import Categories from './components/Categories';
import ProductDetail from "./components/ProductDetail/ProductDetail"
import CrearProducto from './components/Agregar producto/CrearProducto';
import Profile from './components/Profile'
import Checkout from './components/Checkout';
import PreNavAdmin from './components/admin/nav';
import AuthRoute from './components/Auth/AuthRoute';

function App() {
  return (
    <Router>
    <div className="App">  
      <Routes>
          <Route exact path="/" element={<Products/>}/>
          <Route exact path="/checkout-page" element={<CheckoutPage/>} />
          <Route exact path="/SignIn" element={<SignIn/>}/>
          <Route exact path="/SignUp" element={<RegistroForm/>}/>
          <Route exact path="/checkout-card" element={<CheckoutCard/>}/>
          <Route exact path="/Checkout/Payment" element={<Checkout/>} />
          <Route exact path="/Categories" element={<Categories/>}/>
          <Route exact path="/product/:id" element={<ProductDetail/>}></Route>

          <Route element={<AuthRoute/>}>
            <Route  path="/user/profile" element={<Profile/>}></Route>
            <Route exact path="/user/addAdress" element={<CrearProducto/>}></Route>
          </Route>

          <Route element={<AuthRoute/>}>
            <Route path='/admin/orderDetails' element={<PreNavAdmin/>}></Route>   
            <Route exact path="/admin/createCategory" element={<AddCategorie/>}></Route>
            <Route exact path="/admin/createProduct" element={<CrearProducto/>}></Route>
          </Route>
        </Routes>
    </div>
    </Router>
  );
}

export default App;

