import React, { useEffect, useRef } from "react";
import HanziWriter from "hanzi-writer";

const StrokeOrderView = ({ character }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!character || !containerRef.current) return;

    containerRef.current.innerHTML = "";
    HanziWriter.create(containerRef.current, character, {
      width: 300,
      height: 300,
      showOutline: true,
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 300,
    }).animateCharacter();
  }, [character]);

  return <div className="flex justify-center" ref={containerRef}></div>;
};

export default StrokeOrderView;
