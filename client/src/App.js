import './App.css';
import Products from './components/Products';

import CheckoutPage from './components/CheckoutPage';
import {Route, Routes } from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom'
import SignIn from './components/SignIn';
import RegistroForm from './components/Registro/Registro';
<<<<<<< Updated upstream
=======
import Categories from './components/Categories';
import ProductDetail from "./components/ProductDetail/ProductDetail"
>>>>>>> Stashed changes

function App() {
  return (
    <Router>
    <div className="App">

      
      <Routes>
          <Route exact path="/checkout-page" element={<CheckoutPage/>} />
<<<<<<< Updated upstream
          <Route exact path="/SingIn" element={<SignIn/>}/>
          <Route exact path="/Register" element={<RegistroForm/>}/>
          <Route exact path="/" element={<Products/>} />
=======
          <Route exact path="/SignIn" element={<SignIn/>}/>
          <Route exact path="/SignUp" element={<RegistroForm/>}/>
          <Route exact path="/checkout-card" element={<CheckoutCard/>}/>
          <Route exact path="/Categories" element={<Categories/>}/>
          <Route exact path="/product/:id" element={<ProductDetail/>}></Route>
>>>>>>> Stashed changes
        </Routes>
    </div>
    </Router>
  );
}

export default App;
