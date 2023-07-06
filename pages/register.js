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

export default Register;
