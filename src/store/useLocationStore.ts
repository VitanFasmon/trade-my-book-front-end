import { create } from "zustand";
import { LocationData, LocationStore } from "../types/dataTypes";

const useLocationStore = create<LocationStore>((set) => {
  const locationData: LocationData | null = null;

  return {
    locationData: locationData,
    setLocationData: (locationData: LocationData | null) => {
      set({ locationData: locationData });
    },
  };
});

export default useLocationStore;
