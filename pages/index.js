import axios from "axios";
import CourseCard from "../components/cards/CourseCard";

const Index = ({ courses }) => {
    return (
        <>
            <h1 className="jumbotron text-center bg-primary square" style={{ height: "180px" }}>
                <img src="/logo.png" alt="Logo LearnHub" style={{ marginTop: "-50px" }} />

            </h1>
            <div className="container-fluid">
                
                <div className="row">
                    {courses.map((course) => (
                        <div key={course._id} className="col-md-4">
                            <div className="border rounded p-3">
                                <CourseCard course={course} />
                            </div>
                            <br />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export async function getServerSideProps() {
    const { data } = await axios.get(`${process.env.API}/courses`);
    return {
        props: {
            courses: data,
        },
    };
}

export default Index;
