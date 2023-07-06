import { useState } from "react";
import axios from "axios";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import CourseCreateForm from "../../../components/forms/CourseCreateForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const CourseCreate = () => {
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "9.99",
        uploading: false,
        paid: true,
        category: "",
        loading: false,
    });
    const [image, setImage] = useState({});
    const [preview, setPreview] = useState("");
    const [uploadButtonText, setUploadButtonText] = useState("Subir imagen");

    const router = useRouter();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleImage = async (e) => {
        let file = e.target.files[0];
        setPreview(window.URL.createObjectURL(file));
        setUploadButtonText(file.name);
        setValues({ ...values, loading: true });

        try {
            const uri = await resizeImageFile(file);
            let { data } = await axios.post("/api/course/upload-image", {
                image: uri,
            });
            console.log("IMAGEN SUBIDA", data);
            setImage(data);
            setValues({ ...values, loading: false });
        } catch (err) {
            console.log(err);
            setValues({ ...values, loading: false });
            toast("Error al subir la imagen. Inténtalo más tarde.");
        }
    };

    const handleImageRemove = async () => {
        try {
            setValues({ ...values, loading: true });
            await axios.post("/api/course/remove-image", { image });
            setImage({});
            setPreview("");
            setUploadButtonText("Subir imagen");
            setValues({ ...values, loading: false });
        } catch (err) {
            console.log(err);
            setValues({ ...values, loading: false });
            toast("Error al eliminar la imagen. Inténtalo más tarde.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/course", {
                ...values,
                image,
            });
            toast("¡Ya puedes subir lecciones!");
            router.push("/instructor");
            console.log(data);
        } catch (err) {
            toast(err.response.data);
        }
    };

    const resizeImageFile = (file) => {
        return new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                720,
                500,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });
    };

    return (
        <InstructorRoute>
            <h1 className="jumbotron text-center square">Crear Curso</h1>
            <div className="pt-3 pb-3">
                <CourseCreateForm
                    handleSubmit={handleSubmit}
                    handleImage={handleImage}
                    handleChange={handleChange}
                    values={values}
                    setValues={setValues}
                    preview={preview}
                    uploadButtonText={uploadButtonText}
                    handleImageRemove={handleImageRemove}
                />
            </div>
            <pre>{JSON.stringify(values, null, 4)}</pre>
            <hr />
            <pre>{JSON.stringify(image, null, 4)}</pre>
        </InstructorRoute>
    );
};

export default CourseCreate;
