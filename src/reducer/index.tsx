import {
  GET_SUPERHEROES,
  REMOVE_FAVORITE,
  ADD_FAVORITE,
  SEARCH_HEROES,
  FILTERED_HEROES,
} from "../actions/index";

const initialState = {
  allSuperheroes: [],
  favorites: [],
};

export interface IAction {
  id: number;
  name: string;
  biography: {
    fullName: string;
  };
}

export default function rootReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_SUPERHEROES:
      return {
        ...state,
        allSuperheroes: action.payload,
      };
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.concat(action.payload),
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          (f: IAction) => f.id !== action.payload
        ),
      };
    case SEARCH_HEROES:
      return {
        ...state,
        allSuperheroes: state.allSuperheroes.filter(
          (a: IAction) =>
            a.name.toLocaleLowerCase() === action.payload ||
            a.biography.fullName.toLocaleLowerCase() == action.payload
        ),
      };
    default:
      return state;
  }
}
