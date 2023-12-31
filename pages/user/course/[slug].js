import React, { useState, useEffect, createElement } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import StudentRoute from "../../../components/routes/StudentRoute";
import { Button, Menu, Avatar, Modal, Radio, message } from "antd";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";
import {
  PlayCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleOutlined,
  MinusCircleFilled,

} from "@ant-design/icons";
import "donut_graphic/circle_graph.css"
import CompletionSection from "./completion_section";
import GradeSection from "./grade_section";
const { Item } = Menu;
// Definiendo una función asincrónica llamada "loadCourse".
// Esta función se utiliza para cargar los datos del curso desde el servidor.
// Realiza una solicitud GET a la ruta "/api/course/${slug}" para obtener los datos del curso.
// Al recibir la respuesta, se muestra en la consola para fines de depuración.
// Si los datos existen, se establecen en el estado "values" mediante la función setValues.
// Si los datos incluyen una imagen, se establece en el estado "image" mediante la función setImage.

// Definiendo una función llamada "handleChange".
// Esta función se utiliza para manejar los cambios en los campos de entrada del formulario.
// Utiliza el operador spread para crear una copia del estado "values" y actualiza el valor correspondiente según el nombre del campo de entrada.

// Definiendo una función llamada "handleImage".
// Esta función se utiliza para manejar la selección de una imagen para cargar.
// Obtiene el archivo de imagen seleccionado y lo almacena en la variable "file".
// Crea una URL de vista previa de la imagen utilizando la función window.URL.createObjectURL y la establece en el estado "preview".
// Establece el nombre del archivo en el estado "uploadButtonText".
// Actualiza el estado "values" para indicar que se está cargando la imagen.
// Utiliza la biblioteca de redimensionamiento Resizer para redimensionar la imagen seleccionada.
// Realiza una solicitud POST a la ruta "/api/course/upload-image" con la imagen redimensionada.
// Al recibir la respuesta, muestra la información en la consola y establece la imagen en el estado "image".
// Finalmente, actualiza el estado "values" para indicar que la carga ha finalizado.

