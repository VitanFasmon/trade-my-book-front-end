import { useEffect, useState } from "react";
import {
  APIProvider,
  AdvancedMarker,
  Map,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import MapHandler from "./MapHandler";
import PlaceAutocomplete from "./PlaceAutocomplete";
import useLocationStore from "../../store/useLocationStore";
import { LocationData } from "../../types/dataTypes";
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

const MapParent = () => {
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const { setLocationData, locationData } = useLocationStore();

  useEffect(() => {
    if (selectedPlace?.formatted_address) {
      setLocationData({
        address: selectedPlace.formatted_address || "",
        lat: selectedPlace?.geometry?.location?.lat() || 0,
        lng: selectedPlace?.geometry?.location?.lng() || 0,
      });
    }
  }, [selectedPlace]);

  return (
    <section className="">
      <APIProvider
        apiKey={API_KEY}
        solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
      >
        <div className="flex justify-center items-center w-full">
          <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
        </div>
        <div className="rounded-lg h-[400px] w-[800px] border p-2">
          <Map
            mapId={"bf51a910020fa25a"}
            defaultZoom={3}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            <AdvancedMarker ref={markerRef} position={null} />
          </Map>
        </div>
        <MapHandler place={selectedPlace} marker={marker} />
      </APIProvider>
    </section>
  );
};

export default MapParent;
