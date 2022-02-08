import { useState } from "react";

import useTextTransform from "../Hooks/useTextTransform";

import { Link } from 'react-router-dom';

function PaintingPage(props) {
	// _____Pagina anterioir_____																			// Esta función me crea un link que sirve para rediriguirme a la pagina anterior
	const back = () => {
		if (props.paintings.indexOf(props.painting) > 0) {													// Esta funcion trabaja con el useState "paintings". Este es un Array que contiene en forma de objeto a las demas pinturas junto con su información. La idea de este if es la de trabajar unicamente con imagenes cuya key en el array sea mayor a 0. Esto se debe a que la key 0 corresponde al primer objeto en el Array y por ende no tiene un objeto anterior a el. De considerar al 0, me daria un error 
			let backPosition = props.paintings.indexOf(props.painting) - 1;									// Esto me resta una unidad de la key de mi cuadro actual. De esta forma me redirijo al objeto anterior								
			let backLink = props.subdirectory(props.paintings[backPosition].name)							// Esto me crea el subdirectorio del objeto anterior
			return backLink

		} else {																							// En caso de que la key de mi imagen sea 0. Que el link siga siendo esta misma página. Osea, que no me redirija a ningun lado 
			return props.subdirectory(props.painting.name)													
		}
	}



	// _____Pagina siguiente_____																			// Esta función me crea un link que sirve para rediriguirme a la pagina siguiente. Tiene la misma logica que la función back
	const next = () => {
		if (props.paintings.indexOf(props.painting) < props.paintings.length -1) {							// En este caso descarto la key del objeto que cuyo valor es el ultimo en el Array. esto se debe a que no tiene sentido ir a la página siguiente cuando estamos ubicados en la ultima imagen 
			let nextPosition = props.paintings.indexOf(props.painting) + 1;
			let nextLink = props.subdirectory(props.paintings[nextPosition].name)
			return nextLink
		
		} else {																							// En caso de que la key de mi imagen sea la ultima. Que el link siga siendo esta misma página. Osea, que no me redirija a ningun lado 										
			return props.subdirectory(props.painting.name)
		}
	}



	// _____Color de los botones_____
	const backButtonColor = () => {																			// Si el boton para retroceder a la imagen anterior se puede usar, sera de color nego, caso contrario sera gris. La logica de esto es que no se puede usar es el boton "imagen anterior" de la primera imagen, por logica esto es imposible porque la primera imagen no tiene una imagen anterior a esta 
		if (props.paintings.indexOf(props.painting) === 0){													// Si mi imagen actual esta primera en la lista, que me devuelva un Array cuyo primer valor sea la palabra "disabled" la cual la usaremos como clase CSS; y como segundo valor el color gris el cual usaremos apara cambiar el color del <svg> desde este mismo HTML. Caso contrario que me devuelva un array con la palabra "activated" la cual usaremos como clase CSS y como segundo valor el color negro   
			return ['disabled','#e5e5e5']																		
		} else {
			return ['activated','#000']
		}
	}

	const nextButtonColor = () => {																			// Si el boton para retroceder a la imagen anterior se puede usar, sera de color nego, caso contrario sera gris. La logica de esto es la misma que de la funcion anterior
		if (props.paintings.indexOf(props.painting) === props.paintings.length -1){							// Si mi imagen actual esta ultima en la lista, que el boton sea gris, caso contrario que sea negro
			return ['disabled','#e5e5e5']																		
		} else {
			return ['activated','#000']
		}
	}

	const [backButton, setBackButton] = useState(backButtonColor())											// Este useStete almacenara el array que proviene de la funcion backButtonColor()

	const [nextButton, setNextButton] = useState(nextButtonColor())



	// _____Estilo de la barrar de progreso_____ 															// Este es el estilo que usaremos para que la barra de progreso cambie su tamaño dependiendo de de la posicion de la imagen en la lista. Si estamos viendo la primera imagen, la barra de progreso apenas estara cargada. En cambio si estamos viendo la ultima imagen dicha barra esta completa  
	const progressStile = {																					// Basicamente la cantidad total de keys en el useState "paintings" es igual al 100%. La key de mi imagen representa un procertanje en ese 100%. (osea, use la regla de 3 simples)	Ej: key: 7 = 46%; 	key: 15 = 100%      
		width: `${(props.paintings.indexOf(props.painting) + 1) * 100 / props.paintings.length}%`			// ¿Por que el +1? Basicamente porque la key de la primera imagen es igual a 0. Y esto haria que mi barra de progreso este en 0 cuando se muestre la primera imagen 
	}



	/* _____Activar/desactivar el modal_____ */	
	const [modalStyles, setModalStyles] = useState(['', ''])												// Este useState va a tener un array con dos valores, cada uno es una palabra que representa a una clase CSS para activar el modal (el cartel con la imagen HD que aparece de al hacer click en el boton view)	

	const activateModalStyle = () => {																		// Esta funcion activa el modal ya que le agrega las clases al useState modalStyle
		setModalStyles(['activate-modal', 'activate-modal-image'])											
	}

	const deactivateModalStyle = () => {																	// Esta funcion desactiva el modal ya que le quita las clases al useState modalStyle
		setModalStyles(['', ''])
	}
	

	
	return (
		<div className='painting-page'>
			<div className="flex-container">
				<div className="painting-page-header">
					<div className="painting-container">
						<div className='modal-open-button' onClick={activateModalStyle}>
							<img src='./assets/shared/icon-view-image.svg' alt='View painting' className='view-icon'></img>
							<p className='view-text'>VIEW IMAGE</p>
						</div>
						<img srcSet={`
							./assets/images/${useTextTransform(props.painting.name)}/hero-large.jpg,
							./assets/images/${useTextTransform(props.painting.name)}/hero-small.jpg 5x`} alt={props.painting.name} className='image-page'>
						</img>
					</div>
					<div className='top-info'>
						<div className='top-container'>
							<p className='top-name-painting-page'>{props.painting.name}</p>
							<p className='top-artist-name-painting-page'>{props.painting.artistName}</p>
						</div>
						<img src={`./assets/images/${useTextTransform(props.painting.name)}/artist.jpg`} alt={`${props.painting.artistName}`} className='artist-image'></img>					
					</div>
				</div>
				<div className="medium-container">
					<p className='year'>{props.painting.year}</p>
					<div className='top-info-painting-page'>
						<p className='info'>{props.painting.info}</p>
						<a className='source' href={props.painting.source} target="_blank" rel="noopener noreferrer">GO TO SOURCE</a>						{/* target="_blank" es un atributo ya visto en el curso de HTML que me permite redireccionarme a otro link habriendo otra pestaña, de esta manera no se cierra mi página.   	// rel="noopener noreferrer" es un atributo de seguridad que React me obliga a poner para no tener errores */}
					</div>
				</div>
			</div>
			<div className='progress-bar'>
				<div className='progress' style={progressStile}></div>
			</div>
			<div className='bottom-container'>
				<div className='bottom-info-painting-page'>
					<p className='bottom-name-painting-page'>{props.painting.name}</p>
					<p className='bottom-artist-name-painting-page'>{props.painting.artistName}</p>
				</div>
				<div className='buttons'>
					<Link to={`/galeriaperrito/${back()}`}>
						<svg alt='Back button' className={`button ${backButton[0]}`} width="26" height="24" xmlns="http://www.w3.org/2000/svg"><g stroke={backButton[1]} fill="none" fillRule="evenodd"><path d="M24.166 1.843L3.627 12.113l20.539 10.269V1.843z" strokeWidth="3"/><path fill="#D8D8D8" d="M.986.5h-1v22.775h1z"/></g></svg>
					</Link>
					<Link to={`/galeriaperrito/${next()}`}>
						<svg alt='Back button' className={`button ${nextButton[0]}`} width="26" height="24" xmlns="http://www.w3.org/2000/svg"><g stroke={nextButton[1]} fill="none" fillRule="evenodd"><path d="M1.528 1.843l20.538 10.27L1.528 22.382V1.843z" strokeWidth="3"/><path fill="#D8D8D8" d="M24.708.5h1v22.775h-1z"/></g></svg>
					</Link>
				</div>
			</div>
			<div className={`modal ${modalStyles[0]}`}>
				<div className='modal-container'>
					<p className='modal-close-button' onClick={deactivateModalStyle}>CLOSE</p>
					<img src={`./assets/images/${useTextTransform(props.painting.name)}/gallery.jpg`} alt={`High resolution: ${props.painting.artistName}`} className={`modal-image  ${modalStyles[1]}`}></img>
				</div>
			</div>
		</div>
	);
}

export default PaintingPage;