import React, { useEffect, useRef } from "react";
import HanziWriter from "hanzi-writer";

const PracticeCanvas = ({ character }) => {
  const containerRef = useRef(null);
  const writerRef = useRef(null);

  useEffect(() => {
    if (!character || !containerRef.current) return;

    containerRef.current.innerHTML = "";
    writerRef.current = HanziWriter.create(containerRef.current, character, {
      width: 300,
      height: 300,
      showOutline: true,
      showCharacter: false,
      showHintAfterMisses: 1,
      highlightOnComplete: true,
      strokeFadeDuration: 300,
    });

    writerRef.current.quiz();
  }, [character]);

  return <div className="flex justify-center" ref={containerRef}></div>;
};

export default PracticeCanvas;
