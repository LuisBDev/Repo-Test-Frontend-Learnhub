// Importamos el hook useEffect de la librería "react"
import { useEffect } from "react";

// Importamos el componente "toast" de la librería "react-toastify"
import { toast } from "react-toastify";

// Definición del componente ForgotPassword
const ForgotPassword = () => {

    // Hook useEffect se utiliza para realizar efectos secundarios en componentes funcionales
    useEffect(() => {
        // Se muestra un mensaje de notificación utilizando la librería react-toastify
        toast("Modulo en construccion");
    }, []); // El segundo parámetro [] indica que este efecto solo se ejecuta una vez al montar el componente

    // Se devuelve un elemento de título con el mensaje "Modulo en construccion"
    return <h3>Modulo en construccion</h3>;
};

// Se exporta el componente ForgotPassword como el valor por defecto
export default ForgotPassword;
