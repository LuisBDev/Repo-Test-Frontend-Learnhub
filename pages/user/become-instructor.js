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

export default BecomeInstructor;