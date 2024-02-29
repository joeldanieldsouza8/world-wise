import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import useCities from "../../../hooks/useCitites";
import { useEffect } from "react";
import ButtonBack from "../../common/ButtonBack/ButtonBack";
import Spinner from "../../common/Spinner/Spinner";

// const formatDate = (date: string): string =>
//   new Intl.DateTimeFormat("en", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//     weekday: "long",
//   }).format(new Date(date));

const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
};

function City() {
  // TEMP DATA
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };

  const { cityID } = useParams<string>();
  const { citiesState, getCity } = useCities();
  const { currentCity, isLoading } = citiesState;

  // console.log("currentCity", currentCity); // debug

  useEffect(() => {
    if (cityID) {
      getCity(cityID);
    }
  }, [cityID]);

  // Show loading spinner if data is still loading or currentCity is not yet available
  if (isLoading || !currentCity) return <Spinner />;

  // Destructuring after the loading check to ensure currentCity is not null
  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date!)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <ButtonBack />
      </div>
    </div>
  );
}

export default City;
