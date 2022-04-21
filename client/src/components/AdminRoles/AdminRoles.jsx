import React, {useState} from "react";
import NavBar from '../NavBar/NavBar';
import { DeleteCategoria } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { getAdmins,addAdmin,deleteAdmin } from "../../actions";
import { useEffect } from "react";
import { postCrearCategoria } from "../../actions";
import './AdminRoles.css'
const AddCategorie = () => {

  const admins = useSelector((state) => state.admins);
  const user = useSelector((state) => state.User);
  const dispatch= useDispatch()
  const [refresh]=useState("")
  const [email, setEmail] = useState("")

  function handleDelete (e, emailSelected)  {
    e.preventDefault()
    var opcion = window.confirm("Estás seguro que deseas sacarle el admin a " + emailSelected)
    if(opcion===true){
      const fetchData = async () => {
      await dispatch(deleteAdmin(emailSelected))
      await dispatch(getAdmins()); ;
    }
    fetchData();
    }
    
  };
  const HandleSubmit =()=>{
    const fetchData = async () => {
      await dispatch(addAdmin(email))
      await dispatch(getAdmins()); ;
    }
    fetchData();
  }
  const handleChange = (e) => {
    e.preventDefault()
    setEmail(e.target.value)
  };


  useEffect(() => {
    dispatch(getAdmins())
}, [dispatch,refresh])

  return (<>
    <NavBar/>
    <div style={{width:"90%",margin:"auto"}}>
      <h1>Administrar roles</h1>
      <div className="container">
        <label className="mx-3 d-grid gap-2">
          Ingrese el e-mail para hacer administrador
          <input
            onChange={handleChange}
            name="name"
            value={email}
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
          <th>E-mail</th>
          <th>Nombre</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        {admins?.map((item, i) => {
  

          return (
          i=== 1 ? (<tr key={i}>
              <td>{item.email}</td>
              <td>{item.name} {item.lastname}</td>
              <td>
                
                {item.email === user.email ? (null):(<button
                type="submit"
                  onClick={(e) => handleDelete(e, item.email)}
                  className="button-delete"
                >
                  Eliminar
                </button>)}
              </td>
            </tr>
          
            ):(null)
          )
        })}
      </tbody>
    </table>
    </div>
    </div>
    </>
  );
};

export default AddCategorie;
