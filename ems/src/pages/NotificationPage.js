import { useLoaderData, json, defer, Await } from "react-router-dom";
import { Suspense } from "react";

import Notifications from "../components/Notifications";
function NotificationPage() {
  const { notifs } = useLoaderData();
  console.log("Object", notifs);
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={notifs}>
        {(loadedNotifs) => <Notifications notifs={loadedNotifs} />}
      </Await>
    </Suspense>
  );
}

export default NotificationPage;

export async function loader({ request }) {

  return defer({
    notifs: await loadNotifs(),
  });
}

async function loadNotifs() {
  const response = await fetch("http://localhost:7000/notifications");
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
    return resData.array;
  }
}