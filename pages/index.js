import axios from "axios"; // Importamos el módulo axios para realizar solicitudes HTTP
import CourseCard from "../components/cards/CourseCard"; // Importamos el componente CourseCard desde la ruta especificada

const Index = ({ courses }) => {
    return (
        <>
            <h1 className="jumbotron text-center bg-primary square" style={{ height: "180px" }}>
                <img src="/logo.png" alt="Logo LearnHub" style={{ marginTop: "-50px" }} />
            </h1>
            <div className="container-fluid">
                <div className="row">
                    {courses.map((course) => ( // Iteramos sobre la lista de cursos y generamos un componente CourseCard para cada uno
                        <div key={course._id} className="col-md-4">
                            <div className="border rounded p-3">
                                <CourseCard course={course} /> {/* Pasamos el curso como prop al componente CourseCard */}
                            </div>
                            <br />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export async function getServerSideProps() { // Función que se ejecuta en el servidor antes de renderizar la página
    const { data } = await axios.get(`${process.env.API}/courses`); // Realizamos una solicitud GET a la API para obtener los cursos
    return {
        props: {
            courses: data, // Pasamos los cursos obtenidos como props al componente Index
        },
    };
}

export default Index; // Exportamos el componente Index como el componente por defecto de este archivo
