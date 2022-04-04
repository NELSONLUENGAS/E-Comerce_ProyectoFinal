import './App.css';
import Products from './components/Products';
import CheckoutPage from './components/CheckoutPage';
import CheckoutCard from './components/CheckoutCard';
import {Route, Routes } from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom'
import SignIn from './components/SignIn';
import RegistroForm from './components/Registro/Registro';
import Profile from './components/Profile'
import Categories from './components/Categories';
import ProductDetail from "./components/ProductDetail/ProductDetail"
import CrearProducto from './components/Agregar producto/CrearProducto';
import ForgotPassword from './components/ForgotPassword';
import AddCategorie from './components/CrearNuevaCategorie/AddCategorie'


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
          <Route exact path="/Categories" element={<Categories/>}/>
          <Route exact path="/product/:id" element={<ProductDetail/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/forgotPassword" element={<ForgotPassword/>}/>
          <Route exact path="/createProduct" element={<CrearProducto/>}/>
          <Route exact path="/addCategory" element={<AddCategorie/>}/>
          
        </Routes>
    </div>
    </Router>
  );
}

export default App;

