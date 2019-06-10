import React, { Component } from "react";

export default function ListGroup(props) {
  const { genres, textProperty, valueProperty, selectedItem } = props;
  return (
    <div>
      <ul className="list-group">
        
        {genres.map(genre => (
          <li
            key={genre[valueProperty]}
            className={selectedItem===genre?"list-group-item active":"list-group-item"}
            onClick={() => props.onItemSelect(genre)}
          >
            {genre[textProperty]}
          </li>
        ))}
      </ul>
    </div>
  );
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
