// Importar las funciones y componentes necesarios desde las bibliotecas
// useReducer es un hook de React que permite gestionar el estado de un componente utilizando un patrón de diseño reducir (reducer)
// createContext es una función de React que crea un contexto para compartir datos entre componentes
// useEffect es un hook de React que permite realizar efectos secundarios en el componente, como solicitar datos a un servidor
// useMemo es un hook de React que permite memoizar un valor computado para evitar cálculos innecesarios
import { useReducer, createContext, useEffect, useMemo } from "react";
// axios es una biblioteca popular de JavaScript para realizar solicitudes HTTP
import axios from "axios";
// useRouter es un hook de la biblioteca Next.js que proporciona acceso al objeto router para manejar la navegación
import { useRouter } from "next/router";

// estado inicial
const initialState = {
    user: null,
};

// crear contexto
const Context = createContext();

// reducer principal
// Definición del rootReducer, que es una función que recibe el estado y la acción
const rootReducer = (state, action) => {
    // Utilizamos una estructura de control switch para manejar diferentes casos según el tipo de acción
    switch (action.type) {
        // Caso "LOGIN": si la acción es de tipo "LOGIN", actualizamos el estado con la información del usuario
        case "LOGIN":
            // Utilizamos el operador spread (...) para copiar todas las propiedades del estado actual y luego sobrescribimos la propiedad "user" con el valor de la carga útil (action.payload)
            return { ...state, user: action.payload };
        // Caso "LOGOUT": si la acción es de tipo "LOGOUT", actualizamos el estado estableciendo la propiedad "user" en null para indicar que no hay usuario autenticado
        case "LOGOUT":
            return { ...state, user: null };
        // Caso por defecto: si la acción no coincide con ninguno de los casos anteriores, simplemente devolvemos el estado sin realizar cambios
        default:
            return state;
    }
};


// Declaración del componente principal o de exportación
const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    // Se utiliza el hook useReducer para gestionar el estado y las acciones.
    // El estado inicial se proporciona como segundo argumento.

    const router = useRouter();
    // Se utiliza el hook useRouter para acceder al enrutador del sistema de rutas.

    useEffect(() => {
        // useEffect se utiliza para ejecutar efectos secundarios en la aplicación.
        // En este caso, se ejecuta cuando el componente se monta.

        dispatch({
            type: "LOGIN",
            payload: JSON.parse(window.localStorage.getItem("user")),
        });
        // Se envía una acción al reducer para realizar un inicio de sesión.
        // El tipo de acción es "LOGIN" y el payload es el usuario obtenido del almacenamiento local.
        // Se utiliza JSON.parse para convertir el usuario almacenado en formato JSON a un objeto JavaScript.

    }, []);
    // El segundo argumento de useEffect es un arreglo vacío, lo que significa que el efecto se ejecutará solo una vez,
    // cuando el componente se monte por primera vez.


    axios.interceptors.response.use(
        function (response) {
            // cualquier código de estado que esté dentro del rango 2XX activará esta función
            return response;
        },
        function (error) {
            // Esta función se activará para cualquier código de estado que esté fuera del rango 2XX

            let res = error.response;

            if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
                // Si el código de estado es 401 y la configuración existe y no es una solicitud de reintentar, se ejecuta este bloque de código

                return new Promise((resolve, reject) => {
                    axios
                        .get("/api/logout")
                        .then((data) => {
                            console.log("/401 error > logout");
                            // Imprime en la consola el mensaje "/401 error > logout"

                            dispatch({ type: "LOGOUT" });
                            // Despacha una acción con el tipo "LOGOUT"

                            window.localStorage.removeItem("user");
                            // Elimina el elemento "user" del almacenamiento local

                            router.push("/login");
                            // Navega a la página "/login"
                        })
                        .catch((err) => {
                            console.log("AXIOS INTERCEPTORS ERR", err);
                            // Imprime en la consola el mensaje "AXIOS INTERCEPTORS ERR" junto con el error

                            reject(error);
                            // Rechaza la promesa con el error original
                        });
                });
            }

            return Promise.reject(error);
            // Rechaza la promesa con el error original
        }

    );

    useEffect(() => {
        // Definición de la función asíncrona para obtener el token CSRF
        const getCsrfToken = async () => {
            // Realizar una solicitud GET a "/api/csrf-token" utilizando axios
            const { data } = await axios.get("/api/csrf-token");
            // Establecer el token CSRF en los encabezados de las solicitudes futuras
            axios.defaults.headers["X-CSRF-Token"] = data.getCsrfToken;
        };
        // Llamar a la función getCsrfToken una vez, cuando el componente se monte
        // Pasar un arreglo vacío como segundo argumento para indicar que solo se debe ejecutar una vez
        getCsrfToken();
    }, []);


    return useMemo(() => (
        // useMemo se utiliza para memorizar el valor de retorno de una función y evitar cálculos innecesarios.
        // En este caso, se asegura de que el valor de retorno se memorice solo cuando cambien las dependencias.
        <Context.Provider value={{ state, dispatch }}>
            {/* El componente Provider del contexto se utiliza para proporcionar el valor del contexto a los componentes descendientes. */}
            {/* El valor proporcionado aquí es un objeto con las propiedades "state" y "dispatch". */}
            {/* Estas propiedades se extraen del ámbito y se pasan como valor del contexto. */}
            {children}
            {/* El prop children representa el contenido que se renderizará dentro del componente Provider. */}
            {/* Aquí, los componentes descendientes del componente Provider tendrán acceso al contexto proporcionado. */}
        </Context.Provider>
    ), [state, dispatch, children]);
    // Se define un array de dependencias que afectan al valor de retorno de useMemo.
    // Si cualquiera de estas dependencias cambia, useMemo ejecutará la función y actualizará el valor memorizado.
    // En este caso, el valor se actualizará cuando cambien las propiedades "state", "dispatch" o "children".


};

export { Context, Provider };
