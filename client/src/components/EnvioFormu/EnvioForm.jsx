import { makeStyles } from '@material-ui/core/styles';
import React, {useState} from 'react';
import {Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError} from '../Registro/ElementsForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { PostDirection } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import Input from './inputEnvio'
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    main: {
		maxWidth: "800px",
	width: "90%",
	margin: "auto",
	padding: "40px",
	
	},
	Conteiner:{
		background: "#e5e5e5",
		height:"auto"
	}

}));
const EnvioForm= () => {
	const classes = useStyles();
	const dispatch = useDispatch()
	const conectado = useSelector((state) => state.conectado);
	const user = useSelector((state) => state.User);
	const [direction, cambiardirection] = useState({campo: '', valido: null});
	const [postalcode, cambiarpostalcode] = useState({campo: '', valido: null});
	const [province, cambiarprovince] = useState({campo: '', valido: null});
	const [city, cambiarcity] = useState({campo: '', valido: null});
	const [terminos, cambiarTerminos] = useState(false);
	const [formularioValido, cambiarFormularioValido] = useState(null);
	const navigate = useNavigate()
	const expresiones = {
		ProvinciaNacionalidadCiudad: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
		direccion: /^[a-zA-Z1-9\s]{4,40}$/,
		codigoPostal: /^[0-9]{4,5}$/,
	}

	
	const onChangeTerminos = (e) => {
		cambiarTerminos(e.target.checked);
	}

	const onSubmit = (e) => {
		e.preventDefault();
		if(
	
			direction.valido === 'true' &&
			postalcode.valido === 'true' &&
			province.valido === 'true' &&
			city.valido === 'true' &&
			terminos
		){
		    let newAdress = {
				province: province.campo,
				city: city.campo,
				postalcode: postalcode.campo,
				direction: direction.campo,
			}
			console.log(newAdress)
			dispatch(PostDirection(newAdress, user.email))
			cambiarFormularioValido(true);
			alert("Direccion agregada correctamente")
			navigate('/user/adress')
			cambiarprovince({campo: '', valido: null});
			cambiarcity({campo: '', valido: null});
			cambiardirection({campo: '', valido: null});
			cambiarpostalcode({campo: '', valido: null});
			// ... 
		} else {
			cambiarFormularioValido(false);
		}
	}

	return ( <>
		
			<NavBar/>
		<main className={classes.main}>
			<h1>Direccion De Envio</h1>
			<Formulario action="" onSubmit={onSubmit}>
		
				<Input
					estado={province}
					cambiarEstado={cambiarprovince}
					tipo="text"
					label="Provincia"
					placeholder="Buenos Aires"
					name="province"
					leyendaError="Ingresa tu provincia, correctamente para que el pedido este echo correctamente"
					expresionRegular={expresiones.ProvinciaNacionalidadCiudad}
				/>
				<Input
					estado={city}
					cambiarEstado={cambiarcity}
					tipo="text"
					label="Ciudad"
					placeholder="Buenos Aires"
					name="city"
					leyendaError="Ingrese tu ciudad correctamente"
					expresionRegular={expresiones.ProvinciaNacionalidadCiudad}
				/>
				<Input
					estado={direction}
					cambiarEstado={cambiardirection}
					tipo="text"
					label="Direccion"
					placeholder="Bartolome Mitre 250"
					name="direction"
					leyendaError="Ingrese tu direccion para cualquier pedido a domicilio, o entrega"
					expresionRegular={expresiones.direccion}
				/>
				<Input
					estado={postalcode}
					cambiarEstado={cambiarpostalcode}
					tipo="text"
					label="Codigo Postal"
					placeholder="2900"
					name="postalcode"
					leyendaError="ingrese tu codigo postal correctamente"
					expresionRegular={expresiones.codigoPostal}
				/>
				<ContenedorTerminos>
					<Label>
						<input 
							type="checkbox"
							name="terminos"
							id="terminos"
							checked={terminos} 
							onChange={onChangeTerminos}
						/>
						Acepto que estos son mis datos
					</Label>
				</ContenedorTerminos>
				{formularioValido === false && <MensajeError>
					<p>
						<FontAwesomeIcon icon={faExclamationTriangle}/>
						<b>Error:</b> Por favor rellena el formulario correctamente.
					</p>
				</MensajeError>}
				<ContenedorBotonCentrado>
					<Boton type="submit">Enviar</Boton>
					{formularioValido === true && <MensajeExito>Formulario enviado exitosamente!</MensajeExito>}
				</ContenedorBotonCentrado>
			</Formulario>
		</main>
		</>);
	
}
 
export default EnvioForm;