import ButtonUI from "../UI/ButtonUI";
import Card from "../UI/Card";
import { useState } from "react";
import RecentEmployees from "../components/RecentEmployee";
import ExportExcel from "../utils/ExportExcel";
import { useNavigate } from "react-router-dom";
const SalaryIncrement = (props) => {
  const [errors, setErrors] = useState("");
  const [data, setData] = useState([]);
  const [downloadArray, setDownloadArray] = useState([]);
  const navigate = useNavigate();
  const incrementHandler = async () => {
    setData([]);
    const date_before = document.getElementById("date_before").value;
    const date_after = document.getElementById("date_after").value;
    const before = new Date(date_before);
    const after = new Date(date_after);

    if (date_before === "" || date_after === "") {
      console.log("error");
      setErrors("Please enter a valid date.");
      return;
    }
    if (before > after) {
      console.log("error");
      setErrors("Incorrect range provided.");
      return;
    }
    console.log(date_after, date_before, before, after);
    const response = await fetch(
      "http://localhost:7000/increment?" +
        new URLSearchParams({
          before: date_before,
          after: date_after,
        })
    );
    if (!response.ok) {
      setErrors(
        "There is something wrong with database right now. Please try again."
      );
      return;
    }

    const employeeData = await response.json();
    console.log(employeeData);
    setErrors("");
    setData(employeeData.empData);
  };

  const excelGenerator = () => {
    let filterData = [];
    console.log("array", downloadArray);
    console.log(data);
    for (let ele of downloadArray) {
      filterData.push(data[ele - 1]);
    }

    console.log("filtered", filterData);
    ExportExcel(filterData);
  };

  const dataFilter = (id) => {
    if (downloadArray.includes(id)) {
      let arr = downloadArray.filter((item) => item !== id);
      setDownloadArray(arr);
    } else {
      let arr = [...downloadArray];
      arr.push(id);
      setDownloadArray(arr);
    }
    // console.log(downloadArray);
  };

  const handleUpdate = async () => {
    let filterData = [];
    console.log("array", downloadArray);
    console.log(data,"data");
    filterData=data.filter((ele)=>{
      if(downloadArray.includes(ele.id)){
        return ele;
      }
    })

    const response = await fetch("http://localhost:7000/increment/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filterData),
    });
  
  if(!response.ok){
    setErrors("There is an error with the database.")
    return;
  }
  if(response.status === 422){
    setErrors("Incorrect database format.");
    return;
  }
    navigate("/",{replace: true})
  };


  return (
    <>
      <div className="container mt-5">
        <Card>
          <div>
            <h3>Enter a range for Salary Incrementation</h3>
            {errors !== "" && <p style={{ color: "red" }}>{errors}</p>}
            <div className="row mt-5">
              <p className="col-lg-4 text-center">
                <label htmlFor="date_before">
                  <b>From: </b>
                </label>
                <input
                  id="date_before"
                  type="date"
                  name="date_before"
                  placeholder="From."
                />
              </p>
              <p className="col-lg-2 text-center">-----</p>
              <p className="col-lg-4 text-center">
                <label htmlFor="date_after">
                  <b>To:</b>
                </label>
                <input id="date_after" type="date" name="date_after" />
              </p>
              <p className="col-lg-2">
                <ButtonUI onClick={incrementHandler}> Search</ButtonUI>
              </p>
            </div>
          </div>
        </Card>
        {data.length > 0 && (
          <div className="mt-5">
            <h3 className="text-center">Search Results</h3>
            <div style={{ textAlign: "right" }}>
              <ButtonUI onClick={excelGenerator} color="green">
                Export as Excel
              </ButtonUI>
              <ButtonUI onClick={handleUpdate}>Update</ButtonUI>
            </div>
            <RecentEmployees
              employees={data}
              addArray={["increment"]}
              checked="yes"
              onClick={dataFilter}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SalaryIncrement;
