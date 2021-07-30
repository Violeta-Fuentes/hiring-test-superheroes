import { useEffect } from "react";
import { connect, RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { addFavorite, getSuperheroes, removeFavorite } from "../../actions";
import style from "./AllSuperheroes.module.css";
import logo from "../../assets/logo/logo.svg";
import { Favorites } from "../Favorites/Favorites";
import { SearchHeroes } from "../SearchHeroes/SearchHeroes";
import heart from '../../assets/medium-heart/medium-heart.svg';

export function AllSuperheroes() {
  const dispatch = useDispatch();
  const superheroes = useSelector(
    (state: RootStateOrAny) => state.allSuperheroes
  );

  useEffect(() => {
    dispatch(getSuperheroes());
    console.log(getSuperheroes());
  }, []);

  return (
    <div id={style.background}>
      <img className="position-relative start-50 mt-5" src={logo} />
      <div className={style.separation}>
        <Favorites />
      </div>
        <div className={style.spacing}>
            <div className={style.searchAlign}>
          <h1 className={style.All}>All Superheroes</h1>
          <SearchHeroes />
          </div>
          <div className="d-flex flex-wrap" id={style.cards}>
            {superheroes.map((s: any) => (
              <div onClick={() => dispatch(addFavorite({id: s.id, name: s.name, realName: s.biography.fullName, img: s.images.sm}))} className={style.container}>
                <img className={style.img} src={s.images.sm} />
                <img className={style.heart} src={heart} />
                <th>
                  <h4 className={style.color}>{s.name}</h4>
                  <p id={style.realName}>Real Name: {s.biography.fullName}</p>
                </th>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}