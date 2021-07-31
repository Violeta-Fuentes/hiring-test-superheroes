import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { addFavorite, getSuperheroes, removeFavorite } from "../../actions";
import style from "./AllSuperheroes.module.css";
import logo from "../../assets/logo/logo.svg";
import { Favorites } from "../Favorites/Favorites";
import { SearchHeroes } from "../SearchHeroes/SearchHeroes";
import heart from "../../assets/medium-heart/medium-heart.svg";
import fist from "../../assets/fist/fist.svg";
import ContentLoader from "react-content-loader";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

export function AllSuperheroes() {
  const dispatch = useDispatch();
  const superheroes = useSelector(
    (state: RootStateOrAny) => state.allSuperheroes
  );
  const [loader, setLoader] = useState(true);

  const Row = () => (
    <div className="d-flex flex-wrap">
      {superheroes.map((s: any) => (
          <div
            onClick={() => {
              dispatch(removeFavorite(s.id));
              dispatch(
                addFavorite({
                  id: s.id,
                  name: s.name,
                  realName: s.biography.fullName,
                  img: s.images.sm,
                  powerstats: s.powerstats,
                })
              );
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={style.container}
          >
            <div className={style.cards}>
            <img className={style.img} src={s.images.sm} />
            <img className={style.heart} src={heart} />
            <th>
              <h4 className={style.color}>{s.name}</h4>
              <p id={style.realName}>Real Name: {s.biography.fullName}</p>
              <img className={style.fist} src={fist} />
              <span className={style.power}>
                {((100 *
                  (s.powerstats.intelligence +
                    s.powerstats.strength +
                    s.powerstats.speed +
                    s.powerstats.durability +
                    s.powerstats.power +
                    s.powerstats.combat)) %
                  600) /
                  100}
              </span>
              <span className={style.power}>/ 10</span>
            </th>
            </div>
          </div>
      ))}
    </div>
  );

  useEffect(() => {
    dispatch(getSuperheroes());
    setLoader(false);
  }, []);

  return (
    <div id={style.background}>
      {loader ? (
        <div>
          <ContentLoader
            speed={2}
            width={2750}
            height={1000}
            viewBox="0 0 1000 500"
            backgroundColor="#21053d"
            foregroundColor="#2a043e"
          >
            <rect x="-3" y="90" rx="3" ry="3" width="590" height="29" />
            <circle cx="307" cy="36" r="24" />
            <rect x="4" y="147" rx="0" ry="0" width="96" height="13" />
            <rect x="380" y="148" rx="0" ry="0" width="193" height="10" />
            <rect x="13" y="204" rx="0" ry="0" width="562" height="289" />
          </ContentLoader>
        </div>
      ) : (
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
            <div id={style.cards}>
              <List
                width={1700}
                height={700}
                itemCount={superheroes.length}
                itemSize={100}
              >
                {Row}
              </List>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
