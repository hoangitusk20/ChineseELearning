import ChineseWithPinyin from "@/shared/components/ChineseWithPinyin";
import { Checkbox } from "@/shared/components/ui/checkbox";
import React from "react";

const Vocabulary = ({ vocabulary }) => {
  const [showPinyin, setShowPinyin] = React.useState(false);

  return (
    <div className="w-full border rounded-lg shadow-md p-7  flex flex-col my-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-medium">Từ vựng</h2>
        <div className="">
          <Checkbox
            id="showVocabPinyin"
            checked={showPinyin}
            onCheckedChange={setShowPinyin}
          />
          <label htmlFor="showVocabPinyin" className="text-gray-600 mx-3">
            Hiện pinyin
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
        {Object.entries(vocabulary).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between border-b py-2"
          >
            <span className="text-xl">
              <ChineseWithPinyin text={key} showPinyin={showPinyin} />
            </span>
            <span className="text-md text-gray-600">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vocabulary;
