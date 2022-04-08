import React, {Fragment, useEffect, useState}  from "react";

import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Table,
    Button, 
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";
import { getProducts, UpdateProduct, DeleteProduct } from "../../actions";
import NavBarGuest from "../Guest/NavBarGuest";






const Editar = () => {
    const dispatch = useDispatch()
    const Products = useSelector((state) => state.products);
    const[input, setstate]= useState({
        id: "",
        name:"",
        price: "",
        stock: "",
        description:"",
        image:""
    })
    const [refresh]=useState("")
    const {name, price, stock,description, image}= input
const [modalInsertar, setStateModalInsectar] = useState(false)

  
    const mostrarModalInsertar= (e)=> {
        setstate({
            id: e.id,
            name: e.name,
            price: e.price,
            stock: e.stock,
            description: e.description,
            image:e.image
        })
        setStateModalInsectar({
            modalInsertar:true,
        });
      };
      const handleChange = (e) => {

        setstate({
          ...input,
          [e.target.name]: e.target.value,
        });
      };


    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch, refresh])
    const handleSubmit = ()=>{
        dispatch(UpdateProduct(input))
    }
    const handleDelete = (e, id) => {
        e.preventDefault()
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+id)
        if(opcion===true){
      
          dispatch(DeleteProduct(id))
        }
    }


    return (
        <>
        <NavBarGuest/>
            <div style={{width:"100%"}}>
                <br />
                <h1>Productos en Venta</h1>
                <br />
                <Fragment>

                </Fragment>
     
                <br />
                
                <Table style={{width:"50%"}}className="table">
                    <thead>
                        <tr>
                        <th>id</th>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Descripcion</th>
                            <th>Imagen</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Products.map((el)=>(
                            <tr key={el.id}>
                                <td>{el.id}</td>
                                <td>{el.name}</td>
                                <td>{el.price}</td>
                                <td>{el.stock}</td>
                                <td style={{minWidth:"80vh"}}>{el.description}</td>
                                <td>{el.image}</td>
                                <td>
                                    <Button
                                        color="primary"
                                        onClick={() => mostrarModalInsertar(el)}
                                    >
                                        Editar
                                    </Button>
                                    </td>
                                    <td>
                                    <Button 
                                            type="submit"
                                            color="danger" 
                                            onClick={(e) => handleDelete(e, el.id)}
                                            
                                    >Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </div>

            <Modal isOpen={modalInsertar} onRequestClose={()=>setStateModalInsectar(false)}>
                <ModalHeader>
                    <div><h3>Editar Producto</h3></div>
                </ModalHeader>
                <form onSubmit={handleSubmit}>
                <ModalBody>
                    <FormGroup>
                        <label>
                            Nombre Del Producto
                        </label>

                        <input
                            className="form-control"
                            name="name"
                            type="text"
                            value={name}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>
                        Precio Del Producto
                        </label>
                        <input
                            className="form-control"
                            name="price"
                            type="number"
                            value={price}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>
                            Stock:
                        </label>
                        <input
                            className="form-control"
                            name="stock"
                            type="number"
                            value={stock}
                            onChange={handleChange}

                        />
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Descripcion:
                        </label>
                        <input
                            className="form-control"
                            name="description"
                            type="text"
                            value={description}
                            onChange={handleChange}

                        />
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Imagen:
                        </label>
                        <input
                            className="form-control"
                            name="image"
                            type="text"
                            value={image}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => setStateModalInsectar(false)}
                        type="submit"
                    >
                        Editar
                    </Button>
                    <Button
                        color="danger"
                        onClick={() => setStateModalInsectar(false)}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
                 </form>
            </Modal>
    
        </>
    );

}
export default Editar;

