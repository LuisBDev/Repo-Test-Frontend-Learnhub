import { useState, useEffect } from "react"; // Importamos los hooks useState y useEffect de React
import Link from "next/link"; // Importamos el componente Link de la biblioteca Next.js

// Importando los hooks useState y useEffect de React.

// Importando el componente Link de la biblioteca Next.js.

// Definiendo el componente InstructorNav.

// Definiendo el estado "current" usando useState.

// Utilizando useEffect para actualizar "current" cuando cambie la ruta de la ventana del navegador.
// Se verifica si el código se está ejecutando en el navegador usando process.browser.
// Si es así, se actualiza "current" con el valor de window.location.pathname.

// Renderizando el contenido del componente InstructorNav.
// Se utiliza el componente Link para crear enlaces a diferentes páginas.
// El primer enlace apunta a la página de "instructor" y muestra el texto "Panel de control".
// El segundo enlace apunta a la página de creación de cursos y muestra el texto "Creación de curso".
// Se utiliza la clase "nav-link" para estilizar los enlaces.
// Se utiliza la clase "active" para resaltar el enlace actual, según el valor de "current".

// Exportando el componente InstructorNav.
const InstructorNav = () => {
    // Definimos el estado "current" usando useState
    const [current, setCurrent] = useState("");

    // Usamos useEffect para actualizar "current" cuando cambie la ruta de la ventana del navegador
    useEffect(() => {
        // Verificamos si el código se está ejecutando en el navegador (para evitar errores en el servidor)
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);

    return (
        <div className="nav flex-column nav-pills">
            {/* Enlace a la página de "instructor" */}
            <Link href="/instructor">
                <a className={`nav-link ${current === "/instructor" && "active"}`}>
                    Panel de control
                </a>
            </Link>
            {/* Enlace a la página de creación de cursos */}
            <Link href="/instructor/course/create">
                <a
                    className={`nav-link ${current === "/instructor/course/create" && "active"
                        }`}
                >
                    Creación de curso
                </a>
            </Link>
        </div>
    );
};


// Utilizando useEffect para actualizar "current" cuando cambie la ruta de la ventana del navegador.
// Se verifica si el código se está ejecutando en el navegador usando process.browser.
// Si es así, se actualiza "current" con el valor de window.location.pathname.

// Renderizando el contenido del componente InstructorNav.
// Se utiliza el componente Link para crear enlaces a diferentes páginas.
// El primer enlace apunta a la página de "instructor" y muestra el texto "Panel de control".
// El segundo enlace apunta a la página de creación de cursos y muestra el texto "Creación de curso".
// Se utiliza la clase "nav-link" para estilizar los enlaces.
export default InstructorNav;
