import { makeStyles } from '@material-ui/core/styles';
import React, { useState,useEffect } from 'react';
import { 
	    Formulario, 
		Label, 
		ContenedorTerminos, 
		ContenedorBotonCentrado, 
		Boton, 
		MensajeExito,
		 MensajeError, 
		 TextArea,
		 DescriptionPErrorr
} from './ElementsCrear';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import Input from './InputCrear'
import { useDispatch,useSelector } from 'react-redux';
import NavBar from '../../NavBar/NavBar';
import { UpdateProduct } from '../../../actions';
import { Navigate, useNavigate } from 'react-router-dom';





const useStyles = makeStyles((theme) => ({
	main: {
		maxWidth: "800px",
		width: "90%",
		margin: "auto",
		padding: "40px",

	},
	Conteiner: {
		background: "#e5e5e5",
		height: "auto"
	}

}));
const CrearForm = () => {
	const dispatch = useDispatch()
	const editAdmin =useSelector((state) => state.editAdmin);
	const classes = useStyles();
	const [name, cambiarname] = useState({ campo: editAdmin[0].name , valido: null });
	const [price, cambiarprice] = useState({ campo: editAdmin[0].price, valido: null });
	const [stock, cambiarstock] = useState({ campo: editAdmin[0].stock, valido: null });
	const [image, cambiarimage] = useState({ campo: editAdmin[0].image, valido: null });
	const [description, CambiarDescripcion] = useState({ campo: editAdmin[0].description, valido: null });
	const {campo} = description
	const [terminos, cambiarTerminos] = useState(false);
	const [formularioValido, cambiarFormularioValido] = useState(null);
	const navigate = useNavigate()

	const expresiones = {
		Producto: /^[a-zA-Z0-9À-ÿ\s]{4,1000}$/, // Letras y espacios, pueden llevar acentos.
		Precio: /^\d{1,10}$/, // 4 a 12 digitos.
		Stock: /^\d{1,10}$/, // 4 a 12 digitos.
		Imagen: /^[a-zA-Z0-9À-ÿ\s][^]{4,1000}$$/,
		Descripcionn: /^[a-zA-Z0-9À-ÿ\s][^]{4,1000}$/,// 7 a 14 numeros.
	}
	const CambiarEstado = (e) => {
		CambiarDescripcion({
			...description,
			campo: e.target.value,

		});

	}
	//Validad Descripcion
	const[descriptionInput, ChangeDescription] = useState({
		pErrorDescripcion: "",
		descripcionValidada: null
	})
	const {descripcionValidada, pErrorDescripcion} = descriptionInput
	const validarDescripcion = () => {
		if (campo.length > 0) {
			if (expresiones.Descripcionn.test(campo)) {
				 ChangeDescription({
					...descriptionInput,
					descripcionValidada: "true"
				  })
				} else {
				   ChangeDescription({
					...descriptionInput,
					descripcionValidada: "false",
					pErrorDescripcion: "No puede estar vacio tiene que ser mas de 4 palabras"
				  })
				}
		}
	}

	const onChangeTerminos = (e) => {
		cambiarTerminos(e.target.checked);
	}

	const onSubmit = (e) => {
		e.preventDefault();
		var input= {
				id: editAdmin[0].id,
				name: name.campo,
				price: price.campo,
				stock: stock.campo,
				image:image.campo,
				description: description.campo,

			}
		if (
			name.valido === 'true'
		) {

			cambiarFormularioValido(true);
			dispatch(UpdateProduct(input))
			navigate('/admin/edit')
			cambiarname({ campo: '', valido: '' });
			cambiarprice({ campo: '', valido: null });
			cambiarstock({ campo: '', valido: null });
			cambiarimage({ campo: '', valido: null });
			CambiarDescripcion({ campo: '', valido: null });

			// ... 
		} else if(price.valido === 'true') {
			cambiarFormularioValido(true);
			dispatch(UpdateProduct(input))
			navigate('/admin/edit')
			cambiarname({ campo: '', valido: '' });
			cambiarprice({ campo: '', valido: null });
			cambiarstock({ campo: '', valido: null });
			cambiarimage({ campo: '', valido: null });
			CambiarDescripcion({ campo: '', valido: null });
		} else if(stock.valido === 'true'){
			cambiarFormularioValido(true);
			dispatch(UpdateProduct(input))
			navigate('/admin/edit')
			cambiarname({ campo: '', valido: '' });
			cambiarprice({ campo: '', valido: null });
			cambiarstock({ campo: '', valido: null });
			cambiarimage({ campo: '', valido: null });
			CambiarDescripcion({ campo: '', valido: null });
		}else if(image.valido === 'true'){
			cambiarFormularioValido(true);
			dispatch(UpdateProduct(input))
			navigate('/admin/edit')
			cambiarname({ campo: '', valido: '' });
			cambiarprice({ campo: '', valido: null });
			cambiarstock({ campo: '', valido: null });
			cambiarimage({ campo: '', valido: null });
			CambiarDescripcion({ campo: '', valido: null });
		}else if(descripcionValidada ==="true"){
			cambiarFormularioValido(true);
			dispatch(UpdateProduct(input))
			navigate('/admin/edit')
			cambiarname({ campo: '', valido: '' });
			cambiarprice({ campo: '', valido: null });
			cambiarstock({ campo: '', valido: null });
			cambiarimage({ campo: '', valido: null });
			CambiarDescripcion({ campo: '', valido: null });
		}else if(name.campo.length >0 && price.campo>0 && stock.campo>0&& image.campo.length>0&&description.campo.length>0){
			cambiarFormularioValido(true);
			dispatch(UpdateProduct(input))
			navigate('/admin/edit')
			cambiarname({ campo: '', valido: '' });
			cambiarprice({ campo: '', valido: null });
			cambiarstock({ campo: '', valido: null });
			cambiarimage({ campo: '', valido: null });
			CambiarDescripcion({ campo: '', valido: null });
		}else{
			cambiarFormularioValido(false);
		}
	}
	// function handleSelectCategory(e){
	// 	setCategory(e.target.value)
	// }

	return (<>
		<NavBar/>
		<main className={classes.main} style={{backgroundColor:"#C4C7BB", borderRadius:"2%",marginTop:"2rem"}}>
			<h1>Editar Producto</h1>
			<Formulario action="" onSubmit={onSubmit}>
				<Input
					estado={name}
					cambiarEstado={cambiarname}
					tipo="text"
					label="Nombre Del Producto"
					placeholder="Heladera"
					name="name"
					leyendaError="El usuario tiene que ser de 4 a 16 dígitos y solo puede contener numeros, letras y guion bajo."
					expresionRegular={expresiones.Producto}
				/>
				<Input
					estado={price}
					cambiarEstado={cambiarprice}
					tipo="number"
					label="Precio"
					placeholder="15"
					name="price"
					leyendaError="El nombre solo puede contener letras y espacios."
					expresionRegular={expresiones.Precio}
				/>
				<Input
					estado={stock}
					cambiarEstado={cambiarstock}
					tipo="number"
					label="Stock"
					placeholder="15"
					name="stock"
					leyendaError="Por favor agregue el Stock, que no este vacio"
					expresionRegular={expresiones.Stock}
				/>
				<Input
					estado={image}
					cambiarEstado={cambiarimage}
					tipo="text"
					label="Image"
					name="imagen"
					leyendaError="Esto no es una imagen."
					expresionRegular={expresiones.Imagen}
					valido={description.valido}
				// funcion={validarPassword2}
				/>

				<ContenedorBotonCentrado>
					<Label>Descripcion</Label>
					<TextArea
						value={campo}
						placeholder="Descripcion del producto"
						tipo="text"
						name="descripcion"
						onChange={CambiarEstado}
						descripcionValidada={descripcionValidada}
						onKeyUp={validarDescripcion}
						onBlur={validarDescripcion}
					/>
					<DescriptionPErrorr descripcionValidada={descripcionValidada}>{pErrorDescripcion}</DescriptionPErrorr>
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
						Acepto los Terminos y Condiciones
					</Label>
				</ContenedorTerminos>
				{formularioValido === false && <MensajeError>
					<p>
						<FontAwesomeIcon icon={faExclamationTriangle} />
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

export default CrearForm
