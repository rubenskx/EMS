import DragAndDrop from "../components/DragAndDrop";
import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecentEmployees from "../components/RecentEmployee";
import ButtonUI from "../UI/ButtonUI"
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
    const dummy = {id:1};
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
  return (
    <Fragment>
      <DragAndDrop onFileDrop={submitHandler} />
      {exceldata.length > 0 && (
        <div className="container mt-5">
          <h2>{`Found ${exceldata.length} Employees.`}</h2>
          <div style={{ textAlign: "right" }}>
            <ButtonUI onClick={sendDataHandler}>
              Submit
            </ButtonUI>
          </div>
          <RecentEmployees employees={exceldata} />
        </div>
      )}
    </Fragment>
  );
};
export default ExcelUpload;

