import { useContext, useState } from "react";
import { Context } from "../../context";
import { Button, Form, Input, Select, Upload } from "antd";
import { UserSwitchOutlined, LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";

const { Option } = Select;

const BecomeInstructor = () => {
    // state
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { state: { user } } = useContext(Context);

    const onFinish = async (values) => {
        setLoading(true);
        toast.info("Validando información proporcionada, espere...");

        // Simular carga de 5 segundos
        await new Promise(resolve => setTimeout(resolve, 5000));

        try {
            const res = await axios.post("/api/make-instructor", values);
            console.log(res.data);
            toast.success("¡Ahora eres un instructor!");
        } catch (err) {
            console.log(err.response.status);
            toast.error("Error al convertirte en instructor. Inténtalo nuevamente.");
        }

        setLoading(false);
    };

    const validateField = (fieldName) => {
        form.validateFields([fieldName]);
    };
    // Importando los módulos necesarios desde las bibliotecas y archivos de origen.

    // Importando los hooks useState y useContext desde la biblioteca de React.

    // Importando el contexto desde el archivo "../../context" para acceder al estado global de la aplicación.

    // Importando los componentes Button, Form, Input, Select y Upload desde la biblioteca Ant Design.

    // Importando los iconos UserSwitchOutlined, LoadingOutlined y UploadOutlined desde la biblioteca Ant Design.

    // Importando el módulo axios para realizar solicitudes HTTP.

    // Importando la función toast desde la biblioteca react-toastify para mostrar notificaciones.

    // Desestructurando el objeto Option de la biblioteca Select.

    // Definiendo el componente BecomeInstructor.

    // Definiendo el estado inicial del componente mediante el hook useState.
    // Se definen las variables de estado "loading" y "form" utilizando el hook useState y se inicializan con los valores iniciales correspondientes.

    // Accediendo al estado global de la aplicación utilizando el hook useContext y desestructurando el estado "user" desde el objeto "state" del contexto.

    // Definiendo la función onFinish para manejar el envío del formulario.
    // Establece el estado "loading" como verdadero para mostrar el ícono de carga.
    // Muestra una notificación informativa indicando que se está validando la información proporcionada.
    // Simula una carga de 5 segundos utilizando la función setTimeout.
    // Realiza una solicitud POST a la ruta "/api/make-instructor" con los valores del formulario.
    // Muestra la respuesta en la consola y muestra una notificación de éxito si la solicitud se realiza correctamente.
    // En caso de error, muestra el estado de error en la consola y muestra una notificación de error.
    // Establece el estado "loading" como falso para ocultar el ícono de carga.

    // Definiendo la función validateField para validar un campo específico del formulario.
    // Utiliza el método validateFields de la instancia del formulario para validar el campo especificado.

    // Definiendo la función renderConvertirInstructor para renderizar el formulario de conversión a instructor.
    // Utiliza el componente Form de Ant Design para crear un formulario.
    // Define varios campos del formulario con sus respectivas reglas de validación y elementos de entrada.
    // Muestra un botón de carga de archivo utilizando el componente Upload y el botón Button de Ant Design.
    // Utiliza el componente Select de Ant Design para crear un campo de selección de opciones.
    // Muestra un botón de envío del formulario utilizando el componente Button de Ant Design.
    // El botón muestra un ícono de carga si el estado "loading" es verdadero.

    // Renderizando el contenido del componente BecomeInstructor.
    // Muestra un encabezado jumbotron y un mensaje introductorio.
    // Si el usuario ya es un instructor, muestra un mensaje indicando que ya es un instructor.
    // Si no es un instructor, muestra el formulario de conversión a instructor utilizando la función renderConvertirInstructor.

    // Finalmente, se exporta el componente BecomeInstructor.
    const renderConvertirInstructor = () => (
        <Form form={form} name="convertirInstructorForm" onFinish={onFinish} layout="vertical">
            <Form.Item
                label="Nombres completos"
                name="fullNames"
                rules={[
                    {
                        required: true,
                        message: "Por favor, ingresa tus nombres completos",
                    },
                ]}
                hasFeedback
                validateTrigger="onBlur"
            >
                <Input placeholder="Nombres completos" onBlur={() => validateField("fullNames")} />
            </Form.Item>

            <Form.Item
                label="Apellidos"
                name="lastNames"
                rules={[
                    {
                        required: true,
                        message: "Por favor, ingresa tus apellidos",
                    },
                ]}
                hasFeedback
                validateTrigger="onBlur"
            >
                <Input placeholder="Apellidos" onBlur={() => validateField("lastNames")} />
            </Form.Item>

            <Form.Item
                label="Grado académico"
                name="academicDegree"
                rules={[
                    {
                        required: true,
                        message: "Por favor, selecciona tu grado académico",
                    },
                ]}
                hasFeedback
                validateTrigger="onBlur"
            >
                <Select placeholder="Selecciona tu grado académico" onBlur={() => validateField("academicDegree")}>
                    <Option value="bachiller">Bachiller</Option>
                    <Option value="licenciado">Licenciado</Option>
                    <Option value="maestro">Maestro</Option>
                    <Option value="doctor">Doctor</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Correo electrónico"
                name="email"
                rules={[
                    {
                        required: true,
                        message: "Por favor, ingresa tu correo electrónico",
                    },
                    {
                        type: "email",
                        message: "Por favor, ingresa un correo electrónico válido",
                    },
                ]}
                hasFeedback
                validateTrigger="onBlur"
            >
                <Input placeholder="Correo electrónico" onBlur={() => validateField("email")} />
            </Form.Item>

            <Form.Item
                label="Currículum (CV)"
                name="cv"
                rules={[
                    {
                        required: true,
                        message: "Por favor, sube tu currículum",
                    },
                ]}
            >
                <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />} block>
                        Subir currículum
                    </Button>
                </Upload>
            </Form.Item>

            <Form.Item
                label="Años de experiencia como instructor"
                name="yearsOfExperience"
                rules={[
                    {
                        required: true,
                        message: "Por favor, selecciona la cantidad de años de experiencia",
                    },
                ]}
                hasFeedback
                validateTrigger="onBlur"
            >
                <Select placeholder="Selecciona la cantidad de años de experiencia" onBlur={() => validateField("yearsOfExperience")}>
                    <Option value="1">1 año</Option>
                    <Option value="2">2 años</Option>
                    <Option value="3">3 años</Option>
                    <Option value="4">4 años</Option>
                    <Option value="5+">Más de 5 años</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    block
                    shape="round"
                    icon={loading ? <LoadingOutlined /> : null}
                    size="large"
                    htmlType="submit"
                    disabled={loading}
                >
                    {loading ? "Procesando..." : "Conviértete en instructor"}
                </Button>
            </Form.Item>
        </Form>
    );


    // Importando la función toast desde la biblioteca react-toastify para mostrar notificaciones.

    // Desestructurando el objeto Option de la biblioteca Select.

    // Definiendo el componente BecomeInstructor.

    // Definiendo el estado inicial del componente mediante el hook useState.
    // Se definen las variables de estado "loading" y "form" utilizando el hook useState y se inicializan con los valores iniciales correspondientes.

    // Accediendo al estado global de la aplicación utilizando el hook useContext y desestructurando el estado "user" desde el objeto "state" del contexto.

    // Definiendo la función onFinish para manejar el envío del formulario.
    // Establece el estado "loading" como verdadero para mostrar el ícono de carga.
    // Muestra una notificación informativa indicando que se está validando la información proporcionada.
    // Simula una carga de 5 segundos utilizando la función setTimeout.
    // Realiza una solicitud POST a la ruta "/api/make-instructor" con los valores del formulario.
    // Muestra la respuesta en la consola y muestra una notificación de éxito si la solicitud se realiza correctamente.
    // En caso de error, muestra el estado de error en la consola y muestra una notificación de error.
    // Establece el estado "loading" como falso para ocultar el ícono de carga.

    // Definiendo la función validateField para validar un campo específico del formulario.
    // Utiliza el método validateFields de la instancia del formulario para validar el campo especificado.

    // Definiendo la función renderConvertirInstructor para renderizar el formulario de conversión a instructor.
    // Utiliza el componente Form de Ant Design para crear un formulario.
    // Define varios campos del formulario con sus respectivas reglas de validación y elementos de entrada.
    // Muestra un botón de carga de archivo utilizando el componente Upload y el botón Button de Ant Design.
    // Utiliza el componente Select de Ant Design para crear un campo de selección de opciones.
    // Muestra un botón de envío del formulario utilizando el componente Button de Ant Design.
    // El botón muestra un ícono de carga si el estado "loading" es verdadero.


    return (
        <>
            <h1 className="jumbotron text-center square">Conviértete en instructor</h1>

            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 text-center">
                        <div className="pt-4">
                            <UserSwitchOutlined className="display-1 pb-3" />
                            <br />
                            <h2>Conviértete en instructor en LearnHub</h2>
                            <p className="lead">
                                ¡Únete a nuestro equipo de instructores y comparte tus conocimientos con nuestra comunidad!
                            </p>

                            {user?.role?.includes("Instructor") ? (
                                <p className="lead">
                                    ¡Ya eres un instructor! Comienza a crear tus cursos y ayudar a otros a aprender.
                                </p>
                            ) : (
                                renderConvertirInstructor()
                            )}

                            <p className="lead">
                                ¡Comienza a crear tus cursos y ayudar a otros a aprender!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
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

// Renderizando el contenido del componente BecomeInstructor.
// Muestra un encabezado jumbotron y un mensaje introductorio.
// Si el usuario ya es un instructor, muestra un mensaje indicando que ya es un instructor.
// Si no es un instructor, muestra el formulario de conversión a instructor utilizando la función renderConvertirInstructor.

// Finalmente, se exporta el componente BecomeInstructor.
export default BecomeInstructor;