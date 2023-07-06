import AuthRoute from "./AuthRoute";

const StudentRoute = ({ children, showNav = true }) => {
    return <AuthRoute showNav={showNav}>{children}</AuthRoute>;
};

export default StudentRoute;
