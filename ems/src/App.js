
import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from './pages/HomePage';
import ExcelUpload from './pages/ExcelUpload';
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children:[
      {
        index:true,
        element: <HomePage/>,
      }, 
      {
        path:"excel",
        element: <ExcelUpload/>,
      }
    ]
  }
])
function App() {
  return <RouterProvider router={router}/>
}

export default App;
