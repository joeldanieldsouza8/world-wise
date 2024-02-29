import { Link } from "react-router-dom";
import { City } from "../../../types/cityType";

import styles from "./CityItem.module.css";
import useCities from "../../../hooks/useCitites";

interface CityItemProps {
  city: City;
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
}

function CityItem({ city }: CityItemProps) {
  const {
    cityName,
    emoji,
    date,
    id: cityID,
    position: { lat, lng },
  } = city;

  const { citiesState, deleteCity } = useCities();
  const { currentCity } = citiesState;

  function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    deleteCity(cityID);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity?.id === cityID ? styles["cityItem--active"] : ""
        }`}
        to={`${cityID}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>

        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
