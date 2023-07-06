// Importar el módulo currencyFormatter desde la ruta "../../utils/helpers"
import { currencyFormatter } from "../../utils/helpers";

// Importar los componentes Badge y Button desde la biblioteca "antd"
import { Badge, Button } from "antd";

// Importar el componente ReactPlayer
import ReactPlayer from "react-player";

// Importar los íconos LoadingOutlined y SafetyOutlined desde la biblioteca "@ant-design/icons"
import { LoadingOutlined, SafetyOutlined } from "@ant-design/icons";


const SingleCourseJumbotron = ({
    course,
    showModal,
    setShowModal,
    setPreview,
    loading,
    user,
    handlePaidEnrollment,
    handleFreeEnrollment,
    enrolled,
}) => {
    // Destructuración
    const {
        // Desestructuración de objeto para extraer la propiedad 'name'
        // y asignarla a la variable 'name'
        name,

        // Desestructuración de objeto para extraer la propiedad 'description'
        // y asignarla a la variable 'description'
        description,

        // Desestructuración de objeto para extraer la propiedad 'instructor'
        // y asignarla a la variable 'instructor'
        instructor,

        // Desestructuración de objeto para extraer la propiedad 'updatedAt'
        // y asignarla a la variable 'updatedAt'
        updatedAt,

        // Desestructuración de objeto para extraer la propiedad 'lessons'
        // y asignarla a la variable 'lessons'
        lessons,

        // Desestructuración de objeto para extraer la propiedad 'image'
        // y asignarla a la variable 'image'
        image,

        // Desestructuración de objeto para extraer la propiedad 'price'
        // y asignarla a la variable 'price'
        price,

        // Desestructuración de objeto para extraer la propiedad 'paid'
        // y asignarla a la variable 'paid'
        paid,

        // Desestructuración de objeto para extraer la propiedad 'category'
        // y asignarla a la variable 'category'
        category,
    } = course;


    // Texto del botón de inscripción
    let buttonText; // Variable para almacenar el texto del botón

    if (!user) { // Si no hay usuario
        buttonText = "Inicia sesión para inscribirte"; // El texto del botón será "Inicia sesión para inscribirte"
    } else if (enrolled.status) { // Si el usuario está inscrito (y existe la propiedad 'status' en enrolled)
        buttonText = "Ir al curso"; // El texto del botón será "Ir al curso"
    } else if (paid) { // Si el curso está pagado
        buttonText = "Pagar"; // El texto del botón será "Pagar"
    } else { // Para cualquier otro caso
        buttonText = "Suscribirse"; // El texto del botón será "Suscribirse"
    }


    return (
        <div className="jumbotron bg-primary square">
            <div className="row">
                <div className="col-md-8">
                    {/* Título */}
                    <h1 className="text-light font-weight-bold">{name}</h1>
                    {/* Descripción */}
                    <p className="lead">
                        {description?.substring(0, 160)}...
                    </p>
                    {/* Categoría */}
                    <Badge
                        count={category}
                        style={{ backgroundColor: "#03a9f4" }}
                        className="pb-4 mr-2"
                    />
                    {/* Autor */}
                    <p>Creado por {instructor.name}</p>
                    {/* Fecha de actualización */}
                    <p>Última actualización {new Date(updatedAt).toLocaleDateString()}</p>
                    {/* Precio */}
                    <h4 className="text-light">
                        {paid // Verifica si el valor de 'paid' es verdadero o falso
                            ? currencyFormatter({ // Si 'paid' es verdadero, muestra el resultado de la función 'currencyFormatter'
                                amount: price, // Parámetro 'amount' de la función 'currencyFormatter', representa el precio
                                currency: "usd", // Parámetro 'currency' de la función 'currencyFormatter', representa la moneda (en este caso, dólares estadounidenses)
                            })
                            : "Gratis" // Si 'paid' es falso, muestra la cadena "Gratis"
                        }

                    </h4>
                </div>
                <div className="col-md-4">
                    {/* Video */}
                    {lessons[0]?.video?.Location ? (
                        <div
                            onClick={() => {
                                setPreview(lessons[0].video.Location);
                                setShowModal(!showModal);
                            }}
                        >
                            <ReactPlayer
                                className="react-player-div" // Clase CSS para el reproductor de video
                                url={lessons[0].video.Location} // URL del video obtenida de un objeto "lessons"
                                light={image.Location} // URL de una imagen de vista previa del video obtenida de un objeto "image"
                                width="100%" // Ancho del reproductor de video (100% del contenedor)
                                height="225px" // Altura del reproductor de video (225 píxeles)
                            />
                        </div>
                    ) : (
                        <>
                            <img src={image ? image.Location : "/course.png"} alt={name} className="img img-fluid" />
                        </>
                    )}

                    {/* Botón de inscripción */}
                    {loading ? (
                        <div className="d-flex justify-content-center mt-3">
                            <LoadingOutlined className="h1 text-danger" />
                        </div>
                    ) : (
                        <Button
                            className="mb-3 mt-3" // Clase de estilo para el botón, añade margen inferior y superior
                            type="danger" // Tipo de botón, en este caso es de peligro (rojo)
                            block // Hace que el botón ocupe  el ancho disponible
                            shape="round" // Forma del botón, en este caso es redondeado
                            icon={<SafetyOutlined />} // Ícono a mostrar en el botón, en este caso es un ícono de seguridad
                            size="large" // Tamaño del botón, en este caso es grande
                            disabled={loading} // Indica si el botón está desactivado basado en la variable "loading"
                            onClick={paid ? handlePaidEnrollment : handleFreeEnrollment} // Acción a realizar al hacer clic en el botón, dependiendo de si la variable "paid" es verdadera o falsa
                        >
                            {buttonText}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SingleCourseJumbotron;
