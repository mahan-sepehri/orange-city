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

    setDelta((time - lastTime) / 60);

    lastTime = time;
    window.requestAnimationFrame(moveKnife);
  };
  useEffect(() => {
    window.requestAnimationFrame(moveKnife);
  });
  return (
    <>
      <Knife knifeLeft={12} delta={delta} />
      <Knife knifeLeft={32} delta={delta} />
      <Knife knifeLeft={52} delta={delta} />
      <Knife knifeLeft={72} delta={delta} />
    </>
  );
};

export default KnifeContainer;
