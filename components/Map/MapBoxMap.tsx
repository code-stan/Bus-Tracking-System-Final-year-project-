import 'mapbox-gl/dist/mapbox-gl.css';
import { useContext, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { UserLocationContext } from "@/context/UserLocationContext";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const MapBoxMap = () => {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: userLocation ? [userLocation.lng, userLocation.lat] : [0, 0],
        zoom: 2,
      });

      let marker: mapboxgl.Marker | null = null;

      if (!userLocation) {
        marker = new mapboxgl.Marker({ anchor: 'bottom' })
          .setLngLat(userLocation ? [userLocation.lng, userLocation.lat] : [0, 0])
          .setPopup(new mapboxgl.Popup().setHTML('<img src="./pin.png" />'))
          .addTo(map);
      }

      return () => {
        if (marker) marker.remove();
        map.remove();
      };
    }
  }, [userLocation]);

  return <div ref={mapContainerRef} style={{ width: "100%", height: "400px" }} />;
};

export default MapBoxMap;