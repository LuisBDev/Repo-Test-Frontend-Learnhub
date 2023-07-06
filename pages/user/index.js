import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";

// Componente reutilizable para mostrar cada curso
const CourseItem = ({ curso }) => (
    <div key={curso._id} className="media pt-2 pb-1">
        <Avatar
            size={80}
            shape="square"
            src={curso.image ? curso.image.Location : "/course.png"}
        />

        <div className="media-body pl-2">
            <div className="row">
                <div className="col">
                    <Link href={`/user/course/${curso.slug}`} className="pointer">
                        <a>
                            <h5 className="mt-2 text-primary">{curso.name}</h5>
                        </a>
                    </Link>
                    <p style={{ marginTop: "-10px" }}>{curso.lessons.length} lecciones</p>
                    <p className="text-muted" style={{ marginTop: "-15px", fontSize: "12px" }}>
                        Por {curso.instructor.name}
                    </p>
                </div>
                <div className="col-md-3 mt-3 text-center">
                    <Link href={`/user/course/${curso.slug}`}>
                        <a>
                            <PlayCircleOutlined className="h2 pointer text-primary" />
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    </div>
);
// Importando los módulos necesarios desde las bibliotecas y archivos de origen.

// Importando los hooks useContext, useEffect y useState desde la biblioteca de React.

// Importando el contexto desde el archivo "../../context" para acceder al estado global de la aplicación.

// Importando el componente UserRoute desde el archivo "../../components/routes/UserRoute".

// Importando el módulo axios para realizar solicitudes HTTP.

// Importando el componente Avatar desde la biblioteca Ant Design.

// Importando el componente Link desde la biblioteca Next.js.

// Importando los iconos SyncOutlined y PlayCircleOutlined desde la biblioteca Ant Design.

// Definiendo el componente CourseItem.
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

// Finalmente, se exporta el componente UserIndex.
const UserIndex = () => {
    const { state: { user } } = useContext(Context);
    console.log("user", user);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            await loadCourses();
        };
        fetchCourses();
    }, []);

    const loadCourses = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/user-courses");
            setCourses(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    return (
        <UserRoute>
            {loading && (
                <SyncOutlined
                    spin
                    className="d-flex justify-content-center display-1 text-danger p-5"
                />
            )}
            <h1 className="jumbotron text-center square">User DashBoard</h1>

            {/* Mostrar lista de cursos */}
            {courses?.map((curso) => (
                <CourseItem key={curso._id} curso={curso} />
            ))}
        </UserRoute>
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


export default UserIndex;
