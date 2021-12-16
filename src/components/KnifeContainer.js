import React, { useState, useEffect, useLayoutEffect } from "react";

import Knife from "./Knife";
import LoseModal from "./LoseModal";
let orangeSvg;
let orangeRect;

const KnifeContainer = () => {
  const [hasLost, setHasLost] = useState(false);
  let lastTime;
  const [delta, setDelta] = useState(0);
  useLayoutEffect(() => {
    setTimeout(() => {
      orangeSvg = document.getElementsByTagName("g")[0];
    }, 1000);
  }, []);

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

  useEffect(() => {
    function checkLose() {
      setInterval(() => {
        if (orangeSvg) {
          orangeRect = orangeSvg.getBoundingClientRect();
        }
        const knives = document.querySelectorAll(".knife");
        const knivesRect = [...knives].map((knife) =>
          knife.getBoundingClientRect()
        );
        if (orangeRect && knivesRect.length !== 0) {
          const asdasd = knivesRect.some(
            (knifeRect) =>
              knifeRect.bottom > orangeRect.top &&
              knifeRect.right > orangeRect.left &&
              knifeRect.left < orangeRect.right &&
              knifeRect.top < orangeRect.bottom
          );
          setHasLost(asdasd);
        }
      }, 500);
    }
    checkLose();
  }, []);
  return (
    <>
      {hasLost && <LoseModal />}
      {!hasLost && (
        <>
          <Knife knifeLeft={9} delta={delta} />
          <Knife knifeLeft={34} delta={delta} />
          <Knife knifeLeft={59} delta={delta} />
          <Knife knifeLeft={85} delta={delta} />
        </>
      )}
    </>
  );
};

export default KnifeContainer;
