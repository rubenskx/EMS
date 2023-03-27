import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Forgotpassword from "./pages/forgotpassword";
import Otp from "./pages/otp";
import ExcelUpload from "./pages/ExcelUpload";
import SearchPage from "./pages/SearchPage";
import {action as searchFormAction} from "./components/SearchForm";
import RequireAuth from "./components/RequireAuth";
import NotificationPage, {
  loader as notificationsLoader,
} from "./pages/NotificationPage";
import SalaryIncrement from "./pages/SalaryIncrement";
import IndividualUpload, {action as addEmployeeAction} from "./pages/IndividualUpload";
import ShowPage from "./pages/ShowPage";
const router = createBrowserRouter([
  {
    path: "login/",
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path:"forgotpassword",
        element:<Forgotpassword/>,
      },
      {
        path:"verifyotp",
        element:<Otp/>,
      },
    ],
  },
  {
    path: "/",
    element: <RequireAuth />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
          },
          {
            path: ":id",
            id: "employee-detail",
            children: [
              {
                index: true,
                element: <ShowPage />,
              },
              {
                path: "edit",
                element: <IndividualUpload/>
              }
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
