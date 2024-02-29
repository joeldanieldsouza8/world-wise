import useCities from '../../../hooks/useCitites'
import Message from '../../common/Message/Message';
import Spinner from '../../common/Spinner/Spinner';
import CityItem from '../CityItem/CityItem';
import styles from './CityList.module.css'

function CityList() {
    const {citiesState} = useCities();
    const {cities, isLoading} = citiesState;

    if (isLoading) return <Spinner />

    if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />

  return (
    <ul className={styles.cityList}>
        {cities.map((city) => (
            <CityItem key={city.id} city={city} />
        ))}
    </ul>
  )
}

export default CityList