import React, {useEffect} from "react";
import { DeleteCategoria } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../actions";
const TablaDeCategorias = () => {
  const dispatch=useDispatch()
  const categories = useSelector((state) => state.categories);

  function handleDelete (e, i)  {
    e.preventDefault()
    dispatch(DeleteCategoria(i));
  };
  useEffect(() => {
    dispatch(getCategories())
}, [dispatch])


  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Categoria</th>
          <th>Descripcion</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((item, i) => {
  

          return (
            <tr key={i}>
              <td>{i}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
              
                <button
                type="submit"
                  onClick={(e) => handleDelete(e, i)}
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
  );
};

export default TablaDeCategorias;
