import React, { useCallback, useEffect, useState } from "react";
import OrangeLottie, { walkingOrange } from "./OrangeLottie";

import KnifeContainer from "./KnifeContainer";
import "./GameWorld.css";

let animationFrame;
let lastTime;
let directionFactor = 0;

const GameWorld = () => {
  const [childLeft, setChildLeft] = useState(20);
  const backwardWalkHandler = () => {
    directionFactor = -1;

    animationFrame = window.requestAnimationFrame(moveObject);
  };
  const forwardWalkHandler = () => {
    directionFactor = 1;

    animationFrame = window.requestAnimationFrame(moveObject);
  };
  const moveObject = useCallback((time) => {
    if (!lastTime) {
      lastTime = time;
      animationFrame = window.requestAnimationFrame(moveObject);
      return;
    }

    const delta = (time - lastTime) / 20;
    lastTime = time;
    walkingOrange.play();

    setChildLeft((prev) => {
      if (prev < -16) {
        return -16;
      } else if (prev > 71) {
        return 71;
      } else {
        animationFrame = window.requestAnimationFrame(moveObject);
        return prev + delta * directionFactor;
      }
    });
  }, []);

  const ArrowKeyDownHandler = useCallback(
    (e) => {
      if (e.repeat) {
        return;
      }

      if (e.key === "ArrowRight") {
        directionFactor = 1;
        document.removeEventListener("keydown", ArrowKeyDownHandler);
      } else if (e.key === "ArrowLeft") {
        directionFactor = -1;
        document.removeEventListener("keydown", ArrowKeyDownHandler);
      } else {
        return;
      }
      animationFrame = window.requestAnimationFrame(moveObject);
    },
    [moveObject]
  );
  const ArrowKeyUpHandler = useCallback(
    (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        stopObject();
        document.addEventListener("keydown", ArrowKeyDownHandler);
      }
    },
    [ArrowKeyDownHandler]
  );

  function stopObject() {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      lastTime = null;
      walkingOrange.stop();

      directionFactor = 0;
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", ArrowKeyDownHandler);
    document.addEventListener("keyup", ArrowKeyUpHandler);
    window.oncontextmenu = function (event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };

    return () => {
      document.removeEventListener("keydown", ArrowKeyDownHandler);
      document.removeEventListener("keyup", ArrowKeyUpHandler);
    };
  }, [ArrowKeyUpHandler, ArrowKeyDownHandler]);

  return (
    <div className="game-world">
      <div className="game-screen">
        <div
          className="left-barrier"
          style={{
            width: `5vw`,
          }}
        ></div>
        <div className="char-container">
          <KnifeContainer />
          <OrangeLottie
            childLeft={`${childLeft}%`}
            directionFactor={directionFactor}
          />
        </div>
        <div
          className="right-barrier"
          style={{
            width: `5vw`,
          }}
        ></div>
      </div>
      <div className="button-container">
        <div
          className="button-box"
          onMouseDown={backwardWalkHandler}
          onMouseUp={() => {
            stopObject();
          }}
          onTouchStart={(e) => backwardWalkHandler(e)}
          onTouchEnd={() => {
            stopObject();
          }}
        >
          <button className="back-button"></button>
        </div>
        <div
          className="button-box"
          onMouseDown={forwardWalkHandler}
          onMouseUp={() => {
            stopObject();
          }}
          onTouchStart={(e) => forwardWalkHandler(e)}
          onTouchEnd={() => {
            stopObject();
          }}
        >
          <button className="forward-button"></button>
        </div>
      </div>
    </div>
  );
};

export default GameWorld;
