// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import { v4 as uuid } from "uuid";

import styles from "./Form.module.css";
import Button from "../common/Button/Button";
import ButtonBack from "../common/ButtonBack/ButtonBack";

import useUrlPosition from "../../hooks/useUrlPosition";

import { convertToEmoji } from "../../utils/converetToEmoji";
import Message from "../common/Message/Message";
import Spinner from "../common/Spinner/Spinner";
import { City } from "../../types/cityType";
import useCities from "../../hooks/useCitites";
import { useNavigate } from "react-router-dom";

function Form() {
  // State
  const [cityName, setCityName] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState<string>("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState<boolean>(false);
  const [geoCodingError, setGeoCodingError] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  // Custom hooks
  const { lat, lng } = useUrlPosition();
  const { citiesState, addCity } = useCities();
  const { isLoading } = citiesState;

  const navigate = useNavigate();

  // This free Client-side Reverse Geocoding API is the fastest and most straightforward way to convert your user’s real-time geo coordinates (latitude/longitude) into detailed locality information, on the client side.
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

  useEffect(() => {
    // Guard clause to prevent fetching data when lat and lng are not available
    if (!lat || !lng) return;

    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );

        if (!response.ok) {
          console.error(`API request failed with status ${response.status}`);
          return;
        }

        const data = await response.json();
        console.log("data", data); // debug

        if (!data.countryCode) {
          setGeoCodingError("No data found for this location");
          return;
        }

        setEmoji(convertToEmoji(data.countryCode));
        console.log(typeof data.countryCode)

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setIsLoadingGeocoding(false);
      } catch (error) {
        console.error("Error fetching city data", error);
        setIsLoadingGeocoding(false);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }

    // console.log("[lat, lng]", [lat, lng]); // debug
    // console.log("cityName", cityName); // debug

    fetchCityData();
  }, [lat, lng]);

  function handleCityNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCityName(e.target.value);
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDate(new Date(e.target.value));
  }

  function handleNotesChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNotes(e.target.value);
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Convert lat and lng to numbers to ensure type safety
    const latNumber = Number(lat);
    const lngNumber = Number(lng);

    // Guard clause to prevent adding a city without a name and date or invalid coordinates
    if (!cityName || !date || isNaN(latNumber) || isNaN(lngNumber)) return;

    const newCity: City = {
      cityName,
      country,
      emoji,
      date: date.toISOString(),
      notes,
      position: { lat: latNumber, lng: lngNumber },
      id: uuid(),
    };

    await addCity(newCity);

    // Only navigate to the cities url once the city has been added to the list of cities in the addCity function above
    navigate("/app/cities"); // Go back to the list of cities

    // console.log("newCity", newCity); // debug
    // console.log("cities", cities); // debug
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (geoCodingError) return <Message message={geoCodingError} />;

  if (!lat || !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleFormSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          type="text"
          onChange={handleCityNameChange}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          type="date"
          onChange={handleDateChange}
          value={date.toISOString().split("T")[0]} // Convert to 'YYYY-MM-DD' format
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea id="notes" onChange={handleNotesChange} value={notes} />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