// La función loadCourse se llama cuando se carga el componente para obtener los datos del curso.
// Las funciones handleChange y handleImage se utilizan para manejar los cambios en los campos de entrada y la carga de imágenes, respectivamente.
const SingleCourse = () => {
  const [clicked, setClicked] = useState(-1);
  const [clickedQuestionBar, setClickedQuestionBar] = useState(-1);
  const [collapsedQuestionBar, setCollapsedQuestionBar] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [course, setCourse] = useState({ lessons: [], questions: [] });
  const [error, setError] = useState(null);
  const [questionModalVisible, setQuestionModalVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showTracking, setShowTracking] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState(null);

  const [completedLessons, setCompletedLessons] = useState([]);

  const [updateState, setUpdateState] = useState(false);

  // Definiendo una función asincrónica llamada "loadCourse".
  // Esta función se utiliza para cargar los datos del curso desde el servidor.
  // Realiza una solicitud GET a la ruta "/api/course/${slug}" para obtener los datos del curso.
  // Al recibir la respuesta, se muestra en la consola para fines de depuración.
  // Si los datos existen, se establecen en el estado "values" mediante la función setValues.
  // Si los datos incluyen una imagen, se establece en el estado "image" mediante la función setImage.

  // Definiendo una función llamada "handleChange".
  // Esta función se utiliza para manejar los cambios en los campos de entrada del formulario.
  // Utiliza el operador spread para crear una copia del estado "values" y actualiza el valor correspondiente según el nombre del campo de entrada.

  // Definiendo una función llamada "handleImage".
  // Esta función se utiliza para manejar la selección de una imagen para cargar.
  // Obtiene el archivo de imagen seleccionado y lo almacena en la variable "file".
  // Crea una URL de vista previa de la imagen utilizando la función window.URL.createObjectURL y la establece en el estado "preview".
  // Establece el nombre del archivo en el estado "uploadButtonText".
  // Actualiza el estado "values" para indicar que se está cargando la imagen.
  // Utiliza la biblioteca de redimensionamiento Resizer para redimensionar la imagen seleccionada.
  // Realiza una solicitud POST a la ruta "/api/course/upload-image" con la imagen redimensionada.
  // Al recibir la respuesta, muestra la información en la consola y establece la imagen en el estado "image".
  // Finalmente, actualiza el estado "values" para indicar que la carga ha finalizado.

  // La función loadCourse se llama cuando se carga el componente para obtener los datos del curso.
  // Las funciones handleChange y handleImage se utilizan para manejar los cambios en los campos de entrada y la carga de imágenes, respectivamente.
  // router
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const { data } = await axios.get(`/api/user/course/${slug}`);
        setCourse(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (slug) {
      loadCourse();
    }
  }, [slug]);
  // Definiendo una función asincrónica llamada "loadCourse".
  // Esta función se utiliza para cargar los datos del curso desde el servidor.
  // Realiza una solicitud GET a la ruta "/api/course/${slug}" para obtener los datos del curso.
  // Al recibir la respuesta, se muestra en la consola para fines de depuración.
  // Si los datos existen, se establecen en el estado "values" mediante la función setValues.
  // Si los datos incluyen una imagen, se establece en el estado "image" mediante la función setImage.

  // Definiendo una función llamada "handleChange".
  // Esta función se utiliza para manejar los cambios en los campos de entrada del formulario.
  // Utiliza el operador spread para crear una copia del estado "values" y actualiza el valor correspondiente según el nombre del campo de entrada.

  // Definiendo una función llamada "handleImage".
  // Esta función se utiliza para manejar la selección de una imagen para cargar.
  // Obtiene el archivo de imagen seleccionado y lo almacena en la variable "file".
  // Crea una URL de vista previa de la imagen utilizando la función window.URL.createObjectURL y la establece en el estado "preview".
  // Establece el nombre del archivo en el estado "uploadButtonText".
  // Actualiza el estado "values" para indicar que se está cargando la imagen.
  // Utiliza la biblioteca de redimensionamiento Resizer para redimensionar la imagen seleccionada.
  // Realiza una solicitud POST a la ruta "/api/course/upload-image" con la imagen redimensionada.
  // Al recibir la respuesta, muestra la información en la consola y establece la imagen en el estado "image".
  // Finalmente, actualiza el estado "values" para indicar que la carga ha finalizado.

  // La función loadCourse se llama cuando se carga el componente para obtener los datos del curso.
  // Las funciones handleChange y handleImage se utilizan para manejar los cambios en los campos de entrada y la carga de imágenes, respectivamente.
  useEffect(() => {
    const loadCompletedLessons = async () => {
      const { data } = await axios.post(`/api/list-completed`, {
        courseId: course._id,
      });
      console.log("LECCIONES COMPLETADAS : ", data);
      console.log("Cantidad de lecciones completadas: ", data.length);
      console.log("Cantidad total de lecciones: ", course.lessons.length);
      setCompletedLessons(data);
    };

    if (course) {
      loadCompletedLessons();
    }
  }, [course]);
  // Definiendo una función asincrónica llamada "loadCourse".
  // Esta función se utiliza para cargar los datos del curso desde el servidor.
  // Realiza una solicitud GET a la ruta "/api/course/${slug}" para obtener los datos del curso.
  // Al recibir la respuesta, se muestra en la consola para fines de depuración.
  // Si los datos existen, se establecen en el estado "values" mediante la función setValues.
  // Si los datos incluyen una imagen, se establece en el estado "image" mediante la función setImage.

  // Definiendo una función llamada "handleChange".
  // Esta función se utiliza para manejar los cambios en los campos de entrada del formulario.
  // Utiliza el operador spread para crear una copia del estado "values" y actualiza el valor correspondiente según el nombre del campo de entrada.

  // Definiendo una función llamada "handleImage".
  // Esta función se utiliza para manejar la selección de una imagen para cargar.
  // Obtiene el archivo de imagen seleccionado y lo almacena en la variable "file".
  // Crea una URL de vista previa de la imagen utilizando la función window.URL.createObjectURL y la establece en el estado "preview".
  // Establece el nombre del archivo en el estado "uploadButtonText".
  // Actualiza el estado "values" para indicar que se está cargando la imagen.
  // Utiliza la biblioteca de redimensionamiento Resizer para redimensionar la imagen seleccionada.
  // Realiza una solicitud POST a la ruta "/api/course/upload-image" con la imagen redimensionada.
  // Al recibir la respuesta, muestra la información en la consola y establece la imagen en el estado "image".
  // Finalmente, actualiza el estado "values" para indicar que la carga ha finalizado.

  // La función loadCourse se llama cuando se carga el componente para obtener los datos del curso.
  // Las funciones handleChange y handleImage se utilizan para manejar los cambios en los campos de entrada y la carga de imágenes, respectivamente.
  const markIncomplete = async () => {
    try {
      const { data } = await axios.post(`/api/mark-incomplete`, {
        courseId: course._id,
        lessonId: selectedLessonId, // Utilizar el ID de la lección seleccionada
      });
      console.log(data);
      const all = completedLessons;
      const index = all.indexOf(selectedLessonId);
      if (index > -1) {
        all.splice(index, 1);
        setCompletedLessons(all);
        setUpdateState(!updateState);
      }
    }
    catch (error) {
      console.log(error);
    }


  };
  // Definiendo una función asincrónica llamada "loadCourse".
  // Esta función se utiliza para cargar los datos del curso desde el servidor.
  // Realiza una solicitud GET a la ruta "/api/course/${slug}" para obtener los datos del curso.
  // Al recibir la respuesta, se muestra en la consola para fines de depuración.
  // Si los datos existen, se establecen en el estado "values" mediante la función setValues.
  // Si los datos incluyen una imagen, se establece en el estado "image" mediante la función setImage.

  // Definiendo una función llamada "handleChange".
  // Esta función se utiliza para manejar los cambios en los campos de entrada del formulario.
  // Utiliza el operador spread para crear una copia del estado "values" y actualiza el valor correspondiente según el nombre del campo de entrada.

  // Definiendo una función llamada "handleImage".
  // Esta función se utiliza para manejar la selección de una imagen para cargar.
  // Obtiene el archivo de imagen seleccionado y lo almacena en la variable "file".
  // Crea una URL de vista previa de la imagen utilizando la función window.URL.createObjectURL y la establece en el estado "preview".
  // Establece el nombre del archivo en el estado "uploadButtonText".
  // Actualiza el estado "values" para indicar que se está cargando la imagen.
  // Utiliza la biblioteca de redimensionamiento Resizer para redimensionar la imagen seleccionada.
  // Realiza una solicitud POST a la ruta "/api/course/upload-image" con la imagen redimensionada.
  // Al recibir la respuesta, muestra la información en la consola y establece la imagen en el estado "image".
  // Finalmente, actualiza el estado "values" para indicar que la carga ha finalizado.

  // La función loadCourse se llama cuando se carga el componente para obtener los datos del curso.
  // Las funciones handleChange y handleImage se utilizan para manejar los cambios en los campos de entrada y la carga de imágenes, respectivamente.
  const markCompleted = async () => {
    const { data } = await axios.post(`/api/mark-completed`, {
      courseId: course._id,
      lessonId: selectedLessonId, // Utilizar el ID de la lección seleccionada
    });
    console.log(data);
    setCompletedLessons([...completedLessons, selectedLessonId]);
  };

  // Definiendo una función asincrónica llamada "loadCourse".
  // Esta función se utiliza para cargar los datos del curso desde el servidor.
  // Realiza una solicitud GET a la ruta "/api/course/${slug}" para obtener los datos del curso.
  // Al recibir la respuesta, se muestra en la consola para fines de depuración.
  // Si los datos existen, se establecen en el estado "values" mediante la función setValues.
  // Si los datos incluyen una imagen, se establece en el estado "image" mediante la función setImage.

  // Definiendo una función llamada "handleChange".
  // Esta función se utiliza para manejar los cambios en los campos de entrada del formulario.
  // Utiliza el operador spread para crear una copia del estado "values" y actualiza el valor correspondiente según el nombre del campo de entrada.

  // Definiendo una función llamada "handleImage".
  // Esta función se utiliza para manejar la selección de una imagen para cargar.
  // Obtiene el archivo de imagen seleccionado y lo almacena en la variable "file".
  // Crea una URL de vista previa de la imagen utilizando la función window.URL.createObjectURL y la establece en el estado "preview".
  // Establece el nombre del archivo en el estado "uploadButtonText".
  // Actualiza el estado "values" para indicar que se está cargando la imagen.
  // Utiliza la biblioteca de redimensionamiento Resizer para redimensionar la imagen seleccionada.
  // Realiza una solicitud POST a la ruta "/api/course/upload-image" con la imagen redimensionada.
  // Al recibir la respuesta, muestra la información en la consola y establece la imagen en el estado "image".
  // Finalmente, actualiza el estado "values" para indicar que la carga ha finalizado.

  // La función loadCourse se llama cuando se carga el componente para obtener los datos del curso.
  // Las funciones handleChange y handleImage se utilizan para manejar los cambios en los campos de entrada y la carga de imágenes, respectivamente.
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleCollapsedQuestionBar = () => {
    setCollapsedQuestionBar(!collapsedQuestionBar);
  };

  const handleLessonClick = (lessonIndex) => {
    const lesson = course.lessons[lessonIndex];
    setClicked(lessonIndex);
    setSelectedLessonId(lesson._id);
    setShowTracking(false); // Set showTracking state to false to hide tracking content
  };
  // Definiendo una función asincrónica llamada "loadCourse".
  // Esta función se utiliza para cargar los datos del curso desde el servidor.
  // Realiza una solicitud GET a la ruta "/api/course/${slug}" para obtener los datos del curso.
  // Al recibir la respuesta, se muestra en la consola para fines de depuración.
  // Si los datos existen, se establecen en el estado "values" mediante la función setValues.
  // Si los datos incluyen una imagen, se establece en el estado "image" mediante la función setImage.

  // Definiendo una función llamada "handleChange".
  // Esta función se utiliza para manejar los cambios en los campos de entrada del formulario.
  // Utiliza el operador spread para crear una copia del estado "values" y actualiza el valor correspondiente según el nombre del campo de entrada.

  // Definiendo una función llamada "handleImage".
  // Esta función se utiliza para manejar la selección de una imagen para cargar.
  // Obtiene el archivo de imagen seleccionado y lo almacena en la variable "file".
  // Crea una URL de vista previa de la imagen utilizando la función window.URL.createObjectURL y la establece en el estado "preview".
  // Establece el nombre del archivo en el estado "uploadButtonText".
  // Actualiza el estado "values" para indicar que se está cargando la imagen.
  // Utiliza la biblioteca de redimensionamiento Resizer para redimensionar la imagen seleccionada.
  // Realiza una solicitud POST a la ruta "/api/course/upload-image" con la imagen redimensionada.
  // Al recibir la respuesta, muestra la información en la consola y establece la imagen en el estado "image".
  // Finalmente, actualiza el estado "values" para indicar que la carga ha finalizado.

  // La función loadCourse se llama cuando se carga el componente para obtener los datos del curso.
  // Las funciones handleChange y handleImage se utilizan para manejar los cambios en los campos de entrada y la carga de imágenes, respectivamente.
  const handleQuestionClick = (questionId) => {
    setClickedQuestionBar(questionId);
    setCurrentQuestion(course.questions[questionId]);
    setQuestionModalVisible(true);
  };

  const renderMenuItems = () => {
    return course.lessons.map((lesson, index) => (
      <Item
        onClick={() => handleLessonClick(index)}
        key={lesson.id}
        icon={<Avatar>{index + 1}</Avatar>}
      >
        {lesson.title.substring(0, 30)}
        {completedLessons.includes(lesson._id)
          ? (<CheckCircleOutlined className="float-right text-primary mt-3 ml-2 
                    style={{marginTop: '13px'}}" />)
          : (<MinusCircleFilled className="float-right text-danger mt-3 ml-2 
                    style={{marginTop: '13px'}}" />)
        }
      </Item>
    ));
  };
  // Definiendo una función asincrónica llamada "loadCourse".
  // Esta función se utiliza para cargar los datos del curso desde el servidor.
  // Realiza una solicitud GET a la ruta "/api/course/${slug}" para obtener los datos del curso.
  // Al recibir la respuesta, se muestra en la consola para fines de depuración.
  // Si los datos existen, se establecen en el estado "values" mediante la función setValues.
  // Si los datos incluyen una imagen, se establece en el estado "image" mediante la función setImage.

  // Definiendo una función llamada "handleChange".
  // Esta función se utiliza para manejar los cambios en los campos de entrada del formulario.
  // Utiliza el operador spread para crear una copia del estado "values" y actualiza el valor correspondiente según el nombre del campo de entrada.

  // Definiendo una función llamada "handleImage".
  // Esta función se utiliza para manejar la selección de una imagen para cargar.
  // Obtiene el archivo de imagen seleccionado y lo almacena en la variable "file".
  // Crea una URL de vista previa de la imagen utilizando la función window.URL.createObjectURL y la establece en el estado "preview".
  // Establece el nombre del archivo en el estado "uploadButtonText".
  // Actualiza el estado "values" para indicar que se está cargando la imagen.
  // Utiliza la biblioteca de redimensionamiento Resizer para redimensionar la imagen seleccionada.
  // Realiza una solicitud POST a la ruta "/api/course/upload-image" con la imagen redimensionada.
  // Al recibir la respuesta, muestra la información en la consola y establece la imagen en el estado "image".
  // Finalmente, actualiza el estado "values" para indicar que la carga ha finalizado.

  // La función loadCourse se llama cuando se carga el componente para obtener los datos del curso.
  // Las funciones handleChange y handleImage se utilizan para manejar los cambios en los campos de entrada y la carga de imágenes, respectivamente.
  const renderQuestionBarItems = () => {
    return course.questions.map((question, index) => (
      <Item
        onClick={() => handleQuestionClick(index)}
        key={question.id}
        icon={<Avatar>{index + 1}</Avatar>}
      >
        {question.title.substring(0, 30)}
      </Item>
    ));
  };

  const renderContent = () => {
    if (clicked !== -1) {
      const lesson = course.lessons[clicked];
      return (
        <>
          <div className="col alert alert-primary square">
            <b>{course.lessons[clicked].title.substring(0, 30)}</b>
            {completedLessons.includes(course.lessons[clicked]._id) ? (
              <span className="float-right pointer" onClick={markIncomplete}>
                Marcar como Incompleto
              </span>
            ) : (
              <span className="float-right pointer" onClick={markCompleted}>
                Marcar como Completo
              </span>
            )}
          </div>
          {lesson?.video?.Location ? (
            <div className="wrapper">
              <ReactPlayer
                className="player"
                url={lesson.video.Location}
                width="650px"
                height="500px"
                controls
                onError={handleVideoError}
                onEnded={() => markCompleted()}
              />
            </div>
          ) : (
            <p>No hay video disponible para esta lección.</p>
          )}

          <ReactMarkdown className="single-post">{lesson.content}</ReactMarkdown>
        </>
      );
    } else {
      return (
        <div className="d-flex justify-content-center p-5">
          <div className="text-center p-5">
            <PlayCircleOutlined className="text-primary display-1 p-5" />
            <p className="lead">Haz clic en las lecciones para comenzar a aprender</p>
          </div>
        </div>
      );
    }
  };
  // Definiendo una función asincrónica llamada "loadCourse".
  // Esta función se utiliza para cargar los datos del curso desde el servidor.
  // Realiza una solicitud GET a la ruta "/api/course/${slug}" para obtener los datos del curso.
  // Al recibir la respuesta, se muestra en la consola para fines de depuración.
  // Si los datos existen, se establecen en el estado "values" mediante la función setValues.
  // Si los datos incluyen una imagen, se establece en el estado "image" mediante la función setImage.

  // Definiendo una función llamada "handleChange".
  // Esta función se utiliza para manejar los cambios en los campos de entrada del formulario.
  // Utiliza el operador spread para crear una copia del estado "values" y actualiza el valor correspondiente según el nombre del campo de entrada.

  // Definiendo una función llamada "handleImage".
  // Esta función se utiliza para manejar la selección de una imagen para cargar.
  // Obtiene el archivo de imagen seleccionado y lo almacena en la variable "file".
  // Crea una URL de vista previa de la imagen utilizando la función window.URL.createObjectURL y la establece en el estado "preview".
  // Establece el nombre del archivo en el estado "uploadButtonText".
  // Actualiza el estado "values" para indicar que se está cargando la imagen.
  // Utiliza la biblioteca de redimensionamiento Resizer para redimensionar la imagen seleccionada.
  // Realiza una solicitud POST a la ruta "/api/course/upload-image" con la imagen redimensionada.
  // Al recibir la respuesta, muestra la información en la consola y establece la imagen en el estado "image".
  // Finalmente, actualiza el estado "values" para indicar que la carga ha finalizado.

  // La función loadCourse se llama cuando se carga el componente para obtener los datos del curso.
  // Las funciones handleChange y handleImage se utilizan para manejar los cambios en los campos de entrada y la carga de imágenes, respectivamente.

  const handleVideoError = () => {
    setError("Error al cargar el video");
  };

  const handleQuestionModalClose = () => {
    setQuestionModalVisible(false);
    setCurrentQuestion(null);
    setSelectedAnswer(null);
  };

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);

  };

  const validateAnswers = () => {
    const { answer } = currentQuestion;
    if (answer == currentQuestion.options.indexOf(selectedAnswer)) {
      message.success("Respuesta correcta");
    } else {
      message.error("Respuesta incorrecta");
    }
    console.log("Indice respuesta correcta: ", answer);
    console.log("Tu Seleccionaste: ", currentQuestion.options.indexOf(selectedAnswer));
  };
  return (
    <StudentRoute>
      <div className="row">
        <div style={{ width: 320 }}>
          <Button type="primary" onClick={() => setShowTracking(true)} style={{ width: "100%" }}>
            Show Tracking
          </Button>
          <Button onClick={toggleCollapsed} className="text-primary mt-1 btn-block mb-2">
            {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)} {!collapsed && "Lecciones"}
          </Button>
          <Menu defaultSelectedKeys={[clicked]} inlineCollapsed={collapsed} style={{ height: "80vh", overflow: "scroll" }}>
            {renderMenuItems()}
          </Menu>
        </div>

        <div className="col">
          {error && <div className="error">{error}</div>}
          {!error && !showTracking && renderContent()}
          {showTracking && (
            <>
              <CompletionSection
                completionPercentage={((completedLessons.length / course.lessons.length) * 100).toFixed(2)}
              />
              <GradeSection
                currentGrade={((completedLessons.length / course.lessons.length) * 100).toFixed(2)}
              />
            </>
          )}
        </div>

        <div style={{ width: 250 }}>
          <Button onClick={toggleCollapsedQuestionBar} className="text-primary mt-1 btn-block mb-2">
            {createElement(collapsedQuestionBar ? MenuUnfoldOutlined : MenuFoldOutlined)} {!collapsedQuestionBar && "Evaluaciones"}
          </Button>
          <Menu
            defaultSelectedKeys={[clickedQuestionBar]}
            inlineCollapsed={collapsedQuestionBar}
            style={{ height: "80vh", overflow: "scroll" }}
          >
            {renderQuestionBarItems()}
          </Menu>
        </div>
      </div>

      <Modal
        title={currentQuestion?.title}
        visible={questionModalVisible}
        onCancel={handleQuestionModalClose}
        footer={[
          <Button key="cancel" onClick={handleQuestionModalClose}>
            Cancelar
          </Button>,
          <Button key="validate" type="primary" onClick={validateAnswers}>
            Validar Respuesta
          </Button>
        ]}
      >
        {currentQuestion && (
          <div>
            <h3>{currentQuestion.title}</h3>
            <p>{currentQuestion.content}</p>
            <Radio.Group
              onChange={handleAnswerChange}
              value={selectedAnswer}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {currentQuestion.options.map((option, index) => (
                <Radio key={option.id} value={option} style={{ marginBottom: '20px' }}>
                  {option}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        )}
      </Modal>
    </StudentRoute>
  );

};
// Definiendo una función asincrónica llamada "loadCourse".
// Esta función se utiliza para cargar los datos del curso desde el servidor.
// Realiza una solicitud GET a la ruta "/api/course/${slug}" para obtener los datos del curso.
// Al recibir la respuesta, se muestra en la consola para fines de depuración.
// Si los datos existen, se establecen en el estado "values" mediante la función setValues.
// Si los datos incluyen una imagen, se establece en el estado "image" mediante la función setImage.

// Definiendo una función llamada "handleChange".
// Esta función se utiliza para manejar los cambios en los campos de entrada del formulario.
// Utiliza el operador spread para crear una copia del estado "values" y actualiza el valor correspondiente según el nombre del campo de entrada.

// Definiendo una función llamada "handleImage".
// Esta función se utiliza para manejar la selección de una imagen para cargar.
// Obtiene el archivo de imagen seleccionado y lo almacena en la variable "file".
// Crea una URL de vista previa de la imagen utilizando la función window.URL.createObjectURL y la establece en el estado "preview".
// Establece el nombre del archivo en el estado "uploadButtonText".
// Actualiza el estado "values" para indicar que se está cargando la imagen.
// Utiliza la biblioteca de redimensionamiento Resizer para redimensionar la imagen seleccionada.
// Realiza una solicitud POST a la ruta "/api/course/upload-image" con la imagen redimensionada.
// Al recibir la respuesta, muestra la información en la consola y establece la imagen en el estado "image".
// Finalmente, actualiza el estado "values" para indicar que la carga ha finalizado.

// La función loadCourse se llama cuando se carga el componente para obtener los datos del curso.
// Las funciones handleChange y handleImage se utilizan para manejar los cambios en los campos de entrada y la carga de imágenes, respectivamente.
export default SingleCourse;
