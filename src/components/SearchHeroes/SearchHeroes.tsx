import { useState } from "react";
import { useDispatch } from "react-redux";
import { getSuperheroes, searchHeroes } from "../../actions";
import style from "./SearchHeroes.module.css";
import search from "../../assets/search/search.svg";
import cancel from "../../assets/cancel/cancel.svg";

export function SearchHeroes() {
  const [superheroe, setSuperheroe] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(searchHeroes(superheroe));
    setSuperheroe("");
  };

  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit}>
        <img className={style.search} src={search} />
        <input
          className={style.input}
          placeholder="Search"
          type="text"
          value={superheroe}
          id="searchbar"
          onChange={(e) => setSuperheroe(e.target.value)}
        />
        <img
          onClick={() => dispatch(getSuperheroes())}
          className={style.cancel}
          src={cancel}
        />
      </form>
    </div>
  );
}
