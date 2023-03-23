import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ExcelUpload from "./pages/ExcelUpload";
import SearchPage from "./pages/SearchPage";
import RequireAuth from "./components/RequireAuth";
const router = createBrowserRouter([
  {
    path: "login",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/",
    element: <RequireAuth />
    ,
    children: [
      {
        index: true,
        element:<HomePage />
  
      },
      {
        path: "excel",
        element: <ExcelUpload />,
      },
      {
        path: "search-form",
        element: <SearchPage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
