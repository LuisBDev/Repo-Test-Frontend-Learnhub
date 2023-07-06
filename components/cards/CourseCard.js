// Importar los componentes necesarios desde el paquete "antd"
import { Card, Badge } from "antd";

// Importar el componente "Link" desde el paquete "next/link"
import Link from "next/link";

// Importar la función "currencyFormatter" desde el archivo "../../utils/helpers"
import { currencyFormatter } from "../../utils/helpers";

const CourseCard = ({ course }) => {
    // Desestructuración de la variable 'course' para obtener propiedades específicas
    const { name, instructor, price, slug, paid, category, image } = course;

    // Variable 'imageUrl' para almacenar la ubicación de la imagen del curso
    // Si la propiedad 'image' existe, se asigna su ubicación (image.Location)
    // En caso contrario, se asigna una ubicación predeterminada ("/course.png")
    const imageUrl = image ? image.Location : "/course.png";


    return (
        <Link href={`/course/${slug}`}>
            <a>
                <Card
                    className="mb-4 border"
                    cover={
                        <img
                            src={imageUrl}
                            alt={name}
                            style={{ height: "200px", objectFit: "cover" }}
                            className="p-1"
                        />
                    }
                >
                    <h2 className="font-weight-bold">{name}</h2>
                    <p>by {instructor.name}</p>
                    <Badge
                        count={category}
                        style={{ backgroundColor: "#03a9f4" }}
                        className="pb-2 mr-2"
                    />
                    <h4 className="pt-2">
                        {paid ? currencyFormatter({ amount: price, currency: "usd" }) : "Gratuito"}
                    </h4>
                </Card>
            </a>
        </Link>
    );
};

export default CourseCard;
