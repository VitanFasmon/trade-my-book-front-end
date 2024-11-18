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
import { Address } from "../../types/dataTypes";
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

interface MapParentProps {
  defaultCenter?: { lat: number; lng: number } | null;
  defaultZoom?: number;
  edit: boolean;
}

const MapParent = ({ defaultCenter, defaultZoom, edit }: MapParentProps) => {
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const { setLocationData } = useLocationStore();
  const [markerPosition, setMarkerPosition] = useState(defaultCenter || null);
  useEffect(() => {
    if (selectedPlace?.address_components) {
      let address: Address = {
        street_number: "",
        route: "",
        locality: "",
        country: "",
        postal_code: "",
      };

      selectedPlace.address_components.forEach((comp) => {
        const type = comp.types[0];
        switch (type) {
          case "street_number":
            address.street_number = comp.long_name;
            break;
          case "route":
            address.route = comp.long_name;
            break;
          case "locality":
          case "postal_town":
            address.locality = comp.long_name;
            break;
          case "country":
            address.country = comp.long_name;
            break;
          case "postal_code":
            address.postal_code = comp.long_name;
            break;
        }
      });
      setLocationData({
        address: address || "",
        lat: selectedPlace?.geometry?.location?.lat() || 0,
        lng: selectedPlace?.geometry?.location?.lng() || 0,
      });
      setMarkerPosition({
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
        {edit && (
          <div className="flex justify-center items-center w-full">
            <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
          </div>
        )}

        <div className="rounded-lg h-[400px] md:w-[760px] w-[300px] border p-2">
          <Map
            mapId={"bf51a910020fa25a"}
            defaultZoom={defaultZoom || 3}
            defaultCenter={defaultCenter || { lat: 22.54992, lng: 0 }}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            <AdvancedMarker ref={markerRef} position={markerPosition || null} />
          </Map>
        </div>
        <MapHandler place={selectedPlace} marker={marker} />
      </APIProvider>
    </section>
  );
};

export default MapParent;
