// Importación de componentes desde la librería "antd"
import { Select, Button, Avatar, Badge } from "antd";

// Desestructuración del objeto "Option" desde el módulo "Select"
const { Option } = Select;

const CourseCreateForm = ({
    handleSubmit, // Función para manejar la presentación del formulario
    handleImage, // Función para manejar la imagen seleccionada
    handleChange, // Función para manejar el cambio de valores en el formulario
    values, // Valores del formulario
    setValues, // Función para establecer los valores del formulario
    preview, // Vista previa de la imagen seleccionada
    uploadButtonText, // Texto del botón de carga de imagen
    handleImageRemove = (f) => f, // Función para manejar la eliminación de la imagen (por defecto es una función vacía)
    editPage = false, // Indicador de si se encuentra en la página de edición o creación (por defecto es falso)
}) => {
    const children = []; // Creamos un array vacío llamado "children" para almacenar los elementos generados

    // Utilizamos un bucle "for" para iterar desde 9.99 hasta 100.99
    // El bucle se repetirá mientras "i" sea menor o igual a 100.99
    // Incrementamos "i" en cada iteración
    for (let i = 9.99; i <= 100.99; i++) {
        // Dentro del bucle, creamos un elemento "Option" y lo agregamos al array "children"
        // La clave (key) del elemento es el valor de "i" formateado con dos decimales usando toFixed(2)
        // El contenido del elemento es el valor de "i" formateado con dos decimales y precedido por el símbolo de dólar ($)
        children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>);
    }

    return (
        <>
            {values && (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text" // Tipo de input: texto
                            name="name" // Nombre del campo: "name"
                            className="form-control" // Clase de estilos CSS: "form-control"
                            placeholder="Nombre" // Placeholder del campo: "Nombre"
                            value={values.name} // Valor actual del campo, obtenido de la variable "values.name"
                            onChange={handleChange} // Evento que se dispara al cambiar el valor del campo, llamando a la función "handleChange"
                        />

                    </div>

                    <div className="form-group"> {/* Div contenedor del grupo de formulario */}
                        <textarea
                            name="description" //* Nombre del campo de texto */
                            cols="7" //* Número de columnas del textarea */
                            rows="7" //* Número de filas del textarea */
                            value={values.description} //* Valor del campo, enlazado con una variable llamada "values.description" */}
                            className="form-control" //* Clase CSS para el textarea */
                            onChange={handleChange} //* Función que se ejecuta cuando el contenido del textarea cambia */}
                        ></textarea> {/* Cierre del elemento textarea */}
                    </div> {/* Cierre del div contenedor del grupo de formulario */}


                    <div className="form-row">
                        <div className="col">
                            <div className="form-group">
                                {/* Aquí se utiliza el componente Select para crear un menú desplegable */}
                                <Select
                                    style={{ width: "100%" }}
                                    size="large"
                                    value={values.paid}
                                    onChange={(v) => setValues({ ...values, paid: v, price: 0 })}
                                >
                                    {/* Cada opción del menú tiene un valor asociado */}
                                    <Option value={true}>Pago</Option> {/* Opción para indicar que es de pago */}
                                    <Option value={false}>Gratis</Option> {/* Opción para indicar que es gratis */}
                                </Select>
                            </div>
                        </div>


                        {values.paid && ( // Verifica si "values.paid" es verdadero
                            <div className="form-group">
                                <Select
                                    defaultValue="$9.99"
                                    style={{ widht: "100%" }} // Se especifica el ancho del estilo en 100%
                                    onChange={(v) => setValues({ ...values, price: v })} // Se asigna una función onChange para manejar el cambio en el valor seleccionado
                                    tokenSeparators={[","]} // Se especifica un separador de tokens
                                    size="large" // Se establece el tamaño del componente como "large"
                                >
                                    {children} {/* Renderiza los elementos hijos dentro del componente Select*/}
                                </Select>
                            </div>
                        )}

                    </div>

                    <div className="form-group">
                        {/* Inicio del campo de entrada */}
                        <input
                            type="text" // El tipo de dato del campo de entrada es texto
                            name="category" // Nombre del campo de entrada, puede ser utilizado para identificar el valor ingresado
                            className="form-control" // Clase CSS para aplicar estilos al campo de entrada
                            placeholder="Categoría" // Texto de marcador de posición que se muestra antes de que se ingrese un valor
                            value={values.category} // Valor actual del campo de entrada, se puede vincular a una variable o estado
                            onChange={handleChange} // Función de controlador de eventos que se llama cuando se modifica el valor del campo de entrada
                        />
                        {/* Fin del campo de entrada */}
                    </div>

                    <div className="form-row">
                        <div className="col">
                            <div className="form-group">
                                <label className="btn btn-outline-secondary btn-block text-left">
                                    {uploadButtonText} {/* Renderiza el texto del botón de carga */}
                                    <input
                                        type="file" // Define un campo de entrada de tipo archivo 
                                        name="image" // Establece el nombre del campo de entrada 
                                        onChange={handleImage} // Asigna una función para manejar el cambio de la imagen 
                                        accept="image/*" // Especifica que se pueden seleccionar archivos de imagen 
                                        hidden // Oculta el campo de entrada 
                                    />
                                </label>
                            </div>
                        </div>

                        {/*
    Este bloque de código muestra un componente Avatar junto con un contador en forma de Badge.
    Solo se muestra si la variable "preview" es verdadera.

    El contador tiene el valor "X" y se activa cuando se hace clic en él, llamando a la función "handleImageRemove".

    El componente Avatar tiene un ancho de 200 y muestra la imagen proporcionada por la variable "preview".
*/}
                        {preview && (
                            <Badge count="X" onClick={handleImageRemove} className="pointer">
                                <Avatar width={200} src={preview} />
                            </Badge>
                        )}

                        {/*
    Este bloque de código muestra el componente Avatar solo si la variable "editPage" es verdadera
    y si la variable "values.image" tiene un valor.

    El componente Avatar tiene un ancho de 200 y muestra la imagen proporcionada por la ubicación
    especificada en "values.image.Location".
*/}
                        {editPage && values.image && (
                            <Avatar width={200} src={values.image.Location} />
                        )}

                    </div>

                    <div className="row">
                        <div className="col">
                            <Button
                                onClick={handleSubmit} // Evento que se desencadena al hacer clic en el botón, invocando la función 'handleSubmit'
                                disabled={values.loading || values.uploading} // Desactiva el botón si 'values.loading' o 'values.uploading' son verdaderos
                                className="btn btn-primary" // Clases CSS aplicadas al botón para estilos adicionales
                                loading={values.loading} // Muestra un indicador de carga en el botón si 'values.loading' es verdadero
                                type="primary" // Tipo de botón primario
                                size="large" // Tamaño grande del botón
                                shape="round" // Forma redondeada del botón
                            >
                                {values.loading ? "Guardando..." : "Guardar y Continuar"}  {/* Texto del botón que cambia según el estado de 'values.loading' */}
                            </Button>

                        </div>
                    </div>
                </form>
            )}
        </>
    );
};

export default CourseCreateForm;
