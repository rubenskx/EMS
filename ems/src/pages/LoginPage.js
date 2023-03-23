import { useNavigate, useLocation } from "react-router-dom";
import ButtonUI from "../UI/ButtonUI";
import useAuth from "../hooks/useAuth";

const LoginPage = (props) => {
    const location = useLocation();
    const { setAuth } = useAuth();
    console.log( typeof setAuth);
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const authenticateHandler = (e) => {
        e.preventDefault();
        setAuth({ user : "Ruben" });
        navigate(from, { replace: true });
    }
        return <>
        <ButtonUI onClick={authenticateHandler}>
                Login
            </ButtonUI>   
            </>  
    };

export default LoginPage