import { useEffect } from "react";
import PersonalDetails from "./PersonalDetails";

function PersonalDetailsRedirect() {
  useEffect(() => {
    // Clear the key on mount
    localStorage.removeItem("currentStep");
  }, []);

  return <PersonalDetails />;
}

export default PersonalDetailsRedirect;
