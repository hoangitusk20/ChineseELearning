import React from "react";
import { Checkbox } from "@/shared/components/ui/checkbox";
import ChineseWithPinyin from "@/shared/components/ChineseWithPinyin";
import TranslatedBySentence from "./TranslatedBySentence";
const Story = ({ story, meaning }) => {
  const [showPinyin, setShowPinyin] = React.useState(false);
  const [translateBySentence, settranslateBySentence] = React.useState(false);
  return (
    <div className="w-full border rounded-lg shadow-md p-7  flex flex-col my-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-medium">Nội dung câu chuyện</h2>
        <div>
          <Checkbox
            id="translateBySentence"
            checked={translateBySentence}
            onCheckedChange={settranslateBySentence}
          />
          <label htmlFor="translateBySentence" className="text-gray-600 mx-3">
            Dịch theo câu
          </label>
          <Checkbox
            id="showPinyin"
            checked={showPinyin}
            onCheckedChange={setShowPinyin}
          />
          <label htmlFor="showPinyin" className="text-gray-600 mx-3">
            Hiện pinyin
          </label>
        </div>
      </div>
      <ChineseWithPinyin
        text={story}
        showPinyin={showPinyin}
        className="text-xl tracking-wider leading-10 border-b pb-2"
      />

      {translateBySentence && (
        <TranslatedBySentence
          chineseText={story} // Assuming story is the Chinese text you want to translate
          translatedText={meaning} // Assuming meaning is the translated text
          showPinyin={showPinyin}
        />
      )}

      <h2 className="text-xl font-medium py-3">Nghĩa tiếng Việt</h2>
      <p className="text-md text-gray-700 leading-7 tracking-wider">
        {meaning}
      </p>
    </div>
  );
};

export default Story;
