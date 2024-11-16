import { usePrivy } from "@privy-io/react-auth";
import CheckinButton from "../checkin/button";

export default function PageFooter() {
  const {
    logout,
  } = usePrivy();
  
  return (
    <footer className="flex flex-row flex-nowrap gap-4">
      <CheckinButton />
      <button
        onClick={logout}
        className="p-4 bg-gray-200 hover:bg-gray-400 rounded-lg"
      >
        LOGOUT
      </button>
    </footer>
  )
}