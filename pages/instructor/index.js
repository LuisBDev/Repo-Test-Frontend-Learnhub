import { useContext, useEffect, useState } from "react";
import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { Avatar, Tooltip } from "antd";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Context } from "../../context";
import { toast } from "react-toastify";

const InstructorIndex = () => {
    const { state: { user } } = useContext(Context);

    const [courses, setCourses] = useState([]);
    const [publishedCount, setPublishedCount] = useState(0);

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const response = await axios.get("/api/instructor-courses");
                setCourses(response.data);
            } catch (error) {
                console.log("Error al cargar los cursos del instructor:", error);
            }
        };

        loadCourses();
    }, []);

    const myStyle = { marginTop: "-15px", fontSize: "10px" };

    useEffect(() => {
        if (user) {
            const countPublishedCourses = courses.reduce((count, course) => {
                if (course.published) {
                    return count + 1;
                } else {
                    return count;
                }
            }, 0);
            setPublishedCount(countPublishedCourses);
        }
    }, [user, courses]);

    useEffect(() => {
        if (user && publishedCount > 0) {
            toast.success(`¡Instructor ${user.name} tienes ${publishedCount} cursos publicados y ${(courses.length) - publishedCount} inactivo(s)!`);
        }
    }, [user, publishedCount]);

    const renderCourseItem = (course) => {
        return (
            <div key={course._id} className="media pt-2">
                <Avatar
                    size={80}
                    src={course.image ? course.image.Location : "/course.png"}
                />

                <div className="media-body pl-2">
                    <div className="row">
                        <div className="col">
                            <Link
                                href={`/instructor/course/view/${course.slug}`}
                                className="pointer"
                            >
                                <a className="mt-2 text-primary">
                                    <h5 className="pt-2">{course.name}</h5>
                                </a>
                            </Link>
                            <p style={{ marginTop: "-10px" }}>
                                {course.lessons.length} Lecciones
                            </p>

                            {renderCourseStatus(course)}
                        </div>

                        <div className="col-md-3 mt-3 text-center">
                            {renderCourseIcon(course)}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderCourseStatus = (course) => {
        if (course.lessons.length < 5) {
            return (
                <p style={myStyle} className="text-warning">
                    Se requieren al menos 5 lecciones para publicar un curso
                </p>
            );
        } else {
            return (
                <p style={myStyle} className="text-success">
                    {course.published
                        ? "Tu curso está publicado en el mercado"
                        : "Tu curso está listo para ser publicado"}
                </p>
            );
        }
    };

    const renderCourseIcon = (course) => {
        if (course.published) {
            return (
                <Tooltip title="Publicado">
                    <CheckCircleOutlined className="h5 pointer text-success" />
                </Tooltip>
            );
        } else {
            return (
                <Tooltip title="No publicado">
                    <CloseCircleOutlined className="h5 pointer text-warning" />
                </Tooltip>
            );
        }
    };

    return (
        <InstructorRoute>
            <h1 className="jumbotron text-center square">Panel del Instructor</h1>

            {courses.length > 0 ? (
                courses.map((course) => renderCourseItem(course))
            ) : (
                <p>No hay cursos disponibles</p>
            )}
        </InstructorRoute>
    );
};

export default InstructorIndex;
