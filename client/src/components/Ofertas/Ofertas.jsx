import {useDispatch,useSelector} from 'react-redux'
import Product from '../Product/Product';
import './Ofertas.css'


export default function Ofertas(){
    let productos = useSelector((state) => state.allProducts);
    productos = productos.slice(33,36)
    return(<>
    <div className="container-sale" >
            <h2>Ofertas</h2>
        <div>
            <div className='container-products-sale'>
                { productos[0]? (
                        productos?.map((product) => (
                            <Product
                                name={product.name}
                                image={product.image}
                                price={product.price}
                                description={product.description}
                                key={product.id}
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