import { Fragment, useState } from "react";
const XLSX = require("xlsx");

const ExcelUpload = (props) => {
    const [data,setData] = useState([]);
    const parse = (excelData) => {
        return Object.keys(excelData.Sheets).map((name) => ({
            name,
            data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
        }));
        };

const excelHandler = (event) => {
  event.preventDefault();
  const file = event.target.files[0];
  const array = [];
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    parse(workbook).forEach((element) => {
      array.push(element.data);
    });
  };
  reader.readAsArrayBuffer(file);
  setData(array);
};

const submitHandler = (event) => {
    event.preventDefault();
    console.log(data);

}
return (
  <Fragment>
    <form onSubmit={submitHandler}>
      <label htmlFor="excel-file">Select an Excel file:</label>
      <input
        type="file"
        id="excel-file"
        name="excel-file"
        accept=".xls,.xlsx"
        onChange={excelHandler}
      />
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </Fragment>
);

};
export default ExcelUpload;
