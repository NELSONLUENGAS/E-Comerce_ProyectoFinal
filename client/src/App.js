import './App.css';
import Products from './components/Products';

import CheckoutPage from './components/CheckoutPage';
import {Route, Routes } from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom'
import SignIn from './components/SignIn';
import Checkout from './components/Register/Register';

function App() {
  return (
    <Router>
    <div className="App">

      
      <Routes>
          <Route exact path="/checkout-page" element={<CheckoutPage/>} />
          <Route exact path="/SingIn" element={<SignIn/>}/>
          <Route exact path="/Register" element={<Checkout/>}/>  
          <Route exact path="/" element={<Products/>} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
