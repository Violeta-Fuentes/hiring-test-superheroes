import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import style from "./Favorite.module.css";
import heart from "../../assets/medium-heart/medium-heart.svg";
import filledHeart from "../../assets/medium-filled-heart/medium-filled-heart.svg";
import bigHeart from "../../assets/big-heart/big-heart.svg";
import fist from "../../assets/fist/fist.svg";
import { useState } from "react";
import { removeFavorite } from "../../actions";

export function Favorites() {
  const dispatch = useDispatch();
  const liked = useSelector((state: RootStateOrAny) => state.favorites);
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className={style.accordion}>
      <button
        onClick={handleClick}
        type="button"
        className={style.accordionButton}
      >
        <img className={style.likedHeart} src={heart} />
        Liked
      </button>
      {active ? (
        <div className={style.space}>
          {liked.length > 0 ? (
            <div className="d-flex flex-wrap" id={style.margin}>
              {liked.map((l: any, i: number) => (
                <div
                  onClick={() => dispatch(removeFavorite(l.id))}
                  key={i}
                  className={style.container}
                >
                  <img className={style.img} src={l.img} />
                  <img className={style.heart} src={filledHeart} />
                  <th>
                    <h4 className={style.name}>{l.name}</h4>
                    <p id={style.realName}>Real Name: {l.realName}</p>
                    <img className={style.fist} src={fist} />
                    <span className={style.power}>
                      {((100 *
                        (l.powerstats.intelligence +
                          l.powerstats.strength +
                          l.powerstats.speed +
                          l.powerstats.durability +
                          l.powerstats.power +
                          l.powerstats.combat)) %
                        600) /
                        100}
                    </span>
                    <span className={style.power}>/ 10</span>
                    <img />
                  </th>
                </div>
              ))}
            </div>
          ) : (
            <div className={style.noHero}>
              <img className={style.bigHeart} src={bigHeart} />
              <p className={style.color}>
                You haven't liked any superheroes yet
              </p>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}