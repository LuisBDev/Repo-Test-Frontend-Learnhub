import { useState, useEffect, useContext } from "react";  // Importación de hooks desde React
import { Menu } from "antd";  // Importación del componente Menu desde la librería Ant Design
import Link from "next/link";  // Importación del componente Link desde la librería Next.js
import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  UserAddOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from "@ant-design/icons";  // Importación de iconos desde la librería Ant Design
import { Context } from "../context";  // Importación del contexto desde el archivo "../context"
import axios from "axios";  // Importación de la librería Axios para hacer solicitudes HTTP
import { useRouter } from "next/router";  // Importación del hook useRouter desde la librería Next.js
import { toast } from "react-toastify";  // Importación del componente toast desde la librería react-toastify


// Importamos las dependencias necesarias para trabajar con el componente Menu
const { Item, SubMenu, ItemGroup } = Menu;

// Aquí estamos utilizando la desestructuración para asignar las variables Item, SubMenu y ItemGroup
// a las correspondientes importaciones del módulo Menu

// El componente Menu se utiliza para construir menús y barras de navegación en aplicaciones web.
// La desestructuración nos permite acceder directamente a los componentes individuales del módulo
// sin tener que utilizar la sintaxis de objeto completa cada vez que los queramos utilizar.

// Item representa un elemento individual en el menú, como un enlace o un botón.
// SubMenu representa un submenú que puede contener otros elementos de menú.
// ItemGroup es un grupo de elementos de menú relacionados que se pueden mostrar juntos.

