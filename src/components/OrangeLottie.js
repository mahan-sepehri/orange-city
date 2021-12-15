import React, { useRef, useEffect } from "react";
import Lottie from "lottie-web";

import "./OrangeLottie.css";

const ANIMATION_SPEED = 2;

export let walkingOrange;

const OrangeLottie = React.memo((props) => {
  const lottieContainerRef = useRef();

  useEffect(() => {
    walkingOrange = Lottie.loadAnimation({
      container: lottieContainerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: false,
      animationData: require("../assets/walkingOrange.json"),
      name: "walkingOrange",
    });
    walkingOrange.setSpeed(ANIMATION_SPEED);

    return () => walkingOrange.destroy();
  }, []);

  return (
    <div style={{ left: `${props.childLeft}` }} className="child">
      <div
        className={`lottie-container ${
          props.directionFactor === -1 ? "backward" : ""
        }`}
        ref={lottieContainerRef}
      ></div>
    </div>
  );
});

export default OrangeLottie;
