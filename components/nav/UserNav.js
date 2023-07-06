import { useState, useEffect } from "react"; // Importamos los hooks useState y useEffect de React
import Link from "next/link"; // Importamos el componente Link de la biblioteca Next.js


const UserNav = () => {
    // Estado para almacenar la ruta actual
    const [current, setCurrent] = useState("");

    // Efecto que se ejecuta cuando se monta el componente
    useEffect(() => {
        // Verifica si el código se está ejecutando en el navegador (no en el servidor)
        // y obtiene la ruta actual del navegador
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);

    // Utilizando useEffect para actualizar "current" cuando cambie la ruta de la ventana del navegador.
    // Se verifica si el código se está ejecutando en el navegador usando process.browser.
    // Si es así, se actualiza "current" con el valor de window.location.pathname.

    // Renderizando el contenido del componente InstructorNav.
    // Se utiliza el componente Link para crear enlaces a diferentes páginas.
    // El primer enlace apunta a la página de "instructor" y muestra el texto "Panel de control".
    // El segundo enlace apunta a la página de creación de cursos y muestra el texto "Creación de curso".
    // Se utiliza la clase "nav-link" para estilizar los enlaces.
    return (
        <div className="nav flex-column nav-pills">
            {/* Navegación con enlace a la página de usuario */}
            <Link href="/user">
                <a className={`nav-link ${current === "/user" && "active"}`}>
                    DashBoard
                </a>
            </Link>
        </div>
    );
};

export default UserNav;