import useCities from "../../../hooks/useCitites";
import CountryItem from "../CountryItem/CountryItem";
import styles from "./CountryList.module.css";

// Define a type for the new country array items
interface CountryInfo {
  country: string;
  emoji: string;
}

function CountryList() {
  const { citiesState } = useCities();
  const { cities } = citiesState;

  /* 
    We look inside our array (the one that's starting empty and will eventually hold our unique countries) to see if there's already an object with the same country property as our current city. This is what array.some(item => item.country === city.country) does. If it finds an object with the same country, it returns true; otherwise, it returns false.

    If found is false, it means this country is not in our array yet. So, we need to add it. We do this by returning a new array that has all the items from array plus our new CountryInfo object: { country: city.country, emoji: city.emoji }. The spread operator ... is used to copy all the existing items into the new array before adding the new item.

    If found is true, we simply return the array as it is because the country is already there, and we don't need to add it again.

    Visualisation:
        - Start with an empty array: [].
        - Take the first city, "Paris". No "France" in the array yet, so add it: [ { country: "France", emoji: "🇫🇷" } ].
        - Move to the second city, "Lyon". "France" is already there, so we do nothing: [ { country: "France", emoji: "🇫🇷" } ].
        - Go to the third city, "Berlin". No "Germany" in the array, so add it: [ { country: "France", emoji: "🇫🇷" }, { country: "Germany", emoji: "🇩🇪" } ].
    */

  const countries: CountryInfo[] = cities.reduce(
    (array: CountryInfo[], city) => {
      const found = array.some((item) => item.country === city.country);

      if (!found) {
        // Correctly returning a new array with the spread operator
        return [...array, { country: city.country, emoji: city.emoji }];
      }

      return array;
    },
    []
  );

  return (
    <ul className={styles.countryList}>
      {countries.map((countryInfo) => (
        // Pass the correct prop to CountryItem
        <CountryItem key={countryInfo.country} country={countryInfo} />
      ))}
    </ul>
  );
}

export default CountryList;
