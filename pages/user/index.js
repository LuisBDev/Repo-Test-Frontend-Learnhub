import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";

// Componente reutilizable para mostrar cada curso
const CourseItem = ({ curso }) => (
    <div key={curso._id} className="media pt-2 pb-1">
        <Avatar
            size={80}
            shape="square"
            src={curso.image ? curso.image.Location : "/course.png"}
        />

        <div className="media-body pl-2">
            <div className="row">
                <div className="col">
                    <Link href={`/user/course/${curso.slug}`} className="pointer">
                        <a>
                            <h5 className="mt-2 text-primary">{curso.name}</h5>
                        </a>
                    </Link>
                    <p style={{ marginTop: "-10px" }}>{curso.lessons.length} lecciones</p>
                    <p className="text-muted" style={{ marginTop: "-15px", fontSize: "12px" }}>
                        Por {curso.instructor.name}
                    </p>
                </div>
                <div className="col-md-3 mt-3 text-center">
                    <Link href={`/user/course/${curso.slug}`}>
                        <a>
                            <PlayCircleOutlined className="h2 pointer text-primary" />
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

const UserIndex = () => {
    const { state: { user } } = useContext(Context);
    console.log("user", user);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            await loadCourses();
        };
        fetchCourses();
    }, []);

    const loadCourses = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/user-courses");
            setCourses(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    return (
        <UserRoute>
            {loading && (
                <SyncOutlined
                    spin
                    className="d-flex justify-content-center display-1 text-danger p-5"
                />
            )}
            <h1 className="jumbotron text-center square">User DashBoard</h1>

            {/* Mostrar lista de cursos */}
            {courses?.map((curso) => (
                <CourseItem key={curso._id} curso={curso} />
            ))}
        </UserRoute>
    );
};

export default UserIndex;
