import { useState } from "react";

export default function PageFooter() {  
  const [setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [places, setPlaces] = useState(null);

  const handleGetPlaces = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Perform API call
        try {
          const response = await fetch("http://localhost:3001/nearby-places", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              latitude,
              longitude
            }),
          });

          const data = await response.json();
          setPlaces(data.places);
        } catch (apiError) {
          setError("Failed to log location via API.");
        }
      },
      (err) => {
        setError(`Failed to retrieve location: ${err.message}`);
      }
    );
  };

  const handleCancel = () => {
    setPlaces(null);
    setError(null);
  }

  return (
    <footer className="relative">
      {/* Show List Button */}
      {!places && <button
        onClick={handleGetPlaces}
        className="w-full p-4 bg-gray-200 hover:bg-gray-400 rounded-lg"
      >
        CHECK IN
      </button>}

      {/* Hide List Button */}
      {places && <button
        onClick={handleCancel}
        className="w-full p-4 bg-gray-200 hover:bg-gray-400 rounded-lg"
      >
        CANCEL CHECK IN
      </button>}

      {/* Location Response List */}
      {places && (
        <div className="w-full h-[300px] absolute -top-4 transform -translate-y-full shadow-lg rounded-md bg-gray-200 p-4">
          <div className="w-full h-full overflow-y-scroll">
            {/* Render location, error, or API response */}
              <div className="flex flex-col">
                {places.map((place: any) => {
                  return (
                    <button
                      key={place.place_id}
                      className="text-left p-2 border-b-solid border-b-[1px] border-gray-300"
                    >
                      <span>{place.name}</span>
                    </button>
                  )
                })}
              </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      )}
    </footer>
  )
}