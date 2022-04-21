import {useDispatch,useSelector} from 'react-redux'
import Product from '../Product/Product';
import './Ofertas.css'


export default function Ofertas(){
    let productos = useSelector((state) => state.ofertas);
    productos = [productos[0],productos[1],productos[2]]
    return(<>
    <div className="container-sale" >
            <h2>Ofertas</h2>
        <div>
            <div className='container-products-sale'>
                { productos[0]? (
                        productos?.map((product) => (
                            <Product
                                discount={product.price}
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