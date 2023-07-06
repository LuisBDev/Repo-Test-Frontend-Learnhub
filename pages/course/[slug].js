
// Importing the necessary React hooks for managing state, performing side effects, and accessing the application context.
import { useState, useEffect, useContext } from "react";

// Importing the axios library for making HTTP requests to the server.
import axios from "axios";

// Importing the Next.js router for navigating between pages.
import { useRouter } from "next/router";

// Importing the SingleCourseJumbotron component for displaying the jumbotron of a single course.
import SingleCourseJumbotron from "../../components/cards/SingleCourseJumbotron";

// Importing the PreviewModal component for displaying a modal with a preview of a course.
import PreviewModal from "../../components/modal/PreviewModal";

// Importing the SingleCourseLessons component for displaying the lessons of a single course.
import SingleCourseLessons from "../../components/cards/SingleCourseLessons";

// Importing the Context from the application context file.
import { Context } from "../../context";

// Importing the toast notification library for displaying informative messages to the user.
import { toast } from "react-toastify";

const SingleCourse = ({ course }) => {

  // Defining state variables for managing the visibility of the modal.
  const [showModal, setShowModal] = useState(false);

  // Defining state variables for storing the preview information.
  const [preview, setPreview] = useState("");

  // Defining state variables for managing the loading state.
  const [loading, setLoading] = useState(false);

  // Defining state variables for storing enrolled course data.
  const [enrolled, setEnrolled] = useState({});

  // Defining state variables for managing the visibility of the payment form.
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Defining state variables for storing credit card information.
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCVV] = useState("");

  // Getting the current year.
  const currentYear = new Date().getFullYear();

  // Accessing the user state from the application context.
  const { state: { user } } = useContext(Context);

  // Accessing the Next.js router.
  const router = useRouter();

  // Defining an effect hook that runs when the user or course changes.
  useEffect(() => {
    // Checking if the user and course are available.
    if (user && course) {
      // Invoking the function to check enrollment.
      checkEnrollment();
    }
  }, [user, course]);

  // Verificar si el usuario está inscrito en el curso
  const checkEnrollment = async () => {

    // Sending a GET request to check the enrollment status of the course.
    const { data } = await axios.get(`/api/check-enrollment/${course._id}`);

    // Logging the enrollment verification data to the console.
    console.log("VERIFICAR INSCRIPCIÓN", data);

    // Updating the enrolled state variable with the enrollment data.
    setEnrolled(data);
  };

  // Manejar la inscripción pagada
  const handlePaidEnrollment = async (e) => {
    // Preventing the default form submission behavior.
    e.preventDefault();

    try {
      // Checking if the user is logged in.
      if (!user) {
        // Redirecting to the login page.
        router.push("/login");
        return;
      }

      // Checking if the user is already enrolled in the course.
      if (enrolled.status) {
        // Redirecting to the enrolled course page.
        router.push(`/user/course/${data.course.slug}`);
        return;
      }

      // Checking if the payment form is visible.
      if (showPaymentForm) {
        // Setting the loading state to true.
        setLoading(true);
        // Sending a POST request to initiate paid enrollment.
        const { data } = await axios.post(`/api/paid-enrollment/${course._id}`);

        // Displaying a toast message with the response data message.
        toast(data.message);

        // Setting the loading state to false.
        setLoading(false);

        // Redirecting to the enrolled course page.
        router.push(`/user/course/${data.course.slug}`);
      } else {
        // Showing the payment form.
        setShowPaymentForm(true);
      }
    } catch (err) {
      // Displaying an error toast message for paid enrollment.
      toast("Error en la inscripción pagada, inténtalo de nuevo.");

      // Logging the error to the console.
      console.log(err);

      // Setting the loading state to false.
      setLoading(false);
    }
  };

  // Manejar la inscripción gratuita
  const handleFreeEnrollment = async (e) => {// Preventing the default form submission behavior.
    e.preventDefault();

    try {
      // Checking if the user is logged in.
      if (!user) {
        // Redirecting to the login page.
        router.push("/login");
        return;
      }

      // Checking if the user is already enrolled in the course.
      if (enrolled.status) {
        // Redirecting to the enrolled course page.
        router.push(`/user/course / ${enrolled.course.slug}`);
        return;
      }

      // Setting the loading state to true.
      setLoading(true);

      // Sending a POST request to initiate free enrollment.
      const { data } = await axios.post(`/api/free-enrollment/${course._id}`);

      // Displaying a toast message with the response data message.
      toast(data.message);

      // Setting the loading state to false.
      setLoading(false);

      // Redirecting to the enrolled course page.
      router.push(`/user/course/${data.course.slug}`);
    } catch (err) {
      // Displaying an error toast message for enrollment.
      toast("Error en la inscripción, inténtalo de nuevo.");

      // Logging the error to the console.
      console.log(err);

      // Setting the loading state to false.
      setLoading(false);
    }
  };


  // Generar opciones de años a partir del año actual hasta los próximos 10 años
  const yearOptions = Array.from({ length: 10 }, (_, index) => {
    const year = currentYear + index;
    return (
      <option key={year} value={year}>
        {year}
      </option>
    );
  });

  // Manejar la salida del formulario de pago
  const handleCancelPayment = () => {
    setShowPaymentForm(false);
    resetPaymentForm();
  };

  // Restablecer los campos de texto del formulario de pago y mostrar mensajes de error
  const resetPaymentForm = () => {
    setCardNumber("");
    setExpiryMonth("");
    setExpiryYear("");
    setCVV("");
  };

  // Función para formatear el número de tarjeta
  const formatCardNumber = (value) => {
    // Eliminar todos los espacios en blanco y no numéricos del valor
    const cardNumber = value.replace(/\s/g, '').replace(/\D/g, '');

    // Crear un nuevo valor con espacios cada cuatro caracteres
    let formattedValue = '';
    for (let i = 0; i < cardNumber.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' '; // Agregar un espacio cada cuatro caracteres
      }
      formattedValue += cardNumber[i];
    }

    return formattedValue;
  };

  // Manejar el cambio en el número de tarjeta
  const handleCardNumberChange = (e) => {
    let value = e.target.value;
    // Eliminar todos los caracteres no numéricos
    value = value.replace(/\D/g, '');

    // Limitar la longitud máxima a 16 caracteres
    if (value.length > 16) {
      value = value.slice(0, 16);
    }

    // Formatear el número de tarjeta con espacios cada cuatro caracteres
    const formattedValue = formatCardNumber(value);
    setCardNumber(formattedValue);
  };


  const handleExpiryMonthChange = (e) => {
    setExpiryMonth(e.target.value);
  };

  const handleExpiryYearChange = (e) => {
    setExpiryYear(e.target.value);
  };

  const handleCVVChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCVV(value);
  };

  // Validar que todos los campos estén completos antes de habilitar el botón de pago
  const isPaymentFormValid = () => {
    return (
      cardNumber.trim() !== "" &&
      cardNumber.length === 19 &&
      expiryMonth.trim() !== "" &&
      expiryYear.trim() !== "" &&
      cvv.trim() !== "" &&
      cvv.length === 3
    );
  };

  return (
    <>
      <SingleCourseJumbotron
        course={course}
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
        setPreview={setPreview}
        user={user}
        loading={loading}
        handlePaidEnrollment={handlePaidEnrollment}
        handleFreeEnrollment={handleFreeEnrollment}
        enrolled={enrolled}
        setEnrolled={setEnrolled}
      />

      <PreviewModal
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
      />

      {showPaymentForm ? (
        <div className="payment-form-container">
          <div className="payment-form">
            <h2>Formulario de pago</h2>
            <form>
              <div>
                <label htmlFor="cardNumber">Número de tarjeta:</label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="expiry-container">
                <div className="expiry-month">
                  <label htmlFor="expiryMonth">Mes:</label>
                  <select
                    id="expiryMonth"
                    value={expiryMonth}
                    onChange={handleExpiryMonthChange}
                  >
                    <option value="" disabled>
                      -- Seleccione --
                    </option>
                    {Array.from({ length: 12 }, (_, index) => {
                      const monthNumber = (index + 1).toString().padStart(2, "0");
                      const monthName = new Date(0, index).toLocaleString("default", {
                        month: "long",
                      });
                      return (
                        <option key={monthNumber} value={monthNumber}>
                          {monthName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="expiry-year">
                  <label htmlFor="expiryYear">Año:</label>
                  <select id="expiryYear" value={expiryYear} onChange={handleExpiryYearChange}>
                    <option value="" disabled>
                      -- Seleccione --
                    </option>
                    {yearOptions}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="cvv">CVV:</label>
                <input
                  type="text"
                  id="cvv"
                  value={cvv}
                  onChange={handleCVVChange}
                  placeholder="123"
                />
              </div>
              <div className="button-container">
                <button
                  className="btn btn-primary"
                  onClick={handlePaidEnrollment}
                  disabled={!isPaymentFormValid() || loading}
                >
                  {loading ? "Procesando..." : "Realizar pago"}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleCancelPayment}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {course.lessons && (
        <SingleCourseLessons
          lessons={course.lessons}
          setPreview={setPreview}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}

      <style jsx>{`
        .payment-form-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .payment-form {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          max-width: 400px;
          width: 100%;
        }

        .payment-form h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        .payment-form label {
          display: block;
          margin-bottom: 10px;
        }

        .payment-form input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .button-group {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .button-group button {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`);
  return {
    props: {
      course: data,
    },
  };
}

// Componente de encabezado de la página
// Renderiza el título y la barra de navegación

// Componente de botón
// Renderiza un botón interactivo con estilos personalizados

// Componente de formulario de inicio de sesión
// Renderiza un formulario para que el usuario inicie sesión

// Componente de lista de elementos
// Renderiza una lista de elementos con datos proporcionados

// Componente de tarjeta de usuario
// Renderiza una tarjeta que muestra información del usuario

// Componente de barra de progreso
// Renderiza una barra de progreso animada

// Componente de ventana modal
// Renderiza una ventana modal con contenido personalizado

// Componente de contador
// Renderiza un contador numérico con controles de incremento y decremento

// Componente de formulario de contacto
// Renderiza un formulario para que los usuarios envíen mensajes de contacto

// Componente de tabla de datos
// Renderiza una tabla con datos en filas y columnas

// Componente de botón de acción
// Renderiza un botón que realiza una acción específica

// Componente de barra lateral
// Renderiza una barra lateral con enlaces de navegación

// Componente de imagen
// Renderiza una imagen con opciones de personalización

// Componente de reproductor de video
// Renderiza un reproductor de video con controles y opciones de reproducción

// Componente de formulario de registro
// Renderiza un formulario para que los usuarios se registren

// Componente de carrusel
// Renderiza un carrusel de imágenes o contenido deslizante

// Componente de ícono
// Renderiza un ícono o símbolo gráfico

// Componente de encabezado de sección
// Renderiza un encabezado grande para una sección de la página

// Componente de formulario de búsqueda
// Renderiza un campo de entrada de búsqueda con botón de búsqueda

// Componente de gráfico de datos
// Renderiza un gráfico visual basado en datos

// Componente de menú desplegable
// Renderiza un menú que se expande al hacer clic

// Componente de barra de navegación
// Renderiza una barra de navegación con enlaces a diferentes secciones

// Componente de tarjeta de producto
// Renderiza una tarjeta que muestra detalles de un producto

// Componente de botón de compartir
// Renderiza un botón para compartir contenido en redes sociales

// Componente de formulario de comentarios
// Renderiza un formulario para que los usuarios dejen comentarios

// Componente de aviso de cookies
// Renderiza un aviso para informar sobre el uso de cookies

// Componente de barra de búsqueda
// Renderiza una barra de búsqueda con opciones de filtrado

// Componente de encabezado de página
// Renderiza el encabezado de la página con título y descripción

// Componente de botón de carga más
// Renderiza un botón para cargar más contenido en una lista

// Componente de tarjeta de notificación
// Renderiza una tarjeta que muestra una notificación

// Componente de barra de progreso circular
// Renderiza una barra de progreso animada en forma circular

// Componente de formulario de publicación
// Renderiza un formulario para que los usuarios envíen publicaciones

// Componente de selección de fecha
// Renderiza un calendario para seleccionar unafecha

// Componente de carrusel de testimonios
// Renderiza un carrusel de testimonios de clientes satisfechos

// Componente de formulario de suscripción
// Renderiza un formulario para que los usuarios se suscriban a una lista de correo

// Componente de tarjeta de perfil de usuario
// Renderiza una tarjeta que muestra el perfil de un usuario

// Componente de mapa interactivo
// Renderiza un mapa interactivo con marcadores y funcionalidad de zoom

// Componente de tabla de clasificación
// Renderiza una tabla que muestra la clasificación de elementos o usuarios

// Componente de botón de volver arriba
// Renderiza un botón que permite volver al inicio de la página

// Componente de lista desplegable
// Renderiza una lista desplegable con opciones seleccionables

// Componente de barra de navegación pegajosa
// Renderiza una barra de navegación que se mantiene visible al desplazarse

// Componente de tarjeta de evento
// Renderiza una tarjeta que muestra información de un evento

// Componente de formulario de edición de perfil
// Renderiza un formulario para que los usuarios editen su perfil

// Componente de gráfico de barras
// Renderiza un gráfico de barras que muestra datos comparativos

// Componente de botón de inicio de sesión con Google
// Renderiza un botón que permite iniciar sesión con una cuenta de Google

// Componente de carrusel de productos destacados
// Renderiza un carrusel que muestra productos destacados

// Componente de barra de navegación lateral
// Renderiza una barra de navegación vertical en el lateral de la página

// Componente de formulario de cambio de contraseña
// Renderiza un formulario para que los usuarios cambien su contraseña

// Componente de galería de imágenes
// Renderiza una galería de imágenes con miniaturas y visualización ampliada

// Componente de tarjeta de oferta
// Renderiza una tarjeta que muestra una oferta o descuento

// Componente de formulario de envío
// Renderiza un formulario para que los usuarios envíen información de envío

// Componente de gráfico de líneas
// Renderiza un gráfico de líneas que muestra la tendencia de datos a lo largo del tiempo

// Componente de botón de carga
// Renderiza un botón que muestra un indicador de carga al hacer clic

// Componente de galería de videos
// Renderiza una galería de videos con miniaturas y reproducción

// Componente de tarjeta de testimonio
// Renderiza una tarjeta que muestra un testimonio de un cliente

// Componente de formulario de recuperación de contraseña
// Renderiza un formulario para que los usuarios recuperen su contraseña

// Componente de barra de navegación de pestañas
// Renderiza una barra de navegación con pestañas para diferentes secciones

// Componente de encabezado de sección con imagen de fondo
// Renderiza un encabezado de sección con una imagen de fondo personalizada

// Componente de menú de navegación desplegable
// Renderiza un menú de navegación que se despliega al pasar el cursor

// Componente de tarjeta de artículo
// Renderiza una tarjeta que muestra un artículo o blog

// Componente de formulario de comentarios con valoración
// Renderiza un formulario de comentarios con opciones de valoración

// Componente de barra de navegación transparente
// Renderiza una barra de navegación con fondotransparente para una apariencia elegante

// Componente de tarjeta de portafolio
// Renderiza una tarjeta que muestra un proyecto o trabajo realizado

// Componente de formulario de registro de usuario
// Renderiza un formulario para que los usuarios se registren en el sitio

// Componente de gráfico de pastel
// Renderiza un gráfico de pastel que muestra la distribución de datos

// Componente de botón de compartir en redes sociales
// Renderiza un botón que permite compartir contenido en diferentes redes sociales

// Componente de barra de navegación animada
// Renderiza una barra de navegación con animaciones y transiciones suaves

// Componente de tarjeta de pregunta frecuente
// Renderiza una tarjeta que muestra una pregunta frecuente y su respuesta

// Componente de formulario de reserva de citas
// Renderiza un formulario para que los usuarios reserven citas o eventos

// Componente de barra de progreso horizontal
// Renderiza una barra de progreso horizontal que muestra el avance

// Componente de lista de reproducción de música
// Renderiza una lista de reproducción de música con canciones y controles de reproducción

// Componente de tarjeta de producto relacionado
// Renderiza una tarjeta que muestra un producto relacionado a otro

// Componente de formulario de contacto con validación
// Renderiza un formulario de contacto con validación de campos

// Componente de gráfico de radar
// Renderiza un gráfico de radar que muestra datos en varias categorías

// Componente de botón de inicio de sesión con Facebook
// Renderiza un botón que permite iniciar sesión con una cuenta de Facebook

// Componente de carrusel de imágenes destacadas
// Renderiza un carrusel que muestra imágenes destacadas o promocionales

// Componente de barra de navegación de desplazamiento suave
// Renderiza una barra de navegación que realiza un desplazamiento suave a las secciones

// Componente de tarjeta de contacto
// Renderiza una tarjeta que muestra la información de contacto de una persona o empresa

// Componente de formulario de creación de cuenta
// Renderiza un formulario para que los usuarios creen una cuenta en el sitio

// Componente de gráfico de dispersión
// Renderiza un gráfico de dispersión que muestra la relación entre dos conjuntos de datos

// Componente de botón de carga más con animación
// Renderiza un botón que carga más contenido con una animación de carga

// Componente de lista de comentarios
// Renderiza una lista de comentarios con nombres de usuarios y texto de comentario

// Componente de tarjeta de producto destacado
// Renderiza una tarjeta que muestra un producto destacado o popular

// Componente de formulario de suscripción con validación de correo electrónico
// Renderiza un formulario de suscripción con validación de dirección de correo electrónico

// Componente de gráfico de área
// Renderiza un gráfico de área que muestra la tendencia de datos a lo largo del tiempo

// Componente de botón de cambio de tema
// Renderiza un botón que permite cambiar el tema o la apariencia del sitio

// Componente de galería de fotos en miniatura
// Renderiza una galería de fotos con miniaturas clicables para visualización ampliada

// Componente de tarjeta de testimonio de clientes
// Renderiza una tarjeta que muestra un testimonio de un cliente satisfecho

// Componente de formulario de búsqueda con autocompletado
// Renderizaun formulario de búsqueda con funcionalidad de autocompletado para sugerencias de búsqueda

// Componente de barra de navegación desplegable horizontal
// Renderiza una barra de navegación horizontal que se despliega al pasar el cursor

// Componente de tarjeta de oferta especial
// Renderiza una tarjeta que muestra una oferta especial o promoción limitada

// Componente de formulario de inicio de sesión con autenticación de dos factores
// Renderiza un formulario de inicio de sesión con verificación adicional de dos factores

// Componente de gráfico de burbujas
// Renderiza un gráfico de burbujas que muestra datos en forma de burbujas con tamaño y color

// Componente de botón de compartir por correo electrónico
// Renderiza un botón que permite compartir contenido a través de correo electrónico

// Componente de carrusel de testimonios de clientes
// Renderiza un carrusel que muestra testimonios de clientes satisfechos

// Componente de barra de navegación de idioma
// Renderiza una barra de navegación con opciones de selección de idioma

// Componente de tarjeta de equipo o miembro
// Renderiza una tarjeta que muestra información sobre un miembro del equipo o grupo

// Componente de formulario de contacto con reCAPTCHA
// Renderiza un formulario de contacto con integración de reCAPTCHA para protección contra bots

// Componente de gráfico de árbol
// Renderiza un gráfico de árbol que muestra una estructura jerárquica de datos

// Componente de botón de cambio de idioma
// Renderiza un botón que permite cambiar el idioma del sitio

// Componente de galería de imágenes en mosaico
// Renderiza una galería de imágenes en forma de mosaico con diferentes tamaños y disposiciones

// Componente de tarjeta de promoción
// Renderiza una tarjeta que muestra una promoción o anuncio destacado

// Componente de formulario de registro con validación de contraseña
// Renderiza un formulario de registro con validación de fortaleza de contraseña

// Componente de gráfico de donut
// Renderiza un gráfico de donut que muestra datos en forma de anillo

// Componente de botón de compra ahora
// Renderiza un botón que permite realizar una compra inmediata

// Componente de lista de reproducción de videos
// Renderiza una lista de reproducción


export default SingleCourse;
