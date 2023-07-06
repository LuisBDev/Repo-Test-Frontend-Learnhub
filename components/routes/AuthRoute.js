import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
// Importando los hooks useEffect y useState de React.

// Importando el módulo axios para realizar solicitudes HTTP.

// Importando el módulo useRouter de la biblioteca Next.js para obtener información sobre la ruta actual.

// Importando el componente SyncOutlined de la biblioteca "@ant-design/icons" para mostrar un icono de sincronización.

// Definiendo el componente AuthRoute.

// Definiendo el estado "ok" usando useState para verificar si el usuario está autenticado.

// Obteniendo el objeto router usando el hook useRouter.

// Utilizando useEffect para llamar a la función fetchUser cuando se carga el componente.

// Definiendo la función fetchUser para obtener la información del usuario actual desde la API.
// Si la solicitud es exitosa y data.ok es true, se establece el estado "ok" en true.
// Si hay algún error, se muestra en la consola y se redirige al usuario a la página de inicio de sesión.

// Renderizando el contenido del componente AuthRoute.
// Si "ok" es false, se muestra un icono de sincronización giratorio en el centro de la pantalla.
// Si "ok" es true, se muestra el contenido del componente AuthRoute.
// El contenido incluye un contenedor fluido que envuelve a los elementos hijos.
// Si "showNav" es true, se muestra el componente UserNav.
// Se renderizan los elementos hijos del componente.

// Exportando el componente AuthRoute.
const AuthRoute = ({ children, showNav = true }) => {
    // state
    const [ok, setOk] = useState(false);
    // router
    const router = useRouter();
    useEffect(() => {
        fetchUser();
    }, []);
    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/api/current-user");
            if (data.ok) setOk(true);
        } catch (err) {
            console.log(err);
            setOk(false);
            router.push("/login");
        }
    };
    return (
        <>
            {!ok ? (
                <SyncOutlined
                    spin
                    className="d-flex justify-content-center display-1 text-primary p-5"
                />
            ) : (
                <div className="container-fluid">
                    {showNav && <UserNav />}
                    {children}
                </div>
            )}
        </>
    );
};



// Utilizando useEffect para llamar a la función fetchUser cuando se carga el componente.

// Definiendo la función fetchUser para obtener la información del usuario actual desde la API.
// Si la solicitud es exitosa y data.ok es true, se establece el estado "ok" en true.
// Si hay algún error, se muestra en la consola y se redirige al usuario a la página de inicio de sesión.

// Renderizando el contenido del componente AuthRoute.
// Si "ok" es false, se muestra un icono de sincronización giratorio en el centro de la pantalla.
// Si "ok" es true, se muestra el contenido del componente AuthRoute.
// El contenido incluye un contenedor fluido que envuelve a los elementos hijos.

export default AuthRoute;
