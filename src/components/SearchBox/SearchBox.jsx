import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNameFilter, changeFilter } from "../../redux/filter/slice";
import css from "./SearchBox.module.css";

export default function SearchBox() {
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.searchBox}>
      <input
        className={css.input}
        type="text"
        value={filter}
        onChange={handleChange}
        placeholder="Find contacts by name..."
      />
    </div>
  );
}
