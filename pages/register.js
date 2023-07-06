import React, { useState, useEffect, useContext } from "react"; // Importación de módulos de React
import axios from "axios"; // Importación del módulo axios para hacer solicitudes HTTP
import { toast } from "react-toastify"; // Importación del módulo toast de react-toastify para mostrar notificaciones
import { SyncOutlined } from "@ant-design/icons"; // Importación del ícono SyncOutlined de ant-design/icons
import Link from "next/link"; // Importación del componente Link de la biblioteca next/link
import { Context } from "../context"; // Importación del contexto desde "../context"
import { useRouter } from "next/router"; // Importación del hook useRouter de la biblioteca next/router


// Componente reutilizable para los elementos de formulario
const FormInput = ({ type, value, onChange, placeholder, required }) => (
  <input
    type={type}
    className="form-control mb-4 p-4"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
  />
);
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
const Register = () => {
  const [name, setName] = useState(""); // Estado para almacenar el nombre
  const [email, setEmail] = useState(""); // Estado para almacenar el correo electrónico
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
  const [loading, setLoading] = useState(false); // Estado para indicar si se está cargando algo o no

  const { state: { user } } = useContext(Context); // Obtener el estado de usuario del contexto
  const router = useRouter(); // Obtener el enrutador de la página

  useEffect(() => {
    if (user !== null) router.push("/"); // Redirigir al usuario a la página principal si ya ha iniciado sesión
  }, [user]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el límite de caracteres de la contraseña (10 caracteres)
    if (password.length > 10) {
      toast("La contraseña debe tener máximo 10 caracteres.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
      });

      toast("Registro exitoso. Por favor, inicia sesión.");
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      console.log(data);
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
    }
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
  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">Registro</h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingresa tu nombre"
            required
          />

          <FormInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo electrónico"
            required
          />

          <FormInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />

          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!name || !email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : "Enviar"}
          </button>
        </form>

        <p className="text-center p-3">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login">
            <a>Iniciar sesión</a>
          </Link>
        </p>
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
export default Register;
