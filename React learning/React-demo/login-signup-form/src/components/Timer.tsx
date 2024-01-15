import React, { useState, useEffect, useCallback } from "react";
import { memo } from "react";
import "../style/timer.css";
import { logDOM } from "@testing-library/react";

interface timerFunction {
  otpNumber: any;
  otpDigit: string;
}

const Timer: React.FC<timerFunction> = (props) => {
  const [timer, setTimer] = useState(8);
  const decreasingTime = useCallback(
    () => setTimer((currentTime) => currentTime - 1),
    []
  );
  const { otpNumber, otpDigit } = props;

  useEffect(() => {
    timer > 0 && setTimeout(decreasingTime, 1000);
  }, [timer, decreasingTime]);

  const resetTimer = () => {
    // e.preventDefault();
    if (!timer) {
      otpNumber();
    }
  };

  return (
    <>
      <div className="timer-text">
        {timer > 0 ? <p className="otp-text">{otpDigit}</p> : ""}
        {timer > 0 ? <p>Time remaining : {timer}</p> : ""}
      </div>
      <div className="otp-btn">
        {timer === 0 ? <button onClick={() => resetTimer()}>Resend Otp</button> : ""}
      </div>
    </>
  );
};

export default Timer;
