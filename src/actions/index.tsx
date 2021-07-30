import { Dispatch } from "redux";

export const GET_SUPERHEROES = "GET_SUPERHEROES";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const SEARCH_HEROES = "SEARCH_HEROES";

export function getSuperheroes() {
  return function (dispatch: Dispatch) {
    return fetch("https://akabab.github.io/superhero-api/api/all.json")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_SUPERHEROES, payload: json });
      });
  };
}

export function searchHeroes(payload: string) {
  return {
    type: SEARCH_HEROES,
    payload,
  };
}

export function removeFavorite(id: number) {
  return {
    type: REMOVE_FAVORITE,
    payload: id,
  };
}

export function addFavorite(payload: any) {
  return {
    type: ADD_FAVORITE,
    payload,
  };
}