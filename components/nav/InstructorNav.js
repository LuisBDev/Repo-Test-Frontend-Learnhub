import { useState, useEffect } from "react"; // Importamos los hooks useState y useEffect de React
import Link from "next/link"; // Importamos el componente Link de la biblioteca Next.js

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


export default InstructorNav;
