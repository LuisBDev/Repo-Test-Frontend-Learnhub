import AuthRoute from "./AuthRoute";
import UserNav from "../nav/UserNav";

const UserRoute = ({ children, showNav = true }) => {
    return (
        <AuthRoute showNav={showNav}>
            <div className="row">
                <div className="col-md-2">{showNav && <UserNav />}</div>
                <div className="col-md-10">{children}</div>
            </div>
        </AuthRoute>
    );
};



// Definiendo la función fetchInstructor para obtener la información del instructor actual desde la API.
// Si la solicitud es exitosa y data.ok es true, se establece el estado "ok" en true.
// Si hay algún error, se muestra en la consola y se redirige al usuario a la página de inicio.

// Renderizando el contenido del componente InstructorRoute.
// Si "ok" es false, se muestra un icono de sincronización giratorio en el centro de la pantalla.
// Si "ok" es true, se muestra el contenido del componente InstructorRoute.
// El contenido incluye un contenedor fluido que envuelve a dos columnas.
// En la primera columna (col-md-2), se muestra el componente InstructorNav.
// En la segunda columna (col-md-10), se renderizan los elementos hijos del componente InstructorRoute.

export default UserRoute;
