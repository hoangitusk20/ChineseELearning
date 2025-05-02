import ChineseTextWithTranslate from "@/shared/components/ChineseTextWithTranslate";
import React from "react";

const TranslatedBySentence = ({
  chineseText,
  translatedText,
  showPinyin,
  className,
}) => {
  const chineseSentences = chineseText.split(/(?<=[。！：？])/).filter(Boolean);
  const translatedSentences = translatedText
    .split(/(?<=[.!:?])/)
    .filter(Boolean);
  return (
    <div className={`pt-4 ${className}`}>
      <h2 className="text-xl font-medium mb-4">Nghĩa tiếng Việt theo câu</h2>

      {chineseSentences.map((sentence, index) => (
        <ChineseTextWithTranslate
          key={index}
          chineseText={sentence}
          translatedText={translatedSentences[index] || ""}
          showPinyin={showPinyin}
          className={"mb-3"}
        />
      ))}
    </div>
  );
};

export default TranslatedBySentence;
