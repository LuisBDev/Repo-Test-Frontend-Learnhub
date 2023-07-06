// Importar los componentes Button, Progress y Switch de la biblioteca antd
import { Button, Progress, Switch } from "antd";

// Importar el componente ReactPlayer
import ReactPlayer from "react-player";


const UpdateLessonForm = ({
    current, // Valor actual de la lección
    setCurrent, // Función para actualizar el valor de la lección actual
    handleUpdateLesson, // Función para manejar la actualización de la lección
    uploading, // Estado que indica si se está subiendo un video
    uploadVideoButtonText, // Texto del botón para subir un video
    handleVideo, // Función para manejar el video
    progress, // Progreso de la carga del video
}) => {
    // Actualiza el título de la lección
    const handleTitleChange = (e) => {
        setCurrent({ ...current, title: e.target.value });
    };

    // Actualiza el contenido de la lección
    const handleContentChange = (e) => {
        setCurrent({ ...current, content: e.target.value });
    };
    // Definiendo la función handleInputChange que se ejecuta cuando se produce un cambio en el input.
    // Toma dos argumentos: el evento (e) y el campo (field).
    // Utiliza la función setValues para actualizar el estado de los valores.
    // Utiliza el operador spread (...) para copiar los valores actuales y luego sobrescribe el campo especificado con el valor del evento.
    // El evento.target.value contiene el valor actualizado del campo de entrada.

    // Renderizando el contenido del componente AddLessonForm.
    // Incluye un formulario con campos de entrada para el título y el contenido de la lección.
    // El valor de cada campo está vinculado al estado "values" y se actualiza utilizando la función handleInputChange.
    // El botón de carga de video está asociado a la función handleVideo para manejar la selección de video.
    // El botón de eliminación de video utiliza la función handleVideoRemove para eliminar el video seleccionado.
    // El progreso de carga del video se muestra utilizando el componente Progress.
    // El botón "Guardar" utiliza la función handleAddLesson para guardar la lección.
    return (
        <div className="container pt-3">
            <form onSubmit={handleUpdateLesson}>
                {/* Entrada para el título de la lección */}
                <input
                    type="text"
                    className="form-control square"
                    onChange={handleTitleChange}
                    value={current.title}
                    autoFocus
                    required
                />

                {/* Área de texto para el contenido de la lección */}
                <textarea
                    className="form-control mt-3"
                    cols="7"
                    rows="7"
                    onChange={handleContentChange}
                    value={current.content}
                ></textarea>

                <div>
                    {/* Reproductor de video si hay un video seleccionado */}
                    {!uploading && current.video && current.video.Location && (
                        <div className="pt-2 d-flex justify-content-center">
                            <ReactPlayer
                                url={current.video.Location}
                                width="410px"
                                height="240px"
                                controls
                            />
                        </div>
                    )}

                    {/* Botón para subir un video */}
                    <label className="btn btn-dark btn-block text-left mt-3">
                        {/* Renderiza el texto del botón, que se puede personalizar */}
                        {uploadVideoButtonText}
                        {/* Crea un elemento de entrada de archivo invisible */}
                        <input onChange={handleVideo} type="file" accept="video/*" hidden />
                    </label>

                </div>

                {/* Barra de progreso */}
                {progress > 0 && ( // Comprueba si el valor de la variable "progress" es mayor que 0
                    <Progress // Renderiza un componente de progreso
                        className="d-flex justify-content-center pt-2" // Agrega clases CSS al componente para centrarlo horizontalmente y aplicar un padding top de 2
                        percent={progress} // Establece el porcentaje de progreso del componente basado en el valor de la variable "progress"
                        steps={10} // Establece la cantidad de pasos o etapas del componente de progreso
                    />
                )}

                <div className="d-flex justify-content-between">
                    {/* Etiqueta de vista previa */}
                    <span className="pt-3 badge">Vista previa</span>
                    {/* Interruptor para habilitar/deshabilitar la vista previa gratuita */}
                    <Switch
                        className="float-right mt-2" // Clase CSS para posicionar el interruptor a la derecha y agregar margen superior
                        disabled={uploading} // Determina si el interruptor está desactivado o no basado en la variable "uploading"
                        checked={current.free_preview} // Determina si el interruptor está activado o no basado en el valor de "current.free_preview"
                        name="fee_preview" // Nombre del interruptor, utilizado en la manipulación de eventos
                        onChange={(v) => setCurrent({ ...current, free_preview: v })} // Función de cambio de evento que actualiza el estado "current" con el valor del interruptor
                    />

                </div>

                {/* Botón para guardar la lección */}
                <Button
                    // Manejador de eventos para el clic del botón
                    onClick={handleUpdateLesson}
                    // Clase CSS para el estilo del botón
                    className="col mt-3"
                    // Tamaño del botón
                    size="large"
                    // Tipo de botón (primario)
                    type="primary"
                    // Estado de carga del botón
                    loading={uploading}
                    // Forma redondeada del botón
                    shape="round"
                >
                    Guardar
                </Button>

            </form>
        </div>
    );
};

// Utiliza la función setValues para actualizar el estado de los valores.
// Utiliza el operador spread (...) para copiar los valores actuales y luego sobrescribe el campo especificado con el valor del evento.
// El evento.target.value contiene el valor actualizado del campo de entrada.

// Renderizando el contenido del componente AddLessonForm.
// Incluye un formulario con campos de entrada para el título y el contenido de la lección.
// El valor de cada campo está vinculado al estado "values" y se actualiza utilizando la función handleInputChange.
// El botón de carga de video está asociado a la función handleVideo para manejar la selección de video.
// El botón de eliminación de video utiliza la función handleVideoRemove para eliminar el video seleccionado.

export default UpdateLessonForm;
