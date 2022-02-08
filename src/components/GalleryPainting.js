import useTextTransform from "../Hooks/useTextTransform";

import { Link } from 'react-router-dom';																

function GalleryPainting(props) {
	return (
		<Link to={`/galeriaperrito/${props.subdirectory(props.painting.name)}`} className={`link ${useTextTransform(props.painting.name)}`}>								{/* Haciendo click aquí me permite redirigirme al link de esta imagen en especifico. Cada imagen va a tener un link propio */}
			<div className='gallery-painting'>
				<div className='animation'>
					<div className='filter'></div>																	{/* Esta es un cuadrado que va a medir lo mismo que la imagen en el cual le vamos a poner colores con transparencias para aplicar un filtro oscuro */}
					<img src={`./assets/images/${useTextTransform(props.painting.name)}/thumbnail.jpg`} alt={props.painting.name} className="image-gallery-painting"></img>
				</div>
				<div className='info-gallery-painting'>
					<p className='name-gallery-painting'>{props.painting.name}</p>
					<p className='artist-name-gallery-painting'>{props.painting.artistName}</p>
				</div>
			</div>
		</Link>
	);
}

export default GalleryPainting;