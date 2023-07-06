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