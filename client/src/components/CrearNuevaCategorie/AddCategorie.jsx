import React, {useState} from "react";
import NavBar from '../NavBar/NavBar';
import { DeleteCategoria } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../actions";
import { useEffect } from "react";
import { postCrearCategoria } from "../../actions";
import './AddCategorie.css'
const AddCategorie = () => {

  const categories = useSelector((state) => state.categories);
  const dispatch= useDispatch()
  const [refresh]=useState("")
  const [input, setData] = useState({
    name: "",
    description:""
  })
  const{name, description} = input

  function handleDelete (e, id, name)  {
    e.preventDefault()
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+name)
    if(opcion===true){
      const fetchData = async () => {
      await dispatch(DeleteCategoria(id))
      await dispatch(getCategories()); ;
    }
    fetchData();
    }
    
  };
  const HandleSubmit =()=>{
    const fetchData = async () => {
      await dispatch(postCrearCategoria(input))
      await dispatch(getCategories()); ;
    }
    fetchData();
    
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
    <div style={{width:"90%",margin:"auto"}}>
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
                  onClick={(e) => handleDelete(e, item.id, item.name)}
                  className="button-delete"
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
    </div>
    </>
  );
};

export default AddCategorie;
