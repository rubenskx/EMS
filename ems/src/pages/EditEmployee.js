import { json, defer, Await, redirect, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import CommonForm from "../components/CommonForm";

function ShowPageUI() {
  const { results } = useLoaderData();
  console.log("Object", results);
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={results}>
        {(loadedResults) => (
          <CommonForm method={"PATCH"} formdata={loadedResults} />
        )}
      </Await>
    </Suspense>
  );
}

export default ShowPageUI;

export async function loader({ request, params }) {
  const id = params.id;
  return defer({
    results: await loadEmployeeDetails(id),
  });
}

async function loadEmployeeDetails(id) {
  console.log("hello");
  const response = await fetch("http://localhost:7000/show/" + id);
  if (!response.ok) {
    console.log("Error!");
    return json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    console.log("array", resData);
    return resData.employeeData;
  }
}

export async function action({ params, request }) {
  const id = params.id;
  const data = await request.formData();
  let object = {};
  data.forEach((value, key) => (object[key] = value));
  const response = await fetch("http://localhost:7000/show/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete event." },
      {
        status: 500,
      }
    );
  }
  return redirect("/");
}
