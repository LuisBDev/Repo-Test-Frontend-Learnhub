import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

// Función reutilizable para los elementos de formulario
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

const LoginForm = ({ handleSubmit, email, setEmail, password, setPassword, loading }) => (


    <form onSubmit={handleSubmit}>
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
            disabled={!email || !password || loading}
        >
            {loading ? <SyncOutlined spin /> : "Enviar"}
        </button>
    </form>
);

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // State
    const { state: { user }, dispatch } = useContext(Context);

    // Router
    const router = useRouter();

    useEffect(() => {
        if (user !== null) router.push("/");
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const { data } = await axios.post(`/api/login`, {
                email,
                password,
            });

            dispatch({
                type: "LOGIN",
                payload: data,
            });

            // Guardar en el almacenamiento local
            window.localStorage.setItem("user", JSON.stringify(data));

            // Redireccionar
            router.push("/user");
        } catch (err) {
            toast(err.response.data);
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="jumbotron text-center bg-primary square">Iniciar sesión</h1>

            <div className="container col-md-4 offset-md-4 pb-5">
                <LoginForm
                    handleSubmit={handleSubmit}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    loading={loading}
                />

                <p className="text-center pt-3">
                    ¿Todavía no estás registrado?{" "}
                    <Link href="/register">
                        <a>Registrarse</a>
                    </Link>
                </p>

                <p className="text-center">
                    <Link href="/forgot-password">
                        <a className="text-danger">¿Olvidaste tu contraseña?</a>
                    </Link>
                </p>
            </div>
        </>
    );
};

export default Login;
