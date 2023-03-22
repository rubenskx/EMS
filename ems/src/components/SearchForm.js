import {
  Form,
  useNavigate,
  useNavigation,
  json,
} from "react-router-dom";
import Card from "../UI/Card";
import classes from "./SearchForm.module.css";
import { useState } from "react";


function SearchForm({ method, event }) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const [searchResults , setSearchResults] = useState("undefined");
  function cancelHandler() {
    navigate("..");
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const data = new FormData(event.target);

      const eventData = {
        title: data.get("title"),
        image: data.get("image"),
        date: data.get("date"),
        description: data.get("description"),
      };

      console.log(eventData);
      let url = "http://localhost:7000/search";
      console.log(url);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.status === 422) {
        return response;
      }

      if (!response.ok) {
        throw json({ message: "Could not save event." }, { status: 500 });
      }
      const resultMessage = await response.json();
      console.log(resultMessage.message);
      setSearchResults(resultMessage.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    {searchResults === "undefined" && <Form className={classes.form} onSubmit={handleSubmit}>
      <Card>
        <p>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            required
            defaultValue={event ? event.title : ""}
          />
        </p>
        <p>
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="url"
            name="image"
            required
            defaultValue={event ? event.image : ""}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            required
            defaultValue={event ? event.date : ""}
          />
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            required
            defaultValue={event ? event.description : ""}
          />
        </p>
        <div className={classes.actions}>
          <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Card>
    </Form>}
    {
      searchResults !== "undefined" && <p>
        {searchResults}
      </p>
    }
    </>
  );
}

export default SearchForm;
