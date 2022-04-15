import './App.css';
import Products from './components/Products/Products';
import CheckoutPage from './components/Checkout/CheckoutPage';
import CheckoutCard from './components/Checkout/CheckoutCard';
import {Route, Routes } from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom'
import SignIn from './components/SignIn/SignIn';
import RegistroForm from './components/Registro/Registro';
import AddCategorie from './components/CrearNuevaCategorie/AddCategorie'
import Categories from './components/Categories';
import ProductDetail from "./components/ProductDetail/ProductDetail"
import CrearProducto from './components/Agregar producto/CrearProducto';
import Profile from './components/Profile/Profile'
import Checkout from './components/Payment/Payment';
import Order from './components/Orders/Order';
import AuthRoute from './components/Auth/AuthRoute';
import Editar from './components/EditarYBorrarProductos/EditarProducts';
import EnvioForm from './components/EnvioFormu/EnvioForm'
import Compras from './components/MyShop/Compras'
import Favorites from './components/Favorites/Favorites';
import  UserData  from './components/UserData/UserData';
import AdminRoles from './components/AdminRoles/AdminRoles';
import ChangePassword from './components/ChangePassword/ChangePassword';
import ReviewProduct from './components/MyShop/ReviewProduct';
import EditarFormProduct from './components/EditarYBorrarProductos/FormEditProduct/CrearProducto'

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
          <Route exact path="/review/:id" element={<ReviewProduct/>}></Route>

          <Route element={<AuthRoute/>}>
            <Route  path="/user/profile" element={<Profile/>}></Route>
            <Route exact path="/user/addAdress" element={<EnvioForm/>}></Route>
            <Route exact path="/user/myShop" element={<Compras/>}></Route>
            <Route exact path="/user/favorites" element={<Favorites/>}></Route>
            <Route exact path="/user/myData" element={<UserData/>}></Route>
            <Route exact path="/user/changePassword" element={<ChangePassword/>}></Route>
            
          </Route>
          

          <Route element={<AuthRoute/>}>
            <Route path='/admin/orders' element={<Order/>}></Route>   
            <Route exact path="/admin/createCategory" element={<AddCategorie/>}></Route>
            <Route exact path="/admin/createProduct" element={<CrearProducto/>}></Route>
            <Route exact path="/admin/edit" element={<Editar/>}></Route>
            <Route exact path="/admin/edit/form/" element={<EditarFormProduct/>}></Route>
            <Route exact path="/admin/roles" element={<AdminRoles/>}></Route>
            
          </Route>
        </Routes>
    </div>
    </Router>
  );
}

export default App;

