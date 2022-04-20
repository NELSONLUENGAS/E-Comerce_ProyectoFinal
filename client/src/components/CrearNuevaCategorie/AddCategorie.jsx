import React, {useState} from "react";
import NavBar from '../NavBar/NavBar';
import { DeleteCategoria } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../actions";
import { useEffect } from "react";
import { postCrearCategoria } from "../../actions";
import './AddCategorie.css'
import toast, { Toaster } from 'react-hot-toast';
import { makeStyles } from "@material-ui/core/styles";
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
import Logo from '../../svg/latcom1.png'
import { height } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  image: {
    with: "200px",
    height: "70px"
  },
}));

const AddCategorie = () => {

  const categories = useSelector((state) => state.categories);
  const dispatch= useDispatch()
  const [refresh]=useState("")
  const [input, setData] = useState({
    name: "",
    description:""
  })
  const classes = useStyles();
  const{name, description} = input
const notify = () => toast.success(`Has creado una nueva categoria llamada, ${name} correctamente`);
const notifyDelete = () => toast.success(`Se ha eliminado la categoria llamada, ${categoria} correctamente`);
const VaciaDescription = () => toast.error("La descripcion esta vacia")
const NombreVacios = () => toast.error("El nombre esta vacio")
const CamposVacios = () => toast.error("Por Favor llena el formulario correctamente")
const [modalInsertar, setStateModalInsectar] = useState(false)
const [inputDelete, setState] = useState({
  categoria: "",
  idd: "",
})
const {categoria, idd}= inputDelete
  function handleDelete (e)  {
    e.preventDefault()
      const fetchData = async () => {
      await dispatch(DeleteCategoria(idd))
      await dispatch(getCategories()); ;
      notifyDelete()
    
    }
    fetchData();
    setStateModalInsectar(false)
  };
  const mostrarModalInsertar= (item)=> {
    setState({
      categoria: item.name,
      idd: item.id
    })
    
    setStateModalInsectar({
      modalInsertar:true,
  })  ;
  }
  const HandleSubmit =()=>{
    if(name.length>1 && description.length<1){
      VaciaDescription()
    }else if(name.length<1 && description.length>1){
      NombreVacios()
    }else if(name.length<1 && description.length<1){
      CamposVacios()
    }else if(name.length>1 && description.length>1){
      const fetchData = async () => {
      await dispatch(postCrearCategoria(input))
      await dispatch(getCategories()); ;
     notify()
    }
    fetchData()
    }

    ;
    
  }
  const handleChange = (e) => {
    e.preventDefault()
    setData({
      ...input,
      [e.target.name]:e.target.value
    });
  };


  useEffect(() => {
    dispatch(getCategories())
}, [dispatch,refresh])

  return (<>
    <NavBar/>
    <div style={{width:"90%",margin:"auto",zIndex:"0"}}>
      <h1>Crear Categoria</h1>
      <div className="container">
        <label className="mx-3 d-grid gap-2">
          Nombre de Categoria
          <input
            onChange={handleChange}
            name="name"
            value={name}
            type="text"
            className="form-control"
  
          />
        </label>
        <label className="mx-3 d-grid gap-2">
          Descripcion
          <input
            onChange={handleChange}
            name="description"
            value={description}
            type="text"
            className="form-control"
          />
        </label>
        <div className="mx-1 d-grid gap-2">
          <button style={{backgroundColor:"#3483fa",color:"white"}}onClick={HandleSubmit} className="btn btn-info mt-2" type="submit">
            Agregar
            <Toaster 
            position="top-center"
            reverseOrder={false}

            />
          </button>
        </div>
      </div>
    <div className='container-table-categorie' >
      <table className="table-categorie" >
      <thead>
        <tr>
          <th>ID</th>
          <th>Categoria</th>
          <th>Descripcion</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {categories?.map((item, i) => {
  

          return (
            <tr key={i}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
              
                <button
                type="submit"
                  // onClick={(e) => handleDelete(e, item.id, item.name)}
                  className="button-delete"
                  onClick={() => mostrarModalInsertar(item)}
                >
                  Eliminar
                </button>
              </td>
         
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
    <Modal isOpen={modalInsertar} onRequestClose={()=>setStateModalInsectar(false)}>
                <ModalHeader>
                    <div><img className={classes.image} src={Logo}/></div>
                </ModalHeader>
                <form>
                <ModalBody>
                    <FormGroup>
                        <p>
                            {`Estas seguro Que quieres elimianar 
                            esta categoria ${categoria}, se borrara permanentemente`}
                        </p>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="danger"
                        type="submit"
                        onClick={(e) => handleDelete(e)}
                    >
                        Eliminar
                    </Button>
                    <Button
                        
                        color="primary"
                        onClick={() => setStateModalInsectar(false)}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
                 </form>
            </Modal>
    </div>
    </>
  );
};

export default AddCategorie;
