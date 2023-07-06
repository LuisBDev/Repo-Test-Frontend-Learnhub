import axios from "axios"; // Importamos el módulo axios para realizar solicitudes HTTP
import CourseCard from "../components/cards/CourseCard"; // Importamos el componente CourseCard desde la ruta especificada


// Este componente se utiliza para mostrar cada curso en la lista de cursos del usuario.

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

const Index = ({ courses }) => {
    return (
        <>
            <h1 className="jumbotron text-center bg-primary square" style={{ height: "180px" }}>
                <img src="/logo.png" alt="Logo LearnHub" style={{ marginTop: "-50px" }} />
            </h1>
            <div className="container-fluid">
                <div className="row">
                    {courses.map((course) => ( // Iteramos sobre la lista de cursos y generamos un componente CourseCard para cada uno
                        <div key={course._id} className="col-md-4">
                            <div className="border rounded p-3">
                                <CourseCard course={course} /> {/* Pasamos el curso como prop al componente CourseCard */}
                            </div>
                            <br />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
// Este componente se utiliza para mostrar cada curso en la lista de cursos del usuario.

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
export async function getServerSideProps() { // Función que se ejecuta en el servidor antes de renderizar la página
    const { data } = await axios.get(`${process.env.API}/courses`); // Realizamos una solicitud GET a la API para obtener los cursos
    return {
        props: {
            courses: data, // Pasamos los cursos obtenidos como props al componente Index
        },
    };
}

export default Index; // Exportamos el componente Index como el componente por defecto de este archivo
