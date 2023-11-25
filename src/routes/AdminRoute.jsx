import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import { Navigate } from "react-router-dom";


const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    if(loading || isAdminLoading){
        return (
            <div className="h-[50vh] flex justify-center items-center">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    }

    if(user && isAdmin){
        return children
    }

    return <Navigate to="/login"></Navigate>
};

AdminRoute.propTypes = {
    children: PropTypes.node,
}

export default AdminRoute;