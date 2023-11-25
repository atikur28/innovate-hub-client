import PropTypes from "prop-types";
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useCreator from '../hooks/useCreator';
import { Navigate } from 'react-router-dom';

const CreatorRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isCreator, isCreatorLoading] = useCreator();
    if(loading || isCreatorLoading){
        return (
            <div className="h-[50vh] flex justify-center items-center">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    }

    if(user && isCreator){
        return children
    }

    return <Navigate to="/login"></Navigate>
};

CreatorRoute.propTypes = {
    children: PropTypes.node,
}

export default CreatorRoute;