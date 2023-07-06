// Importamos el componente TopNav desde la ruta "../components/TopNav"
import TopNav from "../components/TopNav";

// Importamos los estilos CSS de Bootstrap desde "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/css/bootstrap.min.css";

// Importamos los estilos CSS de Ant Design desde "antd/dist/antd.css"
import "antd/dist/antd.css";

// Importamos los estilos CSS personalizados desde "../public/css/styles.css"
import "../public/css/styles.css";

// Importamos el componente ToastContainer desde "react-toastify"
import { ToastContainer } from "react-toastify";

// Importamos los estilos CSS de Toastify desde "react-toastify/dist/ReactToastify.css"
import "react-toastify/dist/ReactToastify.css";

// Importamos el componente Provider desde "../context"
import { Provider } from "../context";


function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer position="top-center" />
      <TopNav />
      <Component {...pageProps} />
    </Provider>
  );
}


// Renderizando el contenido de cada curso mediante el uso de props.
// Muestra la imagen del curso utilizando el componente Avatar de Ant Design.
// Elige la imagen del curso de la ubicación proporcionada o muestra una imagen predeterminada si no hay imagen disponible.
// Muestra el nombre del curso como un enlace que redirige a la página de detalle del curso.
// Muestra el número de lecciones del curso y el nombre del instructor.

// Definiendo el componente UserIndex.

// Accediendo al estado global de la aplicación utilizando el hook useContext y desestructurando el estado "user" desde el objeto "state" del contexto.

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
export default MyApp;
