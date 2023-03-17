import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
const Root = (props) => {
  return (
    <>
    <NavigationBar/>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
