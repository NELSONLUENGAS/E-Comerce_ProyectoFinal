import './App.css';
import Products from './components/Products';
import NavBarUser from './components/User/NavBarUser'
import NavBarGuest from './components/Guest/NavBarGuest'
import CheckoutPage from './components/CheckoutPage';
import CheckoutCard from './components/CheckoutCard';
import {Route, Routes } from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom'
import SignIn from './components/SignIn';
import RegistroForm from './components/Registro/Registro';
import Categories from './components/Categories';

function App() {
  return (
    <Router>
    <div className="App">  
      <Routes>
          <Route exact path="/" element={<Products/>}/>
          <Route exact path="/user/profile" element={<NavBarUser/>}/>
          <Route exact path="/checkout-page" element={<CheckoutPage/>} />
          <Route exact path="/SignIn" element={<SignIn/>}/>
          <Route exact path="/SignUp" element={<RegistroForm/>}/>
          <Route exact path="/checkout-card" element={<CheckoutCard/>}/>
          <Route exact path="/Categories" element={<Categories/>}/>
        </Routes>
    </div>
    </Router>
  );
}

export default App;

