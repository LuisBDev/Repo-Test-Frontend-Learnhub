// Importamos el componente Modal de la librería "antd"
import { Modal } from "antd";

// Importamos el componente ReactPlayer desde la librería "react-player"
import ReactPlayer from "react-player";


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


export default PreviewModal;
