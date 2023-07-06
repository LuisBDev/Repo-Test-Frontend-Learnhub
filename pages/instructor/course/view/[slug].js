import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
import { Avatar, Tooltip, Button, Modal, List } from "antd";
import {
    EditOutlined,
    CheckOutlined,
    UploadOutlined,
    QuestionOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import AddLessonForm from "../../../../components/forms/AddLessonForm";
import AddQuestionForm from "../../../../components/forms/AddQuestionForm";
import { toast } from "react-toastify";

const CourseView = () => {
    const [course, setCourse] = useState({});
    const [visible, setVisible] = useState(false);
    const [visibleQuestion, setVisibleQuestion] = useState(false);
    const [values, setValues] = useState({
        title: "",
        content: "",
        video: {},
    });

    const [valuesQuestion, setValuesQuestion] = useState({
        title: "",
        content: "",
        answer: "", // Nueva propiedad para almacenar la respuesta correcta
        options: ["", "", "", ""] // Nueva propiedad para almacenar las opciones de respuesta
    });


    const [uploading, setUploading] = useState(false);

    const [uploadingQuestion] = useState(false);


    const [uploadButtonText, setUploadButtonText] = useState("Subir Video");
    const [progress, setProgress] = useState(0);

    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        loadCourse();
    }, [slug]);

    const loadCourse = async () => {
        const { data } = await axios.get(`/api/course/${slug}`);
        setCourse(data);
    };

    const handleAddLesson = async (e) => {
        e.preventDefault();
        if (values.title.trim() === "" || values.content.trim() === "") {
            toast("Por favor, completa todos los campos");
            return;
        }

        try {
            const { data } = await axios.post(
                `/api/course/lesson/${slug}/${course.instructor._id}`,
                values
            );
            setValues({ ...values, title: "", content: "", video: {} });
            setProgress(0);
            setUploadButtonText("Subir video");
            setVisible(false);
            setCourse(data);
            toast("Lección agregada");

        } catch (err) {
            console.log(err);
            toast("Error al agregar la lección");
        }
    };

    const handleAddQuestion = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `/api/course/question/${slug}/${course.instructor._id}`,
                valuesQuestion
            );
            setValuesQuestion({ title: "", content: "", answer: "", options: ["", "", "", ""] });
            setVisibleQuestion(false);
            setCourse(data);
            toast("Pregunta agregada");
        } catch (err) {
            console.log(err);
            toast("Error al agregar la pregunta");
        }
    };

    const handleVideo = async (e) => {
        try {
            const file = e.target.files[0];
            setUploadButtonText(file.name);
            setUploading(true);

            const videoData = new FormData();
            videoData.append("video", file);

            const { data } = await axios.post(
                `/api/course/video-upload/${course.instructor._id}`,
                videoData,
                {
                    onUploadProgress: (e) => {
                        setProgress(Math.round((100 * e.loaded) / e.total));
                    },
                }
            );

            console.log(data);
            setValues({ ...values, video: data });
            setUploading(false);
        } catch (err) {
            console.log(err);
            setUploading(false);
            toast("Error al subir el video");
        }
    };

    const handleVideoRemove = async () => {
        try {
            setUploading(true);
            const { data } = await axios.post(
                `/api/course/video-remove/${course.instructor._id}`,
                values.video
            );
            console.log(data);
            setValues({ ...values, video: {} });
            setUploading(false);
            setUploadButtonText("Subir otro video");
        } catch (err) {
            console.log(err);
            setUploading(false);
            toast("Error al eliminar el video");
        }
    };

    const handlePublish = async (e, courseId) => {
        try {
            let answer = window.confirm(
                "Una vez que publiques tu curso, estará disponible en el mercado para que los usuarios se inscriban"
            );
            if (!answer) return;
            const { data } = await axios.put(`/api/course/publish/${courseId}`);
            setCourse(data);
            toast("¡Felicitaciones! Tu curso está publicado");
        } catch (err) {
            toast("Error al publicar el curso. Inténtalo de nuevo");
        }
    };

    const handleUnpublish = async (e, courseId) => {
        try {
            let answer = window.confirm(
                "Una vez que despubliques tu curso, no estará disponible para que los usuarios se inscriban"
            );
            if (!answer) return;
            const { data } = await axios.put(`/api/course/unpublish/${courseId}`);
            setCourse(data);
            toast("Tu curso está despublicado");
        } catch (err) {
            toast("Error al publicar el curso. Inténtalo de nuevo");
        }
    };

    const renderPublishButton = () => {
        if (course?.lessons?.length < 5) {
            return (
                <Tooltip title="Se requieren al menos 5 lecciones para publicar">
                    <QuestionOutlined className="h5 pointer text-danger" />
                </Tooltip>
            );
        } else if (course.published) {
            return (
                <Tooltip title="Despublicar">
                    <CloseOutlined
                        onClick={(e) => handleUnpublish(e, course._id)}
                        className="h5 pointer text-danger"
                    />
                </Tooltip>
            );
        } else {
            return (
                <Tooltip title="Publicar">
                    <CheckOutlined
                        onClick={(e) => handlePublish(e, course._id)}
                        className="h5 pointer text-success"
                    />
                </Tooltip>
            );
        }
    };

    const lessonList = course?.lessons?.map((item) => (
        <List.Item key={item.title}>
            <List.Item.Meta
                avatar={<Avatar>{item.title.substring(0, 1)}</Avatar>}
                title={item.title}
            ></List.Item.Meta>
        </List.Item>
    ));

    const questionList = course?.questions?.map((item) => (
        <List.Item key={item.title}>
            <List.Item.Meta
                avatar={<Avatar>{item.title.substring(0, 1)}</Avatar>}
                title={item.title}
            ></List.Item.Meta>
        </List.Item>
    ));


    return (
        <InstructorRoute>
            <div className="container-fluid pt-3">
                {course && (
                    <div className="container-fluid pt-1">
                        <div className="media pt-2">
                            <Avatar
                                size={80}
                                src={course.image ? course.image.Location : "/course.png"}
                            />

                            <div className="media-body pl-2">
                                <div className="row">
                                    <div className="col">
                                        <h5 className="mt-2 text-primary">{course.name}</h5>
                                        <p style={{ marginTop: "-10px" }}>
                                            {course?.lessons?.length} Lecciones
                                        </p>
                                        <p style={{ marginTop: "-15px", fontSize: "10px" }}>
                                            {course.category}
                                        </p>
                                    </div>

                                    <div className="d-flex pt-4">
                                        <Tooltip title="Editar">
                                            <EditOutlined
                                                onClick={() =>
                                                    router.push(`/instructor/course/edit/${slug}`)
                                                }
                                                className="h5 pointer text-warning mr-4"
                                            />
                                        </Tooltip>

                                        {renderPublishButton()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col">
                                <ReactMarkdown source={course.description} />
                            </div>
                        </div>
                        <div className="row">
                            <Button
                                onClick={() => setVisible(true)}
                                className="col-md-6 offset-md-3 text-center"
                                type="primary"
                                shape="round"
                                icon={<UploadOutlined />}
                                size="large"
                            >
                                Agregar Lección
                            </Button>
                        </div>
                        {/* Botón agregar preguntas */}
                        <br />
                        <div className="row">
                            <Button
                                onClick={() => setVisibleQuestion(true)}
                                className="col-md-6 offset-md-3 text-center"
                                type="primary"
                                shape="round"
                                icon={<UploadOutlined />}
                                size="large"
                            >
                                Agregar Evaluación
                            </Button>
                        </div>


                        <br />

                        <Modal
                            title="+ Agregar Lección"
                            centered
                            visible={visible}
                            onCancel={() => setVisible(false)}
                            footer={null}
                        >
                            <AddLessonForm
                                values={values}
                                setValues={setValues}
                                handleAddLesson={handleAddLesson}
                                uploading={uploading}
                                uploadButtonText={uploadButtonText}
                                handleVideo={handleVideo}
                                progress={progress}
                                handleVideoRemove={handleVideoRemove}
                            />
                        </Modal>

                        {/* Inicio Modal Preguntas */}
                        <Modal
                            title="+ Agregar Evaluación"
                            centered
                            visible={visibleQuestion}
                            onCancel={() => setVisibleQuestion(false)}
                            footer={null}
                        >

                            <AddQuestionForm
                                valuesQuestion={valuesQuestion}
                                setValuesQuestion={setValuesQuestion}
                                handleAddQuestion={handleAddQuestion}
                                uploading={uploadingQuestion}
                            />

                        </Modal>
                        {/* Fin Modal Preguntas */}

                        <div className="row pb-5">
                            <div className="col lesson-list">
                                <h4>{course?.lessons?.length} Lecciones</h4>
                                <List itemLayout="horizontal" dataSource={course?.lessons}>
                                    {lessonList}
                                </List>
                            </div>
                        </div>

                        <div className="row pb-5">
                            <div className="col question-list">
                                <h4>{course?.questions?.length} Evaluaciones </h4>
                                <List itemLayout="horizontal" dataSource={course?.questions}>
                                    {questionList}
                                </List>
                            </div>
                        </div>



                    </div>
                )}
            </div>
        </InstructorRoute>
    );
};

export default CourseView;
