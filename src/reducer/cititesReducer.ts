import { City } from "../types/cityType";

export interface CityState {
  cities: City[];
  isLoading: boolean;
  currentCity: City | null;
  error: string;
}

export type CityAction =
  | { type: "cities/loaded"; citiesPayload: City[] }
  // | { type: "loading"; loadingPayload: boolean }
  // | { type: "rejected"; errorPayload: string }
  | { type: "city/loaded"; currentCityPayload: City }
  | { type: "city/deleted"; idPayload: string }
  | { type: "city/added"; cityPayload: City }
  | { type: "request/start" }
  | { type: "request/fail"; errorPayload: string };

function citiesReducer(state: CityState, action: CityAction): CityState {
  switch (action.type) {
    // case "loading": {
    //   return { ...state, isLoading: action.loadingPayload };
    // }

    // case "rejected": {
    //   return { ...state, error: action.errorPayload };
    // }

    case "cities/loaded": {
      return { ...state, isLoading: false, cities: action.citiesPayload };
    }

    case "request/start": {
      return { ...state, isLoading: true, error: "" };
    }

    case "request/fail": {
      return { ...state, isLoading: false, error: action.errorPayload };
    }

    case "city/loaded": {
      return {
        ...state,
        isLoading: false,
        currentCity: action.currentCityPayload,
      };
    }

    case "city/deleted": {
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.idPayload),
        currentCity: null,
      };
    }

    case "city/added": {
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.cityPayload],
        currentCity: action.cityPayload,
      };
    }

    default:
      return state;
  }
}

export { citiesReducer };
