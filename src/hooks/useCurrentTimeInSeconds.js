import { useState, useEffect } from "react";

// This HOOK used for update live station status(bikes/docks availability).
// This will trigger every 10seconds with current day time in seconds.
const useCurrentTimeInSeconds = ()=> {
  const currenTimeInSeconds =
    new Date().getHours() * 3600 + new Date().getMinutes() * 60;
  const [seconds, setSeconds] = useState(currenTimeInSeconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(seconds + 10);
      //resets the day
      if (seconds > 86400) {
        setSeconds(0);
      }
    }, 10000);
    return () => clearInterval(intervalId);
  }, [seconds]);

  return { seconds };
}
export default useCurrentTimeInSeconds;