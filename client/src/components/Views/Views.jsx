import Card from './Card'
import {useDispatch,useSelector} from 'react-redux'
import randomViews from './Utils';
import './Views.css'
import Product from'../Product/Product'


export default function Views(){
    let productos = useSelector((state) => state.Views);
    if(productos.length > 2){
        let ultimos=(productos.length-3)
        if(ultimos<0){
            ultimos=0
        }
        var products = productos.slice(ultimos,productos.length)
    }
    let inicioSesion = JSON.parse(localStorage.getItem("userData"));
    return(<>
    <div className="container-sale" >
    { inicioSesion && productos.length>2 ? (<h2>Ultimos vistos</h2>):null}
        <div>
            <div className='container-products-sale'>
                { inicioSesion? (
                        products?.map((product,i) => (
                            <Product
                            name={product.name}
                            image={product.image}
                            price={product.price}
                            description={product.description}
                            key={i}
                            quantitiy={product.stock}
                            id={product.ref}
                            stock={product.stock}
                            />
                        )
                        )):null}
            </div>
        </div>
        </div>
        </>
    )
}