import { useState } from "react";

export default function FetchButton() {
  const [persons, setPersons] = useState([]);
  const fetchData = (e) => {
    e.preventDefault();

    let DZ = window.dzAsyncInit();
    DZ.api("/search?q=eminem", function (response) {
      console.log("search", response);
    });
  };

  return (
    <div style={{ position: "absolute" }}>
      <a href='#' onClick={fetchData}>
        Fetch data
      </a>
      {persons.length ? (
        <ul>
          {persons.map((person) => (
            <li>{person.name}</li>
          ))}
        </ul>
      ) : (
        <div>personne</div>
      )}
    </div>
  );
}
