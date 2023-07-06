import { useState, useEffect } from "react"; // Importa las funciones useState y useEffect desde la biblioteca "react"
import axios from "axios"; // Importa el módulo axios para realizar solicitudes HTTP
import InstructorRoute from "../../../../components/routes/InstructorRoute"; // Importa el componente InstructorRoute desde la ruta especificada
import CourseCreateForm from "../../../../components/forms/CourseCreateForm"; // Importa el componente CourseCreateForm desde la ruta especificada
import Resizer from "react-image-file-resizer"; // Importa el componente Resizer desde la biblioteca "react-image-file-resizer"
import { toast } from "react-toastify"; // Importa el módulo toast desde la biblioteca "react-toastify"
import { useRouter } from "next/router"; // Importa la función useRouter desde la biblioteca "next/router"
import { List, Avatar, Modal } from "antd"; // Importa los componentes List, Avatar y Modal desde la biblioteca "antd"
import { DeleteOutlined } from "@ant-design/icons"; // Importa el icono DeleteOutlined desde la biblioteca "@ant-design/icons"
import UpdateLessonForm from "../../../../components/forms/UpdateLessonForm"; // Importa el componente UpdateLessonForm desde la ruta especificada


const { Item } = List;

const CourseEdit = () => {
    // estado
    const [values, setValues] = useState({
        // Definiendo el estado inicial del componente usando el hook useState.
        // El estado contiene valores para el nombre, descripción, precio, estado de carga, etc.

        // Utilizando el hook useState para crear una variable de estado llamada "values".
        // "values" se inicializa con un objeto que contiene varias propiedades como name, description, price, etc.

        // Estableciendo los valores iniciales para el estado.
        // El nombre se inicializa como una cadena vacía, la descripción como una cadena vacía, el precio como "9.99", etc.

        // Definiendo el estado de subida como falso.
        // Esto indica que no se está realizando una subida de datos en este momento.

        // Estableciendo la propiedad "paid" como verdadera.
        // Indica que el curso tiene un costo y debe ser pagado.

        // Estableciendo la categoría como una cadena vacía.
        // La categoría del curso aún no se ha seleccionado.

        // Definiendo el estado de carga como falso.
        // Indica que no se está cargando ningún dato en este momento.

        // El estado de "lessons" se inicializa como un arreglo vacío.
        // Esto indica que no hay lecciones asociadas al curso en este momento.
        name: "",
        description: "",
        price: "9.99",
        uploading: false,
        paid: true,
        category: "",
        loading: false,
        lessons: [],
    });
    const [image, setImage] = useState({});
    const [preview, setPreview] = useState("");
    const [uploadButtonText, setUploadButtonText] = useState("Subir imagen");

    // estado para la actualización de las lecciones
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState({});
    const [uploadVideoButtonText, setUploadVideoButtonText] = useState(
        "Subir video"
    );
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);

    // router
    const router = useRouter();
    const { slug } = router.query;
    // Utilizando el hook useState para crear una variable de estado llamada "image".
    // "image" se inicializa como un objeto vacío para almacenar información sobre la imagen seleccionada.

    // Utilizando el hook useState para crear una variable de estado llamada "preview".
    // "preview" se inicializa como una cadena vacía para almacenar la URL de vista previa de la imagen.

    // Utilizando el hook useState para crear una variable de estado llamada "uploadButtonText".
    // "uploadButtonText" se inicializa como "Subir imagen" para el texto del botón de carga de imagen.

    // Definiendo el estado de "visible" como falso.
    // Indica si la ventana modal para actualizar las lecciones es visible o no.

    // Utilizando el hook useState para crear una variable de estado llamada "current".
    // "current" se inicializa como un objeto vacío para almacenar información sobre la lección actual.

    // Utilizando el hook useState para crear una variable de estado llamada "uploadVideoButtonText".
    // "uploadVideoButtonText" se inicializa como "Subir video" para el texto del botón de carga de video.

    // Utilizando el hook useState para crear una variable de estado llamada "progress".
    // "progress" se inicializa como 0 para representar el progreso de carga del video.

    // Definiendo el estado de "uploading" como falso.
    // Indica si se está realizando una carga de video en este momento.

    // Accediendo al enrutador de Next.js mediante el hook useRouter.
    // Almacenando la ruta actual en la variable "slug" mediante el objeto "router".

    // El enrutador se utiliza para obtener información sobre la ruta actual y gestionar la navegación entre páginas.

    useEffect(() => {
        loadCourse();
    }, [slug]);

    const loadCourse = async () => {
        const { data } = await axios.get(`/api/course/${slug}`);
        console.log(data);
        if (data) setValues(data);
        if (data?.image) setImage(data.image);
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        let file = e.target.files[0];
        setPreview(window.URL.createObjectURL(file));
        setUploadButtonText(file.name);
        setValues({ ...values, loading: true });
        // redimensionar
        Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
            try {
                let { data } = await axios.post("/api/course/upload-image", {
                    image: uri,
                });
                console.log("IMAGEN SUBIDA", data);
                // establecer la imagen en el estado
                setImage(data);
                setValues({ ...values, loading: false });
            } catch (err) {
                console.log(err);
                setValues({ ...values, loading: false });
                toast("Error en la carga de la imagen. Inténtalo más tarde.");
            }
        });
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

    const handleImageRemove = async () => {
        try {
            setValues({ ...values, loading: true });
            const res = await axios.post("/api/course/remove-image", { image });
            setImage({});
            setPreview("");
            setUploadButtonText("Subir imagen");
            setValues({ ...values, loading: false });
            console.log(res);
        } catch (err) {
            console.log(err);
            setValues({ ...values, loading: false });
            toast("Error en la carga de la imagen. Inténtalo más tarde.");
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/course/${slug}`, {
                ...values,
                image,
            });
            toast("¡Curso actualizado!");
            console.log(data);
            router.push(`/instructor/course/view/${slug}`);
        } catch (err) {
            toast(err.response.data);
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
    const handleDrag = (e, index) => {
        e.dataTransfer.setData("itemIndex", index);
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
    const handleDrop = async (e, index) => {
        const movingItemIndex = e.dataTransfer.getData("itemIndex");
        const targetItemIndex = index;
        let allLessons = values.lessons;

        let movingItem = allLessons[movingItemIndex];
        allLessons.splice(movingItemIndex, 1);
        allLessons.splice(targetItemIndex, 0, movingItem);

        setValues({ ...values, lessons: [...allLessons] });


        toast("Lecciones reorganizadas exitosamente");
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
    const handleDelete = async (index) => {
        const answer = window.confirm("¿Estás seguro de que deseas eliminar?");
        if (!answer) return;
        let allLessons = values.lessons;
        const removed = allLessons.splice(index, 1);
        setValues({ ...values, lessons: allLessons });

        const { data } = await axios.put(`/api/course/${slug}/${removed[0]._id}`);
        console.log("LECCIÓN ELIMINADA =>", data);
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
    /**
     * Funciones de actualización de las lecciones
     */

    const handleVideo = async (e) => {
        if (current?.video?.Location) {
            const res = await axios.post(
                `/api/course/video-remove/${values.instructor._id}`,
                current.video
            );
            console.log("ELIMINADO ===>", res);
        }
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
        const file = e.target.files[0];
        setUploadVideoButtonText(file.name);
        setUploading(true);

        const videoData = new FormData();
        videoData.append("video", file);
        videoData.append("courseId", values._id);

        const { data } = await axios.post(
            `/api/course/video-upload/${values.instructor._id}`,
            videoData,
            {
                onUploadProgress: (e) =>
                    setProgress(Math.round((100 * e.loaded) / e.total)),
            }
        );
        console.log(data);
        setCurrent({ ...current, video: data });
        setUploading(false);
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
    const handleUpdateLesson = async (e) => {
        e.preventDefault();
        const { data } = await axios.put(
            `/api/course/lesson/${slug}/${current._id}`,
            current
        );
        setUploadVideoButtonText("Subir video");
        setVisible(false);

        if (data.ok) {
            let arr = values.lessons;
            const index = arr.findIndex((el) => el._id === current._id);
            arr[index] = current;
            setValues({ ...values, lessons: arr });
            toast("Lección actualizada");
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
    return (
        <InstructorRoute>
            <h1 className="jumbotron text-center square">Actualizar Curso</h1>
            <div className="pt-3 pb-3">
                <CourseCreateForm
                    handleSubmit={handleSubmit}
                    handleImageRemove={handleImageRemove}
                    handleImage={handleImage}
                    handleChange={handleChange}
                    values={values}
                    setValues={setValues}
                    preview={preview}
                    uploadButtonText={uploadButtonText}
                    editPage={true}
                />
            </div>

            <hr />

            <div className="row pb-5">
                <div className="col lesson-list">
                    <h4>{values?.lessons?.length} Lecciones</h4>
                    <List
                        onDragOver={(e) => e.preventDefault()}
                        itemLayout="horizontal"
                        dataSource={values?.lessons}
                        renderItem={(item, index) => (
                            <Item
                                draggable
                                onDragStart={(e) => handleDrag(e, index)}
                                onDrop={(e) => handleDrop(e, index)}
                            >
                                <Item.Meta
                                    onClick={() => {
                                        setVisible(true);
                                        setCurrent(item);
                                    }}
                                    avatar={<Avatar>{index + 1}</Avatar>}
                                    title={item.title}
                                ></Item.Meta>

                                <DeleteOutlined
                                    onClick={() => handleDelete(index)}
                                    className="text-danger float-right"
                                />
                            </Item>
                        )}
                    ></List>
                </div>
            </div>

            <Modal
                title="Actualizar lección"
                centered
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <UpdateLessonForm
                    current={current}
                    setCurrent={setCurrent}
                    handleVideo={handleVideo}
                    handleUpdateLesson={handleUpdateLesson}
                    uploadVideoButtonText={uploadVideoButtonText}
                    progress={progress}
                    uploading={uploading}
                />
            </Modal>
        </InstructorRoute>
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
export default CourseEdit;
