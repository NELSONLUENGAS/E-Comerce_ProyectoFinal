import { makeStyles } from '@material-ui/core/styles';
import React, {useState} from 'react';
import {Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError} from '../Registro/ElementsForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { PostDirection } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import Input from './inputEnvio'
import NavBarGuest from '../Guest/NavBarGuest'
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
	const [direction, cambiardirection] = useState({campo: '', valido: null});
	const [postalcode, cambiarpostalcode] = useState({campo: '', valido: null});
	const [province, cambiarprovince] = useState({campo: '', valido: null});
	const [city, cambiarcity] = useState({campo: '', valido: null});
	const [terminos, cambiarTerminos] = useState(false);
	const [formularioValido, cambiarFormularioValido] = useState(null);
	const Navigate = useNavigate()
	const expresiones = {
		nombre: /^[a-zA-ZÀ-ÿ]{4,10}$/, // Letras y espacios, pueden llevar acentos.
		apéllido: /^[a-zA-ZÀ-ÿ]{4,10}$/,
		password: /^.{4,12}$/, // 4 a 12 digitos.
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		telefono: /^\d{7,14}$/, // 7 a 14 numeros.
		dni: /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/,
		ProvinciaNacionalidadCiudad: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
		direccion: /^[a-zA-Z1-9\s]{4,40}$/,
		codigoPostal: /^[0-9]{4,5}$/,
		fechaDeNacimiento: /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/
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
		    let input = {
				province: province.campo,
				city: city.campo,
				postalcode: postalcode.campo,
				direction: direction.campo,
			}
			let email= conectado.email
			dispatch(PostDirection(input, email))
			cambiarFormularioValido(true);
			alert("Usuario creado correctamente")
			Navigate('/SignIn')
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
		
			<NavBarGuest/>
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