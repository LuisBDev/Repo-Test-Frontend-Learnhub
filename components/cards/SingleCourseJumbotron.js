import { currencyFormatter } from "../../utils/helpers";
import { Badge, Button } from "antd";
import ReactPlayer from "react-player";
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
        name,
        description,
        instructor,
        updatedAt,
        lessons,
        image,
        price,
        paid,
        category,
    } = course;

    // Texto del botón de inscripción
    let buttonText;
    if (!user) {
        buttonText = "Inicia sesión para inscribirte";
      } else if (enrolled.status) {
        buttonText = "Ir al curso";
      } else if (paid) {
        buttonText = "Pagar";
      } else {
        buttonText = "Suscribirse";
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
                        {paid
                            ? currencyFormatter({
                                amount: price,
                                currency: "usd",
                            })
                            : "Gratis"}
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
                                className="react-player-div"
                                url={lessons[0].video.Location}
                                light={image.Location}
                                width="100%"
                                height="225px"
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
                            className="mb-3 mt-3"
                            type="danger"
                            block
                            shape="round"
                            icon={<SafetyOutlined />}
                            size="large"
                            disabled={loading}
                            onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
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
