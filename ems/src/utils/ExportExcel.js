const XLSX = require("xlsx");

function ExportExcel(array) {
  const workSheet = XLSX.utils.json_to_sheet(array);
  const workBook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workBook, workSheet, "SEARCH RESULTS");
  XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  XLSX.writeFile(workBook, "search.xlsx");
}
export default ExportExcel;
