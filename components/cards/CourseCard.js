import { Card, Badge } from "antd";
import Link from "next/link";
import { currencyFormatter } from "../../utils/helpers";

const CourseCard = ({ course }) => {
    const { name, instructor, price, slug, paid, category, image } = course;
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
