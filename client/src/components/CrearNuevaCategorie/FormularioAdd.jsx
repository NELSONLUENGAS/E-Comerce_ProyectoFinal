import React, { useState } from "react";
import { postCrearCategoria } from "../../actions";
import {useDispatch} from 'react-redux'

const FormularioAdd = () => {
  const [input, setData] = useState({
    name: "",
    description:""
  })
  const{name, description} = input
  const dispatch= useDispatch()

  const handleChange = (e) => {
    e.preventDefault()
    setData({
      ...input,
      [e.target.name]:e.target.value
    });
  };
  const HandleSubmit =()=>{
    dispatch(postCrearCategoria(input))
  }
  return (
    <>
      <div className="container">
        <label className="mx-3 d-grid gap-2">
          Categoria
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
          <button onClick={HandleSubmit} className="btn btn-info mt-2" type="submit">
            Agregar
          </button>
        </div>
      </div>
    </>
  );
};

export default FormularioAdd;
