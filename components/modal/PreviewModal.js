// Importamos el componente Modal de la librería "antd"
import { Modal } from "antd";

// Importamos el componente ReactPlayer desde la librería "react-player"
import ReactPlayer from "react-player";

// Importando el componente Modal de la librería "antd".

// Importando el componente ReactPlayer desde la librería "react-player".

// Definiendo el componente PreviewModal.

// Desestructurando los props recibidos en el componente PreviewModal.

// Renderizando el contenido del componente PreviewModal.
// Utiliza el componente Modal para mostrar una ventana emergente.
// El título de la ventana emergente es "Vista previa del curso".
// La propiedad visible indica si la ventana emergente es visible o no.
// La función onCancel se ejecuta cuando se cancela la ventana emergente y cambia el estado de showModal.
// El ancho de la ventana emergente es de 720 píxeles.
// El pie de página se establece como nulo para no mostrar ningún contenido.

// Dentro de la ventana emergente, se muestra un div con la clase "wrapper".
// Dentro del div se utiliza el componente ReactPlayer para mostrar un reproductor de video.
// El componente ReactPlayer recibe la URL del video a reproducir, la propiedad playing para indicar si el video debe reproducirse o no, y las opciones para mostrar los controles, el ancho y el alto del reproductor de video.

// Exportando el componente PreviewModal.
const PreviewModal = ({ showModal, setShowModal, preview }) => {
    return (
        <>
            {/* El componente Modal muestra una ventana emergente */}
            <Modal
                title="Vista previa del curso"  // Título de la ventana emergente
                visible={showModal}  // Propiedad que indica si la ventana emergente es visible o no
                onCancel={() => setShowModal(!showModal)}  // Función para cerrar la ventana emergente
                width={720}  // Ancho de la ventana emergente
                footer={null}  // El pie de página se establece como nulo para no mostrar ningún contenido
            >
                <div className="wrapper">
                    {/* El componente ReactPlayer muestra un reproductor de video */}
                    <ReactPlayer
                        url={preview}  // URL del video a reproducir
                        playing={showModal}  // Propiedad que indica si el video debe reproducirse o no
                        controls={true}  // Se muestra la barra de controles del reproductor de video
                        width="100%"  // Ancho del reproductor de video
                        height="100%"  // Alto del reproductor de video
                    />
                </div>
            </Modal>
        </>
    );
};

// Definiendo el componente PreviewModal.

// Desestructurando los props recibidos en el componente PreviewModal.

// Renderizando el contenido del componente PreviewModal.
// Utiliza el componente Modal para mostrar una ventana emergente.
// El título de la ventana emergente es "Vista previa del curso".
// La propiedad visible indica si la ventana emergente es visible o no.
// La función onCancel se ejecuta cuando se cancela la ventana emergente y cambia el estado de showModal.
// El ancho de la ventana emergente es de 720 píxeles.
// El pie de página se establece como nulo para no mostrar ningún contenido.

export default PreviewModal;
