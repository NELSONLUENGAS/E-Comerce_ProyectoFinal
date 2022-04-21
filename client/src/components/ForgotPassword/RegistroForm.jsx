import { makeStyles } from '@material-ui/core/styles';
import React, {useState} from 'react';
import {Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError} from './ElementsForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { postCrearUsuario } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import Input from './InputForm'
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
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
const RegistroForm= () => {
	const classes = useStyles();
	const dispatch = useDispatch()
	const Bienvenido = () => toast.success(`Bienvenido A Latcom`)
	const Error = () => toast.error(`Por Favor llena el formulario correctamente`)
	const [correo, cambiarCorreo] = useState({campo: '', valido: null});
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
		direccion: /^[a-zA-Z0-9\s]{4,40}$/,
		codigoPostal: /^[0-9]{4,5}$/,
		fechaDeNacimiento: /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/
	}

	const validarPassword2 = () => {
		if(password.campo.length > 0){
			if(password.campo !== password2.campo){
				cambiarPassword2((prevState) => {
					return {...prevState, valido: 'false'}
				});
			} else {
				cambiarPassword2((prevState) => {
					return {...prevState, valido: 'true'}
				});
			}
		}
	}

	const onChangeTerminos = (e) => {
		cambiarTerminos(e.target.checked);
	}

	const onSubmit = (e) => {
		e.preventDefault();

		if(
			nombre.valido === 'true' &&
			lastname.valido === 'true' &&
			password.valido === 'true' &&
			password2.valido === 'true' &&
			correo.valido === 'true' &&
			telefono.valido === 'true' &&
			dni.valido === 'true' &&
			fechaDeNacimiento.valido === 'true' &&
			direction.valido === 'true' &&
			postalcode.valido === 'true' &&
			province.valido === 'true' &&
			city.valido === 'true' &&
			nationality.valido === 'true' &&
			terminos
		){
		    let input = {
				email: correo.campo,
				password: password.campo,
				name: nombre.campo,
				lastname: lastname.campo,
				birthday: fechaDeNacimiento.campo,
				dni: dni.campo,
				nationality: nationality.campo,
		
				direction: [{"direction":direction.campo,"postalcode":postalcode.campo,"city":city.campo,"province":province.campo}],
				phone: telefono.campo
			}
			dispatch(postCrearUsuario(input))
			cambiarFormularioValido(true);
			Bienvenido()
			Navigate('/SignIn')
			cambiarCorreo({campo: '', valido: null});
			// ... 
		} else {
			cambiarFormularioValido(false);
			Error()
		}
	}

	return ( <>
		
			<NavBar/>
		<main className={classes.main}>
			<h1>Ingrese su email</h1>

			<Formulario action="" onSubmit={onSubmit}>
			<ContenedorBotonCentrado>
				<Input
					estado={correo}
					cambiarEstado={cambiarCorreo}
					tipo="email"
					label="Correo Electrónico"
					name="correo"
					leyendaError="El correo solo puede contener letras, numeros, puntos, guiones y guion bajo."
					expresionRegular={expresiones.correo}
				/>
				</ContenedorBotonCentrado>
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
			<Toaster 
            position="top-center"
            reverseOrder={false}

            />
		</main>
		</>);
	
}
 
export default RegistroForm;