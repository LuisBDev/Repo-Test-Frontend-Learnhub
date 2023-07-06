// Importamos los componentes 'List' y 'Avatar' de la biblioteca 'antd'
import { List, Avatar } from "antd";

// Desestructuramos el componente 'Item' del componente 'List'
const { Item } = List;
// Definiendo la función validateField para validar un campo específico del formulario.
// Utiliza el método validateFields de la instancia del formulario para validar el campo especificado.

// Definiendo la función renderConvertirInstructor para renderizar el formulario de conversión a instructor.
// Utiliza el componente Form de Ant Design para crear un formulario.
// Define varios campos del formulario con sus respectivas reglas de validación y elementos de entrada.
// Muestra un botón de carga de archivo utilizando el componente Upload y el botón Button de Ant Design.
// Utiliza el componente Select de Ant Design para crear un campo de selección de opciones.
// Muestra un botón de envío del formulario utilizando el componente Button de Ant Design.
// El botón muestra un ícono de carga si el estado "loading" es verdadero.
// Defining an effect hook that runs when the user or course changes.

const SingleCourseLessons = ({
  lessons, // Array que contiene las lecciones del curso
  setPreview, // Función para establecer una vista previa de la lección
  showModal, // Función para mostrar el modal
  setShowModal, // Función para establecer la visibilidad del modal
}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col lesson-list">
          {/* Número de lecciones */}
          {lessons && <h4>{lessons.length} Lecciones</h4>}
          <hr />
          <List
            itemLayout="horizontal"
            dataSource={lessons}
            renderItem={(item, index) => (
              <Item>
                {/* Avatar con número de lección */}
                <Item.Meta
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={item.title}
                />
                {/* Vista previa */}
                {
                  // Comprueba si hay un objeto "video" en el objeto "item" y si no es nulo
                  item.video && item.video !== null && item.free_preview && (
                    <span
                      className="text-primary pointer"
                      onClick={() => {
                        // Establece la variable de estado "preview" con la ubicación del video en "item.video.Location"
                        setPreview(item.video.Location);
                        // Cambia el valor de la variable de estado "showModal" a su opuesto actual
                        setShowModal(!showModal);
                      }}
                    >
                      Vista previa
                    </span>
                  )
                }
              </Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};
// Definiendo la función validateField para validar un campo específico del formulario.
// Utiliza el método validateFields de la instancia del formulario para validar el campo especificado.

// Definiendo la función renderConvertirInstructor para renderizar el formulario de conversión a instructor.
// Utiliza el componente Form de Ant Design para crear un formulario.
// Define varios campos del formulario con sus respectivas reglas de validación y elementos de entrada.
// Muestra un botón de carga de archivo utilizando el componente Upload y el botón Button de Ant Design.
// Utiliza el componente Select de Ant Design para crear un campo de selección de opciones.
// Muestra un botón de envío del formulario utilizando el componente Button de Ant Design.
// El botón muestra un ícono de carga si el estado "loading" es verdadero.
// Defining an effect hook that runs when the user or course changes.
export default SingleCourseLessons;
