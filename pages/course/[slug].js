
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

export default SingleCourse;
