import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";
import { useErrorToast } from "../Toast";

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  const { showErrorToast } = useErrorToast();
  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      types: ["address"], // Restrict to full address
      fields: ["geometry", "name", "formatted_address", "address_components"], // Include necessary address fields
    };

    const autocomplete = new places.Autocomplete(inputRef.current, options);
    setPlaceAutocomplete(autocomplete);
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      const place = placeAutocomplete.getPlace();

      // Validate address components to ensure a full address is entered
      const requiredComponents = {
        streetNumber: place.address_components?.some((comp) =>
          comp.types.includes("street_number")
        ),
        street: place.address_components?.some((comp) =>
          comp.types.includes("route")
        ),
        city: place.address_components?.some((comp) =>
          comp.types.includes("locality")
        ),
        postalCode: place.address_components?.some((comp) =>
          comp.types.includes("postal_code")
        ),
        country: place.address_components?.some((comp) =>
          comp.types.includes("country")
        ),
      };

      // Check if all required components are present
      if (!requiredComponents.streetNumber || !requiredComponents.street) {
        showErrorToast(
          "Please enter a complete address including your street number."
        );

        inputRef.current!.value = ""; // Clear the input field for the user to re-enter
        onPlaceSelect(null); // Pass null to reset any previously selected place
      } else {
        onPlaceSelect(place); // Only pass valid place data if complete
      }
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="w-full h-12">
      <input
        type="text"
        required
        aria-label="Address"
        placeholder="Enter your full address"
        className="border border-primary p-2 rounded-md w-full"
        ref={inputRef}
      />
    </div>
  );
};

export default PlaceAutocomplete;
