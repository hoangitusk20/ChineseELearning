import React, { useState } from "react";
import CharacterInput from "./CharacterInput";
import StrokeOrderView from "./StrokeOrderView";

import PracticeCanvas from "./PraticeCanvas";

const HanziPractice = ({ initialCharacter = "" }) => {
  const [character, setCharacter] = useState(initialCharacter);
  const [mode, setMode] = useState("view"); // 'view' or 'practice'

  return (
    <div className="p-4 max-w-md mx-auto border min-h-[300px] rounded shadow">
      <h2 className="text-xl flex justify-center font-bold mb-4">
        Luyện viết chữ Hán
      </h2>
      <CharacterInput value={character} onChange={setCharacter} />
      {mode === "view" && <StrokeOrderView character={character} />}
      {mode === "practice" && <PracticeCanvas character={character} />}
      <div className="flex gap-4 my-3">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setMode("view")}
        >
          Xem mẫu
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setMode("practice")}
        >
          Luyện tập
        </button>
      </div>
    </div>
  );
};

export default HanziPractice;
