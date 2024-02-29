import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLngTuple } from "leaflet";
import useCities from "../../hooks/useCitites";
import useGeolocation from "../../hooks/useGeolocation";
import Button from "../common/Button/Button";
import useUrlPosition from "../../hooks/useUrlPosition";

function Map() {
  const { citiesState } = useCities();
  const { cities } = citiesState;

  // We need this state to keep track of the position of the map so that we can change it programmatically when the user clicks on the map
  const [mapPosition, setMapPosition] = useState<LatLngTuple>([51.505, -0.09]);

  const { lat: mapLat, lng: mapLng } = useUrlPosition();

  // console.log("mapLat", mapLat); // debug
  // console.log("mapLng", mapLng); // debug

  const {
    isLoading: isLoadingGeolocation,
    position: geolocationPosition,
    // error: geolocationError,
    getPosition: getGeolocation,
  } = useGeolocation();

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([Number(mapLat), Number(mapLng)]);
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([
        geolocationPosition.coords.latitude,
        geolocationPosition.coords.longitude,
      ]);
    }
  }, [geolocationPosition]);

  // console.log("geolocationPosition", geolocationPosition); // debug

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getGeolocation}>
          {isLoadingGeolocation ? "Loading..." : "Get my location"}
        </Button>
      )}

      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {/* <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenterMap position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

interface ChangeCenterMapProps {
  position: LatLngTuple;
}

function ChangeCenterMap({ position }: ChangeCenterMapProps) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    // This event object comes from the Leaflet library and is not a React event object
    click(e) {
      // console.log("e", e); // debug
      const { lat, lng } = e.latlng;

      // This is how we navigate programmatically in React Router to the form page with the lat and lng as query parameters in the URL bar of the browser window (e.g. http://localhost:3000/form?lat=51.505&lng=-0.09)
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });

  return null;
}

export default Map;
