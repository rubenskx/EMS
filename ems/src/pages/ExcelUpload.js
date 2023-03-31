import DragAndDrop from "../components/DragAndDrop";
import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecentEmployees from "../components/RecentEmployee";
import ButtonUI from "../UI/ButtonUI"
import ExportExcel from "../utils/ExportExcel";
import Card from "../UI/Card";
const XLSX = require("xlsx");

const ExcelUpload = (props) => {
  const [exceldata, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(exceldata)
  }, [exceldata]);

  const parse = (excelData) => {
    return Object.keys(excelData.Sheets).map((name) => ({
      name,
      data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
    }));
  };

  const submitHandler = (event) => {
    const file = event.dataTransfer.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const parsedData = parse(workbook).map((element) => element.data);
      setData(parsedData[0]);
    };
    reader.readAsArrayBuffer(file);
  };

  const sendDataHandler = async () => {
    console.log("hello");
    console.log(exceldata);
    const url = "http://localhost:7000/excel";
    const response = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(exceldata),
  });


  if (!response.ok) {
    console.log("error");
  }
  navigate("/");
  }

  const templateLoader = () => {
        let object = {};
        object.name = "";
        object.id = "";
        object.department = "";
        object.mobile_no = "";
        let array = [];
        array.push(object);
        ExportExcel(array);
  }
  return (
    <Fragment>
      <div className="container mt-5">
        <Card>
          <h3>Download the template before uploading onto the website.</h3>
          <div style={{ textAlign: "right" }}>
            <ButtonUI color="green" onClick={() => templateLoader()}>
              Download
            </ButtonUI>
          </div>
        </Card>
        <DragAndDrop onFileDrop={submitHandler} />
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

