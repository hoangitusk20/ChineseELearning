import React from "react";
import { useSearchParams } from "react-router-dom";
import HanziPractice from "./Component/HanziPratice";

const LearnWritingPage = () => {
  const [searchParams] = useSearchParams();
  const queryChar = searchParams.get("char") || "";
  return (
    <div>
      <HanziPractice initialCharacter={queryChar} />
    </div>
  );
};

export default LearnWritingPage;
