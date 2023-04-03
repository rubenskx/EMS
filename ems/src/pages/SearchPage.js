import SearchForm from "../components/SearchForm";
import { useLoaderData, json, defer, Await, redirect } from "react-router-dom";
import { Suspense } from "react";

const SearchPage = (props) => {
  const { formdata } = useLoaderData();
  console.log("Object", formdata);
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={formdata}>
        {(loadedFormData) => (
          <SearchForm method="POST" formdata={loadedFormData} />
        )}
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

