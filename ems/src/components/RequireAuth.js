import { useLocation, Navigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Root from "../pages/Root";


const RequireAuth = () => {
    const { auth } = useAuth();
    const location  = useLocation();
    console.log(auth.user);
    return (
        auth.user ? <Root/> : <Navigate to="/login" state={{ from: location }} replace/>
    );
}

export default RequireAuth;