// A partir de aquí, puedes utilizar las variables Item, SubMenu y ItemGroup en tu código
// para construir y personalizar el menú de acuerdo a tus necesidades.
const TopNav = () => {
  const [current, setCurrent] = useState(""); // Estado local "current" con su setter "setCurrent"

  const { state, dispatch } = useContext(Context); // Desestructuración de "state" y "dispatch" del contexto

  const { user } = state; // Desestructuración del objeto "user" del estado

  const router = useRouter(); // Inicialización del enrutador


  useEffect(() => {
    // El useEffect se ejecutará cuando el componente se monte y cada vez que las dependencias cambien.

    // Verificamos si estamos en el navegador antes de acceder a window.location.pathname.
    // Esto es importante para evitar errores durante la renderización del lado del servidor (SSR).
    // process.browser es una forma común de verificar si estamos en el navegador o en el servidor.
    process.browser && setCurrent(window.location.pathname);

    // La dependencia para este useEffect es una expresión lógica.
    // La expresión process.browser && window.location.pathname se evaluará para true o false.
    // Si la expresión es true, useEffect se ejecutará cada vez que window.location.pathname cambie.
    // Si la expresión es false, useEffect se ejecutará solo una vez, en el montaje inicial del componente.
  }, [process.browser && window.location.pathname]);


  const logout = async () => {
    dispatch({ type: "LOGOUT" }); // Despacha una acción para realizar el logout del usuario
    window.localStorage.removeItem("user"); // Elimina el usuario del almacenamiento local

    try {
      const { data } = await axios.get("/api/logout"); // Realiza una solicitud GET a la ruta "/api/logout" para realizar el logout en el servidor
      toast(data.message); // Muestra un mensaje de éxito utilizando una librería de notificaciones (por ejemplo, toast)
      await router.push("/login"); // Redirecciona al usuario a la página de inicio de sesión utilizando la instancia del enrutador (por ejemplo, react-router)
    } catch (error) {
      // Manejar el error de la redirección
      console.error("Error al redirigir a la página de inicio de sesión:", error);
      // Realizar acciones adicionales o mostrar un mensaje de error al usuario
    }
  };


  return (
    <Menu mode="horizontal" selectedKeys={[current]} className="mb-2" theme="dark"> {/* Creación de un componente de menú horizontal */}
      <Item
        key="/"  //* Definición de una clave para el elemento del menú 
        onClick={(e) => setCurrent(e.key)}  // Asignación de una función onClick para manejar el evento de clic 
        icon={<AppstoreOutlined />}  // Renderización de un icono dentro del elemento del menú
      >
        <Link href="/">  {/* Creación de un enlace usando la biblioteca Link */}
          <a>App</a>  {/* Texto que se mostrará como el enlace */}
        </Link>
      </Item>

      {user?.role?.includes("Instructor") ? (
        <Item
          key="/instructor/course/create" // Clave única para identificar este elemento del menú
          onClick={(e) => setCurrent(e.key)} // Manejador de evento para actualizar el elemento actual cuando se hace clic
          icon={<CarryOutOutlined />} // Ícono que se muestra junto al elemento del menú
        >
          <Link href="/instructor/course/create"> {/* Enlace que redirige al usuario cuando se hace clic en el elemento del menú*/}
            <a>Crear Curso</a> {/* Texto que se muestra como etiqueta para el enlace*/}
          </Link>
        </Item>

      ) : (
        <Item // Componente de menú
          key="/user/become-instructor" // Clave única para identificar el elemento
          onClick={(e) => setCurrent(e.key)} // Evento al hacer clic que establece la clave actual
          icon={<TeamOutlined />} // Icono del elemento
        >
          <Link href="/user/become-instructor"> {/* Enlace que lleva a la página de "convertirse en instructor" */}
            <a>Conviértete en Instructor</a> {/* Texto del enlace visible para el usuario */}
          </Link>
        </Item>
      )}

      {user === null && (
        <>
          <Item // Componente del elemento del menú
            className="float-right" // Clase CSS para posicionarlo a la derecha
            key="/register" // Clave única para este elemento
            onClick={(e) => setCurrent(e.key)} // Manejador de eventos para el clic, establece el elemento actual
            icon={<UserAddOutlined />} // Ícono del elemento, utilizado desde UserAddOutlined
          >
            <Link href="/register"> {/* Enlace que envuelve al texto "Register" */}
              <a>Register</a> {/* Texto visible del enlace */}
            </Link>
          </Item>

          <Item
            className="float-right" // Clase CSS para posicionar a la derecha
            key="/login" // Clave única para identificar el elemento
            onClick={(e) => setCurrent(e.key)} // Función que se ejecuta cuando se hace clic en el elemento
            icon={<LoginOutlined />} // Icono que se muestra junto al texto del elemento
          >
            <Link href="/login"> {/* Componente de enlace que redirige a la página /login */}
              <a>Login</a> {/* Texto que se muestra como enlace */}
            </Link>
          </Item>
        </>
      )}

      {user !== null && (
        <SubMenu
          icon={<CoffeeOutlined />} // Icono del submenú
          title={user?.name} // Título del submenú que muestra el nombre del usuario
          className="float-right" // Clase CSS para flotar a la derecha
        >
          <ItemGroup> {/* Grupo de elementos del submenú */}
            <Item key="/user"> {/* Elemento del submenú con clave "/user" */}
              <Link href="/user"> {/* Enlace que redirige a "/user" */}
                <a>Dashboard</a> {/* Texto que se muestra como enlace */}
              </Link>
            </Item>
            <Item onClick={() => logout()} key="logout"> {/* Elemento del submenú con clave "logout" que ejecuta la función "logout" al hacer clic */}
              Logout {/* Texto que se muestra como elemento del submenú */}
            </Item>
          </ItemGroup>
        </SubMenu>
      )}


      {/*
   Esta sección del código verifica si el objeto 'user' existe y si tiene una propiedad 'role'.
   Si ambas condiciones son verdaderas y si el valor de 'role' incluye la cadena "Instructor",
   se renderiza el componente <Item>.
*/}
      {user?.role?.includes("Instructor") && (
        <Item
          key="/instructor"
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
          className="float-right"
        >
          {/*
         Este componente <Item> representa un elemento de menú o enlace.
         Cuando se hace clic en este elemento, se invoca la función 'setCurrent' con el valor de 'key' como argumento.
         El icono <TeamOutlined /> se muestra junto al texto del enlace.
         También se agrega la clase "float-right" al componente <Item>.
      */}
          <Link href="/instructor">
            <a>Instructor</a>
          </Link>
        </Item>
      )}

    </Menu>
  );
};

export default TopNav;
