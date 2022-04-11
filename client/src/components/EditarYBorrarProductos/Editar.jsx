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
import { getProducts, UpdateProduct, DeleteProduct,getUserSigningIn,getSearch } from "../../actions";
import NavBar from '../NavBar/NavBar';
import SearchIcon from '../../svg/search.svg'






const Editar = () => {

    const [busqueda,setBusqueda] = useState('')
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
        })  ;
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

    const handleSubmit = (e)=>{
        e.preventDefault()
        const fetchData = async () => {
            await dispatch(UpdateProduct(input))
            await dispatch(getProducts())
        }
        fetchData()
        alert("Elemento actualizado correctamente")
        setStateModalInsectar(false);
        
    }
    const handleDelete = (e, id) => {
        e.preventDefault()
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+id)
        if(opcion===true){
            const fetchData = async () => {
                await dispatch(DeleteProduct(id))
                await dispatch(getProducts())
            }
            fetchData()
            
        }
    }
    function editProduct(){
        alert("estaba aqui")
        setStateModalInsectar(false);
    }
    useEffect(() => {
        let inicioSesion =JSON.parse(localStorage.getItem('userData'))
        if(inicioSesion){
            console.log(inicioSesion)
            const fetchData = async () => {
                await   dispatch(getUserSigningIn({
                    'email':inicioSesion.email,
                    'password':inicioSesion.password
                }))
            }
            fetchData()
        }
    }, []);
    function handleSearch(e){
        e.preventDefault()
        
    }
    function handleInputSearch(e){
        e.preventDefault()
        setBusqueda(e.target.value)
        dispatch(getSearch(e.target.value))
        console.log(Products)
    }
    return (
        <>
        <NavBar/>
            <div style={{width:"100%"}}>
            
                <br />
                <h1>Productos en Venta</h1>
                <br />
                <form onSubmit={(e)=> handleSearch(e)} style={{display:"flex",backgroundColor:"#fff",width:"30%",justifyContent:"flex-end",alignItems:"center",flexDirection:"row",height:"50px",borderRadius:"0.5rem",margin:"auto"}}>
            <input style={{height:"100%",width:"100%",marginTop:"0"}} value={busqueda} onChange={(e) => handleInputSearch(e)} type="search" placeholder="Buscar..." />
            <button type="submit" style={{height:"100%",backgroundColor:"#fff",border:"transparent",borderLeft:"1px solid grey"}} > <img style={{height:"15px",marginLeft:"1rem",marginRight:"1rem"}} src={SearchIcon}/></button>
        </form>
                <Fragment>

                </Fragment>
     
                <br />
                
                <Table style={{width:"50%",backgroundColor:"#fff", borderRadius:"1rem",marginLeft:"8rem"}}className="table">
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
                    {Products[0].id ? (
                    <tbody>
                        {Products?.map((el)=>(
                            <tr key={el.id}>
                                <td>{el.id}</td>
                                <td>{el.name}</td>
                                <td>{el.price}</td>
                                <td>{el.stock}</td>
                                <td style={{minWidth:"80vh"}}>{el.description}</td>
                                <td><img style={{height:"100px"}} src={el.image} alt="imagen"/></td>
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
                    </tbody>):"No hay productos con esa busqueda"}
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
                    <div style={{display:"flex",flexDirection:"column",marginBottom:"1rem"}}>
                        <label>
                                Descripcion:
                        </label>
                        <textarea style={{height:"200px",resize:"none"}} name="" id="" cols="30" rows="10"value={description}
                                onChange={handleChange}></textarea>
                    </div>
                    {/* <FormGroup>
                        
                        <textarea
                            style={{height:"200px",display: "flex",flexWrap:"wrap",textAlign:"left",alignItems:"center"}}
                            className="form-control"
                            name="description"
                            type="text"
                            value={description}
                            onChange={handleChange}

                        />
                    </FormGroup> */}
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
                        onClick={() => editProduct}
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

