import {useDispatch,useSelector} from 'react-redux'
import Product from './Product';


export default function Ofertas(){
    let productos = useSelector((state) => state.allProducts);
    productos = productos.slice(33,38)
    return(<>
    <div style={{width:"60%",margin:"auto",marginTop:"2rem"}}>
            <h2 style={{textAlign:"left",fontFamily:"arial"}}>Ofertas</h2>
        <div>
            <div style={{display:"flex",flexDirection:"row",gap:"2rem",marginTop:"2rem",margin:"auto"}}>
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