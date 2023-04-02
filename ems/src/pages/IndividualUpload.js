import { useLoaderData, json, defer, Await, redirect } from "react-router-dom";
import { Suspense } from "react";
import Upload from "../components/Upload";

const SearchPage = (props) => {
  const { formdata } = useLoaderData();
  console.log("Object", formdata);
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={formdata}>
        {(loadedFormData) => <Upload method="POST" formdata={loadedFormData} />}
      </Await>
    </Suspense>
  );
};

export default SearchPage;

export async function loader({ request }) {
  return defer({
    formdata: await loadData(),
  });
}

async function loadData() {
  const response = await fetch("http://localhost:7000/upload");
  if (!response.ok) {
    // return {isError: true, message: "Could not fetch result!"};
    // throw new Response(JSON.stringify({ message: "Coulf not fetch events." }), {
    //   status: 500,
    // });
    console.log("Error!");
    return json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    console.log("array", resData.array);
    return resData.results;
  }
}

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
