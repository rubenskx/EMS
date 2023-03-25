import ButtonUI from "../UI/ButtonUI";
import Card from "../UI/Card";
import ExportExcel from "../utils/ExportExcel";

const Notifications = ({ notifs }) => {
    const excelGenerator = (array) => {
            ExportExcel(array);
    }
    return (
    <>
      <div className="container">
        {notifs.map((ele) => (
          <Card> 
            Found {ele.length} employees with contract extension. 
            <div style={{ textAlign: "right"}}>
                    <ButtonUI onClick={() => excelGenerator(ele)}>
                        Export as Excel
                    </ButtonUI>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};
export default Notifications;
