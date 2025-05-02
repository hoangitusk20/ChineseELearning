import ChineseWithPinyin from "@/shared/components/ChineseWithPinyin";
import React from "react";

const ChineseTextWithTranslate = ({
  chineseText,
  translatedText,
  showPinyin,
  className,
}) => {
  return (
    <div className={`pb-4 ${className}`}>
      <ChineseWithPinyin
        text={chineseText}
        showPinyin={showPinyin}
        className={`text-xl tracking-wider leading-10 mb-1`}
      />

      <div className="">
        <p
          className={`text-md text-gray-700 leading-7 tracking-wider border-l-4 border-l-blue-500 pl-4 `}
        >
          {translatedText}
        </p>
      </div>
    </div>
  );
};

export default ChineseTextWithTranslate;
