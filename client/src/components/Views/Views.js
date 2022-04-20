import Card from './Card'
import {useDispatch,useSelector} from 'react-redux'
import randomViews from './Utils';
import './Views.css'


export default function Views(){
    let productos = useSelector((state) => state.Views);
    if(productos.length > 2){
        var products = randomViews(productos)
    }
    let inicioSesion = JSON.parse(localStorage.getItem("userData"));
    return(<>
    <div className="container-sale" >
    { inicioSesion && productos.length > 2 ?  (<h2>Ultimos vistos</h2>):null}
        <div>
            <div className='container-products-sale'>
                { inicioSesion? (
                        products?.map((product,i) => (
                            <Card
                            name={product.name}
                            image={product.image}
                            price={product.price}
                            description={product.description}
                            key={i}
                            quantitiy={product.stock}
                            id={product.id}
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
