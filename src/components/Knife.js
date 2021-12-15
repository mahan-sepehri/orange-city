import React, { useState, useEffect } from "react";

import "./Knife.css";

const Knife = (props) => {
  const getRandomDelay = (a) => {
    return Math.floor(Math.random() * a + 1);
  };
  const [knifeTop, setKnifeTop] = useState(10 - getRandomDelay(500));
  useEffect(() => {
    setKnifeTop((prev) => {
      if (prev > 100 + getRandomDelay(100)) {
        return -10 - getRandomDelay(100);
      }

      return prev + props.delta;
    });
  }, [props.delta]);
  return (
    <>
      <span
        className="knife"
        style={{ top: `${knifeTop}%`, left: `${props.knifeLeft}%` }}
      >
        🔪
      </span>
    </>
  );
};

export default Knife;
