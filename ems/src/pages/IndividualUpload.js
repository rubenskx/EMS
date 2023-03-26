import { redirect } from "react-router-dom";

import Upload from "../components/Upload";

const SearchPage = (props) => {
  return <Upload method="POST"  />;
};

export default SearchPage;

export async function action({ request, params }) {
  const data = await request.formData();
  let errors = {};
  let object = {};
  data.forEach((value, key) => (object[key] = value));
  let url = "http://localhost:7000/upload";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  });
  if (response.status === 422) {
    errors.top = response.message;
  }
  if (!response.ok) {
    errors.top = "The database cannot be accessed now. Try again!";
    return errors;
  }

  const result = await response.json();
  console.log(result);
  errors.result = result;
  return redirect("/");
}
