import React, { createContext, useEffect, useReducer } from "react";
import {
  CityAction,
  CityState,
  citiesReducer,
} from "../reducer/cititesReducer";
import { City } from "../types/cityType";

const BASE_URL = "http://localhost:8000";

// export interface City {
//   cityName: string;
//   country: string;
//   emoji: string;
//   date: string;
//   notes: string;
//   position: {
//     lat: number;
//     lng: number;
//   };
//   id: string;
// }

const initialState: CityState = {
  cities: [], // citites.cityName = ["Madird", "Rome", "Moscow", "Paris"]
  isLoading: false,
  currentCity: null,
  error: "",
};

// Create a context
const CitiesContext = createContext<{
  citiesState: CityState;
  dispatch: React.Dispatch<CityAction>;
  getCity: (id: string) => Promise<void>;
  addCity: (city: City) => Promise<void>;
  deleteCity: (id: string) => void;
}>({
  citiesState: initialState,
  dispatch: () => null,
  getCity: async () => {},
  addCity: async () => {},
  deleteCity: () => {},
});

// Create a provider
function CitiesProvider({ children }: { children: React.ReactNode }) {
  const [citiesState, dispatch] = useReducer<
    (state: CityState, action: CityAction) => CityState
  >(citiesReducer, initialState);

  const { currentCity } = citiesState;

  useEffect(() => {
    async function fetchCities() {
      // dispatch({ type: "loading", loadingPayload: true});

      dispatch({ type: "request/start" });

      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();

        dispatch({ type: "cities/loaded", citiesPayload: data });

        // dispatch({ type: "loading", loadingPayload: false});
      } catch (error) {
        // dispatch({
        //   type: "rejected",
        //   errorPayload: "There was an error fetching the cities.",
        // });
        // console.error("Error fetching cities", error);

        dispatch({
          type: "request/fail",
          errorPayload: "There was an error fetching the cities.",
        });
      }
      // finally {
      //   dispatch({ type: "loading", loadingPayload: false});
      // }
    }

    fetchCities();

    // Cleanup function
  }, []);

  async function getCity(id: string) {
    if(id === currentCity?.id) return;
    // console.log("id", id); // debug

    // dispatch({ type: "loading", loadingPayload: true });

    dispatch({ type: "request/start" });
    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`);

      const data = await response.json();

      dispatch({ type: "city/loaded", currentCityPayload: data });

      // dispatch({ type: "loading", loadingPayload: false });
    } catch (error) {
      // dispatch({
      //   type: "rejected",
      //   errorPayload: "There was an error fetching the city.",
      // });
      // console.error("Error fetching city", error);

      dispatch({
        type: "request/fail",
        errorPayload: "There was an error fetching the city.",
      });
    }
    // finally {
    //   dispatch({ type: "loading", loadingPayload: false });
    // }
  }

  async function addCity(newcity: City) {
    // dispatch({ type: "loading", loadingPayload: true });

    dispatch({ type: "request/start" });
    try {
      // Here we keep the remote state (the "fake" json server) in sync with the UI state by sending a POST request to the server with the new city data and then updating the UI state with the new city data returned in the response body from the server.

      // Send a POST request to the server (in this case the data.json file which is being simulated as a "fake server") with the new city data which will effectively add a new city to the database and return the new city data in the response body
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newcity),
      });

      const data = await response.json();
      console.log("data", data); // debug

      dispatch({ type: "city/added", cityPayload: data });

      // dispatch({ type: "loading", loadingPayload: false });
    } catch (error) {
      // dispatch({
      //   type: "rejected",
      //   errorPayload: "There was an error adding the city.",
      // });
      // console.error("Error adding city", error);

      dispatch({
        type: "request/fail",
        errorPayload: "There was an error adding the city.",
      });
    }
    // finally {
    //   dispatch({ type: "loading", loadingPayload: false });
    // }
  }

  function deleteCity(id: string) {
    // dispatch({ type: "loading", loadingPayload: true });

    dispatch({ type: "request/start" });
    try {
      // Send a DELETE request to the server (in this case the data.json file which is being simulated as a "fake server") with the city id which will effectively delete the city from the database
      fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", idPayload: id });

      // dispatch({ type: "loading", loadingPayload: false });
    } catch (error) {
      // dispatch({
      //   type: "rejected",
      //   errorPayload: "There was an error deleting the city.",
      // });
      // console.error("Error deleting city", error);

      dispatch({
        type: "request/fail",
        errorPayload: "There was an error deleting the city.",
      });
    }
    // finally {
    //   dispatch({ type: "loading", loadingPayload: false });
    // }
  }

  const contextValue = { citiesState, dispatch, getCity, addCity, deleteCity };

  return (
    <CitiesContext.Provider value={contextValue}>
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesContext, CitiesProvider };
