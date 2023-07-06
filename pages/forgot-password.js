// Importamos el hook useEffect de la librería "react"
import { useEffect } from "react";

// Importamos el componente "toast" de la librería "react-toastify"
import { toast } from "react-toastify";

// Definición del componente ForgotPassword
const ForgotPassword = () => {

    // Hook useEffect se utiliza para realizar efectos secundarios en componentes funcionales
    useEffect(() => {
        // Se muestra un mensaje de notificación utilizando la librería react-toastify
        toast("Modulo en construccion");
    }, []); // El segundo parámetro [] indica que este efecto solo se ejecuta una vez al montar el componente

    // Se devuelve un elemento de título con el mensaje "Modulo en construccion"
    return <h3>Modulo en construccion</h3>;
};

// Utilizando el hook useState para crear una variable de estado llamada "courses" y "loading".
// "courses" se inicializa como un arreglo vacío para almacenar los cursos del usuario.
// "loading" se inicializa como falso para indicar que no se está cargando ningún dato en este momento.

// Utilizando el hook useEffect para realizar operaciones después de que el componente se haya montado.
// Define la función fetchCourses, que se utiliza para cargar los cursos del usuario.
// Llama a la función loadCourses para obtener los cursos del usuario.
// Llama a fetchCourses cuando el componente se monta para cargar los cursos del usuario.

// Definiendo la función loadCourses para obtener los cursos del usuario.
// Realiza una solicitud GET a la ruta "/api/user-courses" para obtener los cursos del usuario.
// Al recibir la respuesta, establece los cursos en el estado "courses" mediante la función setCourses.
// Establece el estado "loading" como falso para indicar que la carga ha finalizado.

// Renderizando el contenido del componente UserIndex.
// Si el estado "loading" es verdadero, muestra un ícono de carga giratorio.
// Muestra un encabezado jumbotron con el texto "User DashBoard".
// Muestra la lista de cursos del usuario mediante el uso del componente CourseItem.

// Finalmente, se exporta el componente UserIndex.
// Se exporta el componente ForgotPassword como el valor por defecto
export default ForgotPassword;
