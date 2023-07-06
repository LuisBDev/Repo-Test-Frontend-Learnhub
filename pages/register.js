import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { state: { user } } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
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
