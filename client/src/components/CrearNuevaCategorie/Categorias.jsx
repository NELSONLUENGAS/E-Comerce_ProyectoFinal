import React, {useState} from "react";

import FormularioAdd from "./FormularioAdd";
import TablaCategorias from "./TablaDeCategorias";



const Categorias = () => {

  const [formView, setFormView] = useState(false);

  return (
    <div >
      <button
        onClick={() => setFormView(!formView)}
        className="btn btn-success"
      >
        {!formView ? "+ Agregar Categorias" : "- Cerrar Formulario"}
      </button>
      {formView && <FormularioAdd  />}

      <TablaCategorias/>
    </div>
  );
};

export default Categorias;
