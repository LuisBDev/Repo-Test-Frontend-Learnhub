import { List, Avatar } from "antd";
const { Item } = List;

const SingleCourseLessons = ({
  lessons,
  setPreview,
  showModal,
  setShowModal,
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
                {item.video && item.video !== null && item.free_preview && (
                  <span
                    className="text-primary pointer"
                    onClick={() => {
                      setPreview(item.video.Location);
                      setShowModal(!showModal);
                    }}
                  >
                    Vista previa
                  </span>
                )}
              </Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleCourseLessons;
