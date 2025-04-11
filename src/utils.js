import { useNavigate,useLocation, useParams } from "react-router-dom";
import React from 'react';

const withNavigation = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate();
        const location = useLocation();
        const params = useParams();
        return <WrappedComponent {...props} navigate={navigate} location={location} params={params} />;
    };
}

export default withNavigation