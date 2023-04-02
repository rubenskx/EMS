import { json, defer, Await, useRouteLoaderData, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import ShowPage from "./ShowPage";

function ShowPageUI() {
  const { results } = useLoaderData();
  console.log("Object", results);
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={results}>
        {(loadedResults) => <ShowPage results={loadedResults} />}
      </Await>
    </Suspense>
  );
}

export default ShowPageUI;

export async function loader({ request ,params }) {
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