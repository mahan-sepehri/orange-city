import React, { useCallback, useEffect, useState } from "react";
import OrangeLottie, { walkingOrange } from "./OrangeLottie";

import "./GameWorld.css";
import ground from "../assets/ground.png";

let animationFrame;
let lastTime;
let directionFactor = 0;

const GameWorld = () => {
  const [childLeft, setChildLeft] = useState(0);

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

    const delta = (time - lastTime) / 5;
    lastTime = time;
    walkingOrange.play();

    setChildLeft((prev) => {
      if (prev < -2600) {
        return -2600;
      } else if (prev > 0) {
        return 0;
      } else {
        animationFrame = window.requestAnimationFrame(moveObject);
        return prev - delta * directionFactor;
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
        <div className="char-container">
          <div className="ground-container" style={{ left: `${childLeft}px` }}>
            <img src={ground} alt="ground" className="ground" />
            <img src={ground} alt="ground" className="ground" />
          </div>
          <OrangeLottie directionFactor={directionFactor} />
        </div>
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
