import React, {useState} from "react";
import NavBar from '../NavBar/NavBar';
import { DeleteCategoria } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../actions";
import { useEffect } from "react";
import { postCrearCategoria } from "../../actions";

const AdminRoles = () => {

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
    <div style={{width:"50%",margin:"auto"}}>
      <h1>Administrar Roles</h1>
      <div className="container">
        <label className="mx-3 d-grid gap-2">
          Ingrese E-mail para agregar como administrador
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
    
      <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Rol</th>
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
                  className="btn btn-danger"
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
    </>
  );
};

export default AdminRoles;
