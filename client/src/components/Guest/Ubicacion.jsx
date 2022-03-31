import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './Ubicacion.css';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Location(){
    const [expand, setExpand] = useState({
        mobile: false,
    });
    function mobileOpen(e){
        e.preventDefault();
        let open = expand.mobile;
        setExpand({
            ...expand,
            mobile: !open
        })
    }

    return (
        <div className='locGrid'>
            <div className='locElement1'>
                <img src="" alt="Icono empresa" />
                <button onClick={mobileOpen}>
                {expand.mobile ? <CloseIcon/> : <MenuIcon/>}
                </button>
            </div>
            <div className='locElement2'>
              <div className="locModalMobile0">
                  <h1>Decide el destino de tú pedido</h1>
                <div className='locModalMobile1'>
                <h3>Mis Direcciones</h3>
                    <label>
                        <input type="radio" />
                        <span>Calle 13 #23-14</span> 
                        <span> Barrio la esperanza</span>
                        <span> Pedro Francisco - 3143253412</span>
                    </label>
                    <label>
                        <input type="radio" />
                        <span>Calle 13 #23-14</span> 
                        <span> Barrio la esperanza</span>
                        <span> Pedro Francisco - 3143253412
                        </span>
                    </label>
                    <label>
                        <input type="radio" />
                        <span>Calle 13 #23-14</span> 
                        <span> Barrio la esperanza</span>
                        <span> Pedro Francisco - 3143253412
                        </span>
                    </label>
                    <Link to='/MisDatos' style={{textDecoration: 'none', color: 'black'}}>
                    <button>
                      <span>Editar Direcciones</span>
                      <span>
                        <EditIcon/>
                      </span>
                    </button>
                    </Link>
                </div>
                <div className='locModalMobile2'>
                <h3>Otro Destino</h3>
                <div>
                        <select>
                          <option hidden disable='true' value="">Departamento</option>
                          <option value="">departamento</option>
                          <option value="">departamento</option>
                          <option value="">departamento</option>
                          <option value="">departamento</option>
                          <option value="">departamento</option>
                          <option value="">departamento</option>
                        </select>
                        <select>
                        <option hidden disable='true' value="">Ciudad</option>
                          <option value="">departamento</option>
                          <option value="">departamento</option>
                          <option value="">departamento</option>
                          <option value="">departamento</option>
                          <option value="">departamento</option>
                        </select>
                        <button>Aceptar</button>
                  </div>
                  <div>
                    <Link to='/AgregarDomicilio'  style={{textDecoration: 'none', color: 'black'}}>
                      <button>
                          <span>
                          <AddCircleIcon/>
                          </span>
                          <span>Agregar más detalles</span>
                      </button>
                    </Link>
                    </div>
                  </div>
                  <div className="locModalMobile3">
                    <button >cancelar</button>
                    <button >Guardar cambios</button>
                </div>
                </div>
            {expand.mobile && 
            <div className="locMenuMobile">
                <Link to='/Categorias' style={{textDecoration: 'none', color: 'black'}}>
                <span>Categorías</span>
                </Link>
                <Link to='/Ofertas' style={{textDecoration: 'none', color: 'black'}}>
                <span>Ofertas</span>
                </Link>
                <Link to='/Historial' style={{textDecoration: 'none', color: 'black'}}>
                <span>Historial</span>
                </Link>
                <Link to='/MiCuenta' style={{textDecoration: 'none', color: 'black'}}>
                <span>Mi Cuenta</span>
                </Link>
                <Link to='/MisCompras' style={{textDecoration: 'none', color: 'black'}}>
                <span>Mis Compras</span>
                </Link>
                <Link to='/Favoritos' style={{textDecoration: 'none', color: 'black'}}>
                <span>Favoritos</span>
                </Link>
                <Link to='/Ventas' style={{textDecoration: 'none', color: 'black'}}>
                <span>vender</span>
                </Link>
                <Link to='/Salir' style={{textDecoration: 'none', color: 'black'}}>
                <span>Salir</span>
                </Link>
            </div>
            }
            </div>
        </div>
    )
}