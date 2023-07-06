// Importamos el componente TopNav desde la ruta "../components/TopNav"
import TopNav from "../components/TopNav";

// Importamos los estilos CSS de Bootstrap desde "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/css/bootstrap.min.css";

// Importamos los estilos CSS de Ant Design desde "antd/dist/antd.css"
import "antd/dist/antd.css";

// Importamos los estilos CSS personalizados desde "../public/css/styles.css"
import "../public/css/styles.css";

// Importamos el componente ToastContainer desde "react-toastify"
import { ToastContainer } from "react-toastify";

// Importamos los estilos CSS de Toastify desde "react-toastify/dist/ReactToastify.css"
import "react-toastify/dist/ReactToastify.css";

// Importamos el componente Provider desde "../context"
import { Provider } from "../context";


function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer position="top-center" />
      <TopNav />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
