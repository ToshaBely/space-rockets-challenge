import React from "react";
import { Box, Text } from "@chakra-ui/core";

import { ONE_DAY_MS, ONE_HOUR_MS, ONE_MINUTE_MS } from "../utils/constants";

export default function CountdownTimer({ date, onFinish }) {
  let datetime = date.getTime();

  let [countdownTime, setCountdownTime] = React.useState(null);
  let intervalRef = React.useRef(null);

  let clearTimer = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  let tick = React.useCallback(() => {
    let now = Date.now();
    let distance = datetime - now;

    let days = Math.floor(distance / ONE_DAY_MS);
    let hours = Math.floor((distance % ONE_DAY_MS) / ONE_HOUR_MS);
    let minutes = Math.floor((distance % ONE_HOUR_MS) / ONE_MINUTE_MS);
    let seconds = Math.floor((distance % ONE_MINUTE_MS) / 1000);

    setCountdownTime({ days, hours, minutes, seconds });

    if (distance <= 0) {
      clearTimer();
      setCountdownTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      onFinish && onFinish();
    }
  }, [datetime]);

  React.useEffect(() => {
    intervalRef.current = setInterval(tick, 1000);

    return clearTimer;
  }, [tick]); // tick is changed only when datetime is changed

  if (!countdownTime) {
    return null;
  }

  return (
    <Box display="inline" fontSize="lg">
      <Box display="inline">
        {countdownTime.days}
        <Text display="inline" fontSize="xs">d</Text>
      </Box>

      <Box display="inline">
        &nbsp;: {countdownTime.hours}
        <Text display="inline" fontSize="xs">h</Text>
      </Box>

      <Box display="inline">
        &nbsp;: {countdownTime.minutes}
        <Text display="inline" fontSize="xs">m</Text>
      </Box>

      <Box display="inline">
        &nbsp;: {countdownTime.seconds}
        <Text display="inline" fontSize="xs">s</Text>
      </Box>
    </Box>
  );
}
