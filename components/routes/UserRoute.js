import AuthRoute from "./AuthRoute";
import UserNav from "../nav/UserNav";

const UserRoute = ({ children, showNav = true }) => {
    return (
        <AuthRoute showNav={showNav}>
            <div className="row">
                <div className="col-md-2">{showNav && <UserNav />}</div>
                <div className="col-md-10">{children}</div>
            </div>
        </AuthRoute>
    );
};

export default UserRoute;
