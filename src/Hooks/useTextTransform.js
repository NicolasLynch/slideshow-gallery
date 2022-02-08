/* 
 - Esta es una herramienta para poder convertir el nombre de la pintura en un texto que puede ser incluido y leido en en un URL 
 - Básicamente los nombres de las imagenes tienen letras mayusculas y espacios, mientras la el nombre del archivo de esa misma imagen tienen todas sus letras 
   en minusculas y renglones. Esta funcion agarra los "strings" y convierte las letras mayusculas en minusculas y a su vez reemplaza el espacio por un renglon alto 
 - Esta función es necesaria porque estoy estoy trabajando con un objeto el cual solamente tiene el nombre de la obra. El reesto del URL se lo tengo que agregar, pero
   antes tengo que hacerles estos arreglos al string    
   */


const useTextTransform = (text) => {

	let newText = (text.replace(/ /g, '-')).toLowerCase();
	return newText
}

export default useTextTransform;