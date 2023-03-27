import { redirect } from "react-router-dom";

import Upload from "../components/Upload";

const EditEmployee = (props) => {
  return <Upload method="POST" type="edit"/>;
};

export default EditEmployee;