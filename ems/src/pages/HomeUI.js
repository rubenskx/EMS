import { useLoaderData, json, defer, Await } from "react-router-dom";
import { Suspense } from "react";
import HomePage from "../components/HomePage";

function HomeUI() {
  const { results } = useLoaderData();
  console.log("Object", results);
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={results}>
        {(loadedResults) => <HomePage results={loadedResults} />}
      </Await>
    </Suspense>
  );
}

export default HomeUI;

export async function loader({ request }) {
  return defer({
    results: await loadFacts(),
  });
}

async function loadFacts() {
  console.log("hello");
  const response = await fetch("http://localhost:7000/home");
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
    return resData.results;
  }
}
