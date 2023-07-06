// Importamos el hook useEffect de la librería "react"
import { useEffect } from "react";

// Importamos el componente "toast" de la librería "react-toastify"
import { toast } from "react-toastify";
// Definiendo la función onFinish para manejar el envío del formulario.
// Establece el estado "loading" como verdadero para mostrar el ícono de carga.
// Muestra una notificación informativa indicando que se está validando la información proporcionada.
// Simula una carga de 5 segundos utilizando la función setTimeout.
// Realiza una solicitud POST a la ruta "/api/make-instructor" con los valores del formulario.
// Muestra la respuesta en la consola y muestra una notificación de éxito si la solicitud se realiza correctamente.
// En caso de error, muestra el estado de error en la consola y muestra una notificación de error.
// Establece el estado "loading" como falso para ocultar el ícono de carga.

// Definiendo la función validateField para validar un campo específico del formulario.
// Utiliza el método validateFields de la instancia del formulario para validar el campo especificado.

// Definiendo la función renderConvertirInstructor para renderizar el formulario de conversión a instructor.
// Utiliza el componente Form de Ant Design para crear un formulario.
// Define varios campos del formulario con sus respectivas reglas de validación y elementos de entrada.
// Muestra un botón de carga de archivo utilizando el componente Upload y el botón Button de Ant Design.
// Utiliza el componente Select de Ant Design para crear un campo de selección de opciones.
// Muestra un botón de envío del formulario utilizando el componente Button de Ant Design.
// El botón muestra un ícono de carga si el estado "loading" es verdadero.
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
