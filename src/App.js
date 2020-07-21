import React, { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "bootstrap/dist/css/bootstrap.min.css";

import cats from "./api/cats";

const App = () => {
  const [breed, setBreed] = useState([]);
  const [image, setImage] = useState("");

  const searchBreed = (e) => {
    cats.get("breeds/search?q=" + e).then(({ data }) => {
      setBreed(data.map((breed) => breed));
    });
  };

  const onChange = (selection) => {
    if (selection[0]) {
      cats
        .get(`images/search?breed_ids=${selection[0].id}`)
        .then(({ data }) => {
          setImage(data[0].url);
        });
    }
  };

  return (
    <div>
      <AsyncTypeahead
        labelKey="name"
        onChange={onChange}
        onSearch={(e) => searchBreed(e)}
        options={breed}
        placeholder="Choose a cat breed..."
      />
      <img alt="Cat breed" height="500px" src={image} />
    </div>
  );
};

export default App;
