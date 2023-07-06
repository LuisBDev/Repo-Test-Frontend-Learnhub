import { useContext, useEffect, useState } from "react"; // Importación de los hooks useContext, useEffect y useState desde React
import axios from "axios"; // Importación de Axios para realizar peticiones HTTP
import InstructorRoute from "../../components/routes/InstructorRoute"; // Importación de un componente de ruta para instructores
import { Avatar, Tooltip } from "antd"; // Importación de los componentes Avatar y Tooltip desde Ant Design
import Link from "next/link"; // Importación del componente Link desde Next.js
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"; // Importación de los iconos CheckCircleOutlined y CloseCircleOutlined desde Ant Design
import { Context } from "../../context"; // Importación del contexto de la aplicación
import { toast } from "react-toastify"; // Importación de la librería de notificaciones toast


const InstructorIndex = () => {
    const { state: { user } } = useContext(Context);

    const [courses, setCourses] = useState([]);
    const [publishedCount, setPublishedCount] = useState(0);

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const response = await axios.get("/api/instructor-courses");
                setCourses(response.data);
            } catch (error) {
                console.log("Error al cargar los cursos del instructor:", error);
            }
        };

        loadCourses();
    }, []);
    // Definiendo una función asincrónica llamada "loadCourse".
    // Esta función se utiliza para cargar los datos del curso desde el servidor.
    // Realiza una solicitud GET a la ruta "/api/course/${slug}" para obtener los datos del curso.
    // Al recibir la respuesta, se muestra en la consola para fines de depuración.
    // Si los datos existen, se establecen en el estado "values" mediante la función setValues.
    // Si los datos incluyen una imagen, se establece en el estado "image" mediante la función setImage.

    // Definiendo una función llamada "handleChange".
    // Esta función se utiliza para manejar los cambios en los campos de entrada del formulario.
    // Utiliza el operador spread para crear una copia del estado "values" y actualiza el valor correspondiente según el nombre del campo de entrada.

    // Definiendo una función llamada "handleImage".
    // Esta función se utiliza para manejar la selección de una imagen para cargar.
    // Obtiene el archivo de imagen seleccionado y lo almacena en la variable "file".
    // Crea una URL de vista previa de la imagen utilizando la función window.URL.createObjectURL y la establece en el estado "preview".
    // Establece el nombre del archivo en el estado "uploadButtonText".
    // Actualiza el estado "values" para indicar que se está cargando la imagen.
    // Utiliza la biblioteca de redimensionamiento Resizer para redimensionar la imagen seleccionada.
    // Realiza una solicitud POST a la ruta "/api/course/upload-image" con la imagen redimensionada.
    // Al recibir la respuesta, muestra la información en la consola y establece la imagen en el estado "image".
    // Finalmente, actualiza el estado "values" para indicar que la carga ha finalizado.

    // La función loadCourse se llama cuando se carga el componente para obtener los datos del curso.
    // Las funciones handleChange y handleImage se utilizan para manejar los cambios en los campos de entrada y la carga de imágenes, respectivamente.
    const myStyle = { marginTop: "-15px", fontSize: "10px" };

    useEffect(() => {
        if (user) {
            const countPublishedCourses = courses.reduce((count, course) => {
                if (course.published) {
                    return count + 1;
                } else {
                    return count;
                }
            }, 0);
            setPublishedCount(countPublishedCourses);
        }
    }, [user, courses]);

    useEffect(() => {
        if (user && publishedCount > 0) {
            toast.success(`¡Instructor ${user.name} tienes ${publishedCount} cursos publicados y ${(courses.length) - publishedCount} inactivo(s)!`);
        }
    }, [user, publishedCount]);
    // Definiendo una función asincrónica llamada "loadCourse".
    // Esta función se utiliza para cargar los datos del curso desde el servidor.
    // Realiza una solicitud GET a la ruta "/api/course/${slug}" para obtener los datos del curso.
    // Al recibir la respuesta, se muestra en la consola para fines de depuración.
    // Si los datos existen, se establecen en el estado "values" mediante la función setValues.
    // Si los datos incluyen una imagen, se establece en el estado "image" mediante la función setImage.

    // Definiendo una función llamada "handleChange".
    // Esta función se utiliza para manejar los cambios en los campos de entrada del formulario.
    // Utiliza el operador spread para crear una copia del estado "values" y actualiza el valor correspondiente según el nombre del campo de entrada.

    // Definiendo una función llamada "handleImage".
    // Esta función se utiliza para manejar la selección de una imagen para cargar.
    // Obtiene el archivo de imagen seleccionado y lo almacena en la variable "file".
    // Crea una URL de vista previa de la imagen utilizando la función window.URL.createObjectURL y la establece en el estado "preview".
    // Establece el nombre del archivo en el estado "uploadButtonText".
    // Actualiza el estado "values" para indicar que se está cargando la imagen.
    // Utiliza la biblioteca de redimensionamiento Resizer para redimensionar la imagen seleccionada.
    // Realiza una solicitud POST a la ruta "/api/course/upload-image" con la imagen redimensionada.
    // Al recibir la respuesta, muestra la información en la consola y establece la imagen en el estado "image".
    // Finalmente, actualiza el estado "values" para indicar que la carga ha finalizado.

    // La función loadCourse se llama cuando se carga el componente para obtener los datos del curso.
    // Las funciones handleChange y handleImage se utilizan para manejar los cambios en los campos de entrada y la carga de imágenes, respectivamente.
    const renderCourseItem = (course) => {
        return (
            <div key={course._id} className="media pt-2">
                <Avatar
                    size={80}
                    src={course.image ? course.image.Location : "/course.png"}
                />

                <div className="media-body pl-2">
                    <div className="row">
                        <div className="col">
                            <Link
                                href={`/instructor/course/view/${course.slug}`}
                                className="pointer"
                            >
                                <a className="mt-2 text-primary">
                                    <h5 className="pt-2">{course.name}</h5>
                                </a>
                            </Link>
                            <p style={{ marginTop: "-10px" }}>
                                {course.lessons.length} Lecciones
                            </p>

                            {renderCourseStatus(course)}
                        </div>

                        <div className="col-md-3 mt-3 text-center">
                            {renderCourseIcon(course)}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    // Definiendo una función asincrónica llamada "loadCourse".
    // Esta función se utiliza para cargar los datos del curso desde el servidor.
    // Realiza una solicitud GET a la ruta "/api/course/${slug}" para obtener los datos del curso.
    // Al recibir la respuesta, se muestra en la consola para fines de depuración.
    // Si los datos existen, se establecen en el estado "values" mediante la función setValues.
    // Si los datos incluyen una imagen, se establece en el estado "image" mediante la función setImage.

    // Definiendo una función llamada "handleChange".
    // Esta función se utiliza para manejar los cambios en los campos de entrada del formulario.
    // Utiliza el operador spread para crear una copia del estado "values" y actualiza el valor correspondiente según el nombre del campo de entrada.

    // Definiendo una función llamada "handleImage".
    // Esta función se utiliza para manejar la selección de una imagen para cargar.
    // Obtiene el archivo de imagen seleccionado y lo almacena en la variable "file".
    // Crea una URL de vista previa de la imagen utilizando la función window.URL.createObjectURL y la establece en el estado "preview".
    // Establece el nombre del archivo en el estado "uploadButtonText".
    // Actualiza el estado "values" para indicar que se está cargando la imagen.
    // Utiliza la biblioteca de redimensionamiento Resizer para redimensionar la imagen seleccionada.
    // Realiza una solicitud POST a la ruta "/api/course/upload-image" con la imagen redimensionada.
    // Al recibir la respuesta, muestra la información en la consola y establece la imagen en el estado "image".
    // Finalmente, actualiza el estado "values" para indicar que la carga ha finalizado.

    // La función loadCourse se llama cuando se carga el componente para obtener los datos del curso.
    // Las funciones handleChange y handleImage se utilizan para manejar los cambios en los campos de entrada y la carga de imágenes, respectivamente.
    const renderCourseStatus = (course) => {
        if (course.lessons.length < 5) {
            return (
                <p style={myStyle} className="text-warning">
                    Se requieren al menos 5 lecciones para publicar un curso
                </p>
            );
        } else {
            return (
                <p style={myStyle} className="text-success">
                    {course.published
                        ? "Tu curso está publicado en el mercado"
                        : "Tu curso está listo para ser publicado"}
                </p>
            );
        }
    };

    const renderCourseIcon = (course) => {
        if (course.published) {
            return (
                <Tooltip title="Publicado">
                    <CheckCircleOutlined className="h5 pointer text-success" />
                </Tooltip>
            );
        } else {
            return (
                <Tooltip title="No publicado">
                    <CloseCircleOutlined className="h5 pointer text-warning" />
                </Tooltip>
            );
        }
    };
    // Definiendo una función asincrónica llamada "loadCourse".
    // Esta función se utiliza para cargar los datos del curso desde el servidor.
    // Realiza una solicitud GET a la ruta "/api/course/${slug}" para obtener los datos del curso.
    // Al recibir la respuesta, se muestra en la consola para fines de depuración.
    // Si los datos existen, se establecen en el estado "values" mediante la función setValues.
    // Si los datos incluyen una imagen, se establece en el estado "image" mediante la función setImage.

    // Definiendo una función llamada "handleChange".
    // Esta función se utiliza para manejar los cambios en los campos de entrada del formulario.
    // Utiliza el operador spread para crear una copia del estado "values" y actualiza el valor correspondiente según el nombre del campo de entrada.

    // Definiendo una función llamada "handleImage".
    // Esta función se utiliza para manejar la selección de una imagen para cargar.
    // Obtiene el archivo de imagen seleccionado y lo almacena en la variable "file".
    // Crea una URL de vista previa de la imagen utilizando la función window.URL.createObjectURL y la establece en el estado "preview".
    // Establece el nombre del archivo en el estado "uploadButtonText".
    // Actualiza el estado "values" para indicar que se está cargando la imagen.
    // Utiliza la biblioteca de redimensionamiento Resizer para redimensionar la imagen seleccionada.
    // Realiza una solicitud POST a la ruta "/api/course/upload-image" con la imagen redimensionada.
    // Al recibir la respuesta, muestra la información en la consola y establece la imagen en el estado "image".
    // Finalmente, actualiza el estado "values" para indicar que la carga ha finalizado.

    // La función loadCourse se llama cuando se carga el componente para obtener los datos del curso.
    // Las funciones handleChange y handleImage se utilizan para manejar los cambios en los campos de entrada y la carga de imágenes, respectivamente.
    return (
        <InstructorRoute>
            <h1 className="jumbotron text-center square">Panel del Instructor</h1>

            {courses.length > 0 ? (
                courses.map((course) => renderCourseItem(course))
            ) : (
                <p>No hay cursos disponibles</p>
            )}
        </InstructorRoute>
    );
};
// Definiendo una función asincrónica llamada "loadCourse".
// Esta función se utiliza para cargar los datos del curso desde el servidor.
// Realiza una solicitud GET a la ruta "/api/course/${slug}" para obtener los datos del curso.
// Al recibir la respuesta, se muestra en la consola para fines de depuración.
// Si los datos existen, se establecen en el estado "values" mediante la función setValues.
// Si los datos incluyen una imagen, se establece en el estado "image" mediante la función setImage.

// Definiendo una función llamada "handleChange".
// Esta función se utiliza para manejar los cambios en los campos de entrada del formulario.
// Utiliza el operador spread para crear una copia del estado "values" y actualiza el valor correspondiente según el nombre del campo de entrada.

// Definiendo una función llamada "handleImage".
// Esta función se utiliza para manejar la selección de una imagen para cargar.
// Obtiene el archivo de imagen seleccionado y lo almacena en la variable "file".
// Crea una URL de vista previa de la imagen utilizando la función window.URL.createObjectURL y la establece en el estado "preview".
// Establece el nombre del archivo en el estado "uploadButtonText".
// Actualiza el estado "values" para indicar que se está cargando la imagen.
// Utiliza la biblioteca de redimensionamiento Resizer para redimensionar la imagen seleccionada.
// Realiza una solicitud POST a la ruta "/api/course/upload-image" con la imagen redimensionada.
// Al recibir la respuesta, muestra la información en la consola y establece la imagen en el estado "image".
// Finalmente, actualiza el estado "values" para indicar que la carga ha finalizado.

// La función loadCourse se llama cuando se carga el componente para obtener los datos del curso.
// Las funciones handleChange y handleImage se utilizan para manejar los cambios en los campos de entrada y la carga de imágenes, respectivamente.
export default InstructorIndex;
