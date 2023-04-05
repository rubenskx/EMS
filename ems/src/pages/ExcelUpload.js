import DragAndDrop from "../components/DragAndDrop";
import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecentEmployees from "../components/RecentEmployee";
import ButtonUI from "../UI/ButtonUI";
import ExportExcel from "../utils/ExportExcel";
import { IoIosArrowDropleft } from "react-icons/io";
import Card from "../UI/Card";
import Spinner from "../UI/Spinner";
const XLSX = require("xlsx");

const ExcelUpload = (props) => {
  const [exceldata, setData] = useState([]);
  const [error, setError] = useState("");
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(exceldata);
  }, [exceldata]);

  const parse = (excelData) => {
    return Object.keys(excelData.Sheets).map((name) => ({
      name,
      data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
    }));
  };

  const backButtonHandler = () => {
    console.log("hello!");
    setData([]);
  };

  const submitHandler = (event) => {
    const file = event.dataTransfer.files[0];
    setSpinner(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const parsedData = parse(workbook).map((element) => element.data);
      console.log(parsedData, "parsed!");
      setData(parsedData[0]);
    };
    reader.readAsArrayBuffer(file);
    setSpinner(false);
  };

  const sendDataHandler = async () => {
    console.log("hello");
    console.log(exceldata);
    const url = "http://localhost:7000/excel";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exceldata),
    });

    if (!response.ok) {
      console.log("error");
    }

    if (response.status === 401) {
      const result = await response.json();
      console.log(result);
      setError(result.message);
      return;
    }
    navigate("/");
  };

  const templateLoader = () => {
    let object = {};
    object.name = "";
    object.id = "";
    object.department = "";
    object.mobile_no = "";
    object.current_salary = "";
    object.gender = "";
    object.date_of_joining = "";
    object.qualification = "";
    object.previous_experience = "";
    object.year_of_course_completion = "";
    object.previous_designation = "";
    object.current_designation = "";
    object.retired = "";
    object.wef = "";
    object.deduction = "";
    object.remarks = "";
    object.head_engineer = "";
    object.director = "";
    object.email = "";
    object.department = "";
    object.project = "";
    let array = [];
    array.push(object);
    ExportExcel(array);
  };
  return (
    <Fragment>
      {exceldata.length > 0 && (
        <div className="mx-5 mt-2" style={{ cursor: "pointer" }}>
          <IoIosArrowDropleft size={40} onClick={() => backButtonHandler()} />
        </div>
      )}
      <div className="container mt-5">
        <Card>
          <h3>Download the template before uploading onto the website.</h3>
          {error !== "" && <p style={{ color: "red" }}>{error}</p>}
          <div style={{ textAlign: "right" }}>
            <ButtonUI color="green" onClick={() => templateLoader()}>
              Download
            </ButtonUI>
          </div>
        </Card>
        <DragAndDrop onFileDrop={submitHandler} />
        {spinner && (
          <div className="text-center">
            <Spinner />
          </div>
        )}
        {exceldata.length > 0 && (
          <div className="mt-5">
            <h2>{`Found ${exceldata.length} Employees.`}</h2>
            <div style={{ textAlign: "right" }}>
              <ButtonUI onClick={sendDataHandler}>Submit</ButtonUI>
            </div>
            <RecentEmployees employees={exceldata} />
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default ExcelUpload;
