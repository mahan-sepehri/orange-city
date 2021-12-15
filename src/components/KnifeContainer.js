import React, { useState, useEffect } from "react";

import Knife from "./Knife";

const KnifeContainer = () => {
  let lastTime;
  const [delta, setDelta] = useState(0);

  const moveKnife = (time) => {
    if (!lastTime) {
      lastTime = time;
      window.requestAnimationFrame(moveKnife);
      return;
    }

    setDelta((time - lastTime) / 30);

    lastTime = time;
    window.requestAnimationFrame(moveKnife);
  };
  useEffect(() => {
    window.requestAnimationFrame(moveKnife);
  });
  return (
    <>
      <Knife knifeLeft={9} delta={delta} />
      <Knife knifeLeft={34} delta={delta} />
      <Knife knifeLeft={59} delta={delta} />
      <Knife knifeLeft={85} delta={delta} />
    </>
  );
};

export default KnifeContainer;
