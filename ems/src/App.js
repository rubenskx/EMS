import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomeUI, { loader as homePageLoader} from "./pages/HomeUI";
import LoginPage from "./pages/LoginPage";
import Forgotpassword from "./pages/forgotpassword";
import Otp from "./pages/otp";
import ExcelUpload from "./pages/ExcelUpload";
import SearchPage, {loader as searchPageLoader} from "./pages/SearchPage";
import {action as searchFormAction} from "./components/SearchForm";
import RequireAuth from "./components/RequireAuth";
import NotificationPage, {
  loader as notificationsLoader,
} from "./pages/NotificationPage";
import SalaryIncrement from "./pages/SalaryIncrement";
import IndividualUpload, {action as addEmployeeAction, loader as formDetailsLoader} from "./pages/IndividualUpload";
import ShowPage from "./pages/ShowPage";
import EditEmployee, {loader as editLoaderData, action as editShowData } from "./pages/EditEmployee";
import RemoveAuth from "./components/RemoveAuth";
import ShowPageUI, {loader as showpageloader} from "./pages/ShowPageUI";
const router = createBrowserRouter([
  {
    path: "login/",
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "forgotpassword",
        element: <Forgotpassword />,
      },
      {
        path: "verifyotp",
        element: <Otp />,
      },
    ],
  },
  {
    path: "logout",
    element: <RemoveAuth />,
  },
  {
    path: "/",
    element: <RequireAuth />,
    children: [
      {
        index: true,
        element: <HomeUI />,
        loader: homePageLoader,
      },
      {
        path: "excel",
        element: <ExcelUpload />,
      },
      {
        path: "search-form",
        children: [
          {
            index: true,
            element: <SearchPage />,
            action: searchFormAction,
            loader: searchPageLoader,
          },
          {
            path: ":id",
            id: "employee-detail",
            children: [
              {
                index: true,
                element: <ShowPageUI />,
                loader: showpageloader,
              },
              {
                path: "edit",
                element: <EditEmployee />,
                loader: editLoaderData,
                action: editShowData,
              },
            ],
          },
        ],
      },
      {
        path: "increment",
        element: <SalaryIncrement />,
      },
      {
        path: "notifications",
        element: <NotificationPage />,
        loader: notificationsLoader,
      },
      {
        path: "upload",
        element: <IndividualUpload />,
        action: addEmployeeAction,
        loader: formDetailsLoader,
      },
      {
        path: "employee",
        children: [
          {
            index: true,
            element: <ShowPage />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
