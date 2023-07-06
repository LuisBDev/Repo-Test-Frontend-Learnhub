import { useReducer, createContext, useEffect, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/router";


// estado inicial
const initialState = {
    user: null,
};

// crear contexto
const Context = createContext();

// reducer principal
const rootReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null };
        default:
            return state;
    }
};

// proveedor de contexto
const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);

    // router
    const router = useRouter();

    useEffect(() => {
        dispatch({
            type: "LOGIN",
            payload: JSON.parse(window.localStorage.getItem("user")),
        });
    }, []);

    axios.interceptors.response.use(
        function (response) {
            // cualquier código de estado que esté dentro del rango 2XX activará esta función
            return response;
        },
        function (error) {
            // cualquier código de estado que esté fuera del rango 2XX activará esta función
            let res = error.response;
            if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
                return new Promise((resolve, reject) => {
                    axios
                        .get("/api/logout")
                        .then((data) => {
                            console.log("/401 error > logout");
                            dispatch({ type: "LOGOUT" });
                            window.localStorage.removeItem("user");
                            router.push("/login");
                        })
                        .catch((err) => {
                            console.log("AXIOS INTERCEPTORS ERR", err);
                            reject(error);
                        });
                });
            }
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        const getCsrfToken = async () => {
            const { data } = await axios.get("/api/csrf-token");
            axios.defaults.headers["X-CSRF-Token"] = data.getCsrfToken;
        };
        getCsrfToken();
    }, []);

    return useMemo(() => (
        <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
    ), [state, dispatch, children]);

};

export { Context, Provider };
