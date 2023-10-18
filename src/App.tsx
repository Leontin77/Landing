import "./styles.scss";

import { Landing } from "./Landing/Landing";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    // Fetch the IP data and update the context
    fetch("https://ipapi.co/json")
      .then((res) => res.json())
      .then((data) => {
        // Update the state variables with the fetched data
        localStorage.setItem(
          "IPData",
          JSON.stringify({
            usersIP: data.ip,
            usersCity: data.city,
            usersCountry: data.country_name,
            phoneCode: data.country_calling_code,
            countryCode: data.country_code
          })
        );
      });
  }, []);

  return <Landing />;
}
