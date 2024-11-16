import { useState } from "react";

export default function CheckinButton() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const handleCheckIn = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude }); // Set the location state
        console.log(`Checked in at Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      (err) => {
        setError(`Failed to retrieve location: ${err.message}`);
      }
    );
  };

  return (
    <div className="w-full">
      <button
        onClick={handleCheckIn}
        className="w-full p-4 bg-gray-200 hover:bg-gray-400 rounded-lg"
      >
        CHECK IN
      </button>

      {/* Render location or error */}
      {location && (
        <p>
          Checked in at Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
