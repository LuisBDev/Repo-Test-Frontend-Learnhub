import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import InstructorNav from "../nav/InstructorNav";
// Importando los hooks useEffect y useState de React.

// Importando el módulo axios para realizar solicitudes HTTP.

// Importando el módulo useRouter de la biblioteca Next.js para obtener información sobre la ruta actual.

// Importando el componente SyncOutlined de la biblioteca "@ant-design/icons" para mostrar un icono de sincronización.

// Importando el componente InstructorNav desde la ruta "../nav/InstructorNav".

// Definiendo el componente InstructorRoute.

// Definiendo el estado "ok" usando useState para verificar si el instructor está autenticado.

// Obteniendo el objeto router usando el hook useRouter.

// Utilizando useEffect para llamar a la función fetchInstructor cuando se carga el componente.

// Definiendo la función fetchInstructor para obtener la información del instructor actual desde la API.
// Si la solicitud es exitosa y data.ok es true, se establece el estado "ok" en true.
// Si hay algún error, se muestra en la consola y se redirige al usuario a la página de inicio.

// Renderizando el contenido del componente InstructorRoute.
// Si "ok" es false, se muestra un icono de sincronización giratorio en el centro de la pantalla.
// Si "ok" es true, se muestra el contenido del componente InstructorRoute.
// El contenido incluye un contenedor fluido que envuelve a dos columnas.
// En la primera columna (col-md-2), se muestra el componente InstructorNav.
// En la segunda columna (col-md-10), se renderizan los elementos hijos del componente InstructorRoute.

// Exportando el componente InstructorRoute.
const InstructorRoute = ({ children }) => {
    // state
    const [ok, setOk] = useState(false);
    // router
    const router = useRouter();

    useEffect(() => {
        fetchInstructor();
    }, []);

    const fetchInstructor = async () => {
        try {
            const { data } = await axios.get("/api/current-instructor");
            console.log("RUTA DEL INSTRUCTOR => ", data);
            if (data.ok) setOk(true);
        } catch (err) {
            console.log(err);
            setOk(false);
            router.push("/");
        }
    };

    // Definiendo el estado "ok" usando useState para verificar si el instructor está autenticado.

    // Obteniendo el objeto router usando el hook useRouter.

    // Utilizando useEffect para llamar a la función fetchInstructor cuando se carga el componente.

    // Definiendo la función fetchInstructor para obtener la información del instructor actual desde la API.
    // Si la solicitud es exitosa y data.ok es true, se establece el estado "ok" en true.
    // Si hay algún error, se muestra en la consola y se redirige al usuario a la página de inicio.


    return (
        <>
            {!ok ? (
                <SyncOutlined
                    spin
                    className="d-flex justify-content-center display-1 text-primary p-5"
                />
            ) : (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2">
                            <InstructorNav />
                        </div>
                        <div className="col-md-10">{children}</div>
                    </div>
                </div>
            )}
        </>
    );
};




// Utilizando useEffect para llamar a la función fetchInstructor cuando se carga el componente.

// Definiendo la función fetchInstructor para obtener la información del instructor actual desde la API.
// Si la solicitud es exitosa y data.ok es true, se establece el estado "ok" en true.
// Si hay algún error, se muestra en la consola y se redirige al usuario a la página de inicio.

// Renderizando el contenido del componente InstructorRoute.
// Si "ok" es false, se muestra un icono de sincronización giratorio en el centro de la pantalla.
// Si "ok" es true, se muestra el contenido del componente InstructorRoute.

export default InstructorRoute;
