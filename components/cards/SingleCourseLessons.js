// Importamos los componentes 'List' y 'Avatar' de la biblioteca 'antd'
import { List, Avatar } from "antd";

// Desestructuramos el componente 'Item' del componente 'List'
const { Item } = List;


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

export default SingleCourseLessons;
