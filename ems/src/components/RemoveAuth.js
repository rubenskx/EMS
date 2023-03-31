import {  Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const RemoveAuth = () => {
  const { setAuth } = useAuth();
  setAuth({});
  return <Navigate to="/login" />
};

export default RemoveAuth;
