import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

export default function PageFooter() { 
  const [error, setError] = useState<string | null>(null);
  const [places, setPlaces] = useState<[] | null>(null);
  const {
    user
  } = usePrivy();

  const handleGetPlaces = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nearby-places`, {
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

  const handleCheckIn = async (place_id: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/log-location`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          placeId: place_id,
          userAddress: user?.wallet?.address
        }),
      });

      const data = await response.json();
      console.log('test', data);
    } catch (apiError) {
      setError("Failed to log location via API.");
    }
  }

  return (
    <footer className="relative">
      {/* Show List Button */}
      {!places && <button
        onClick={handleGetPlaces}
        className="w-full p-4 bg-otw-red text-otw-white rounded-lg font-extrabold"
      >
        CHECK IN
      </button>}

      {/* Hide List Button */}
      {places && <button
        onClick={handleCancel}
        className="w-full p-4 bg-otw-red text-otw-white rounded-lg font-extrabold"
      >
        CANCEL CHECK IN
      </button>}

      {/* Location Response List */}
      {places && (
        <div className="w-full h-[300px] absolute -top-4 transform -translate-y-full shadow-lg rounded-md bg-otw-yellow p-4">
          <div className="w-full h-full overflow-y-scroll">
            {/* Render location, error, or API response */}
              <div className="flex flex-col">
                {places.map((place: any) => {
                  return (
                    <button
                      key={place.place_id}
                      className="text-left p-2 border-b-solid border-b-[1px] border-gray-300"
                      onClick={() => handleCheckIn(place.place_id)}
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