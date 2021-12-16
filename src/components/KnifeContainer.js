import React, { useState, useEffect, useLayoutEffect } from "react";

import Knife from "./Knife";
import LoseModal from "./LoseModal";
let orangeSvg;
let orangeRect;
let knifeSpeed = 30;
let score = 0;

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

    setDelta((time - lastTime) / knifeSpeed);

    lastTime = time;
    window.requestAnimationFrame(moveKnife);
  };
  useEffect(() => {
    window.requestAnimationFrame(moveKnife);
  });

  useEffect(() => {
    function checkLose() {
      setInterval(() => {
        if (knifeSpeed > 5) {
          knifeSpeed -= 0.1;
        }
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
          if (asdasd) {
            setHasLost(true);
          } else {
            setHasLost(false);
            score += 1;
          }
        }
      }, 500);
    }
    checkLose();
  }, []);
  return (
    <>
      {hasLost && <LoseModal score={score} />}
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
