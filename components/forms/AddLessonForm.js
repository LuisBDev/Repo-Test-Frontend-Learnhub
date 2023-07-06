// Importamos los componentes Button, Progress y Tooltip desde la librería "antd"
import { Button, Progress, Tooltip } from "antd";

// Importamos el componente CloseCircleFilled desde la librería "@ant-design/icons"
import { CloseCircleFilled } from "@ant-design/icons";


const AddLessonForm = ({
    values, // Valores de las lecciones (pueden ser propiedades como título, descripción, etc.)
    setValues, // Función para establecer los valores de las lecciones
    handleAddLesson, // Función para manejar la adición de una lección
    uploading, // Bandera que indica si se está cargando una lección
    uploadButtonText, // Texto que se muestra en el botón de carga
    handleVideo, // Función para manejar el video de la lección
    progress, // Progreso de carga del video
    handleVideoRemove, // Función para eliminar el video de la lección
}) => {
    const handleInputChange = (e, field) => {
        // La función handleInputChange toma dos argumentos: el evento (e) y el campo (field)
        setValues({ ...values, [field]: e.target.value });
        // Aquí se utiliza la función setValues para actualizar el estado de los valores.
        // Se utiliza el operador spread (...) para copiar los valores actuales y luego se sobrescribe el campo especificado con el valor del evento.
        // El evento.target.value contiene el valor actualizado del campo de entrada.
    };

    return (
        <div className="container pt-3">
            <form onSubmit={handleAddLesson}>
                <input
                    type="text" // Tipo de entrada: texto
                    className="form-control square" // Clase de estilo para el input
                    onChange={(e) => handleInputChange(e, "title")} // Función que se ejecuta cuando se produce un cambio en el input, pasando el evento y el nombre del campo como argumentos
                    value={values.title} // Valor actual del input, obtenido del estado
                    placeholder="Título" // Texto de ejemplo que se muestra dentro del input cuando está vacío
                    autoFocus // Hace que el input tenga el enfoque automáticamente cuando se carga la página
                    required // Indica que el input es obligatorio
                />

                <textarea
                    className="form-control mt-3" // Clase CSS para aplicar estilos al campo de texto
                    cols="7" // Número de columnas visibles del campo de texto
                    rows="7" // Número de filas visibles del campo de texto
                    onChange={(e) => handleInputChange(e, "content")} // Manejador de evento para detectar cambios en el contenido del campo de texto y llamar a la función handleInputChange con el evento y el identificador "content"
                    value={values.content} // Valor actual del campo de texto, se usa para mostrar y actualizar el contenido
                    placeholder="Contenido" // Texto de marcador de posición que se muestra cuando el campo de texto está vacío
                ></textarea>


                <div className="d-flex justify-content-center">
                    <label className="btn btn-dark btn-block text-left mt-3"> {/* Etiqueta para crear un botón estilizado */}
                        {uploadButtonText} {/* Muestra el texto del botón, que puede ser dinámico */}
                        <input onChange={handleVideo} type="file" accept="video/*" hidden /> {/* Entrada de archivo oculta para seleccionar un video y llamar a la función handleVideo cuando cambie */}
                    </label>


                    {!uploading && values.video?.Location && (
                        // Si no se está realizando una carga y existe una ubicación de video en los valores
                        <Tooltip title="Eliminar">
                            {/* Muestra un tooltip con el texto "Eliminar" */}
                            <span onClick={handleVideoRemove} className="pt-1 pl-3">
                                {/* Un span con un evento onClick que ejecuta la función handleVideoRemove */}
                                <CloseCircleFilled className="text-danger d-flex justify-content-center pt-4 pointer" />
                                {/* Muestra un ícono de círculo lleno de color rojo y clases de estilo adicionales */}
                            </span>
                        </Tooltip>
                    )}
                </div>

                {progress > 0 && (  // Verifica si el valor de la variable "progress" es mayor que 0
                    <Progress  // Componente de Progreso
                        className="d-flex justify-content-center pt-2"  // Clase CSS para alinear el contenido del componente al centro
                        percent={progress}  // Propiedad "percent" que indica el porcentaje de progreso a mostrar
                        steps={10}  // Propiedad "steps" que indica el número total de pasos o etapas del progreso
                    />
                )}


                <Button
                    onClick={handleAddLesson} // Manejador de evento para el clic en el botón, ejecuta la función handleAddLesson
                    className="col mt-3" // Clase CSS para estilizar el botón, coloca el botón en una columna y aplica margen superior de 3
                    size="large" // Tamaño grande para el botón
                    type="primary" // Tipo de botón primario, se resalta con un color diferente
                    loading={uploading} // Propiedad para indicar si el botón está en estado de carga, según el valor de la variable uploading
                    shape="round" // Forma redondeada para el botón
                >

                    Guardar
                </Button>
            </form>
        </div>
    );
};

export default AddLessonForm;
