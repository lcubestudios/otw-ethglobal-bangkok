import React, { useState } from "react";
import axios from "axios";
import { loginUser } from "./privy";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    const loggedInUser = await loginUser();
    setUser(loggedInUser);
  };

  const handleCheckIn = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/nft/mint`,
        {
          latitude: 35.6586, // Example coordinates
          longitude: 139.7454,
          userId: user.id,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error checking in:", error);
    }
  };

  return (
    <div>
      <h1>Travel Log</h1>
      {!user && <button onClick={handleLogin}>Login with Privy</button>}
      {user && <button onClick={handleCheckIn}>Check In</button>}
    </div>
  );
};

export default App;
