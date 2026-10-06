import { useState, useEffect } from "react";

// How much time is left until the target date?
// Returns null if the date is already in the past.
function getTimeLeft(targetDate) {
  const difference = new Date(targetDate) - new Date(); // milliseconds

  if (difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function Countdown({ targetDate }) {
  // State: the time left. When it changes, React redraws the numbers.
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  // Effect: every 1 second, work out the time left again.
  // The function we return stops the timer when the component goes away.
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!targetDate) {
    return <p className="countdown-message">Start date to be announced</p>;
  }

  if (timeLeft === null) {
    return <p className="countdown-message">The competition is live!</p>;
  }

  return (
    <div className="countdown">
      <div><strong>{timeLeft.days}</strong><span>days</span></div>
      <div><strong>{timeLeft.hours}</strong><span>hours</span></div>
      <div><strong>{timeLeft.minutes}</strong><span>minutes</span></div>
      <div><strong>{timeLeft.seconds}</strong><span>seconds</span></div>
    </div>
  );
}

export default Countdown;
