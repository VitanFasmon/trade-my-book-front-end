const API_URL = "http://localhost:3000/api";
/*
const fetchLocationData = async (address: string) => {
  try {
    const response = await fetch(
      `${API_URL}?address=${address}&key=YOUR_API_KEY`
    );
    const data = await response.json();
    return { lat: data.lat, lng: data.lng };
  } catch (error) {
    console.error("Error fetching location data:", error);
    return null;
  }
};
*/
const fetchLocationData = async (address: string) => {
  const data = { lat: 46.55472, lng: 15.64667 };
  return { lat: data.lat, lng: data.lng };
};
export { fetchLocationData };
