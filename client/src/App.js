import './App.css';
import Products from './components/Products';
import NavBar from './components/NavBar'
import CheckoutPage from './components/CheckoutPage';
import {Route, Routes } from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className="App">
      <NavBar/>
 
      
      <Routes>
          <Route exact path="/checkout-page" element={<CheckoutPage/>} />

          <Route exact path="/" element={<Products/>} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
