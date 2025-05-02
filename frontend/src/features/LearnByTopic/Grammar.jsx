import ChineseWithPinyin from "@/shared/components/ChineseWithPinyin";
import { Checkbox } from "@/shared/components/ui/checkbox";
import React from "react";

const Grammar = ({ grammar }) => {
  const [showPinyin, setShowPinyin] = React.useState(false);

  return (
    <div className="w-full border rounded-lg shadow-md p-7  flex flex-col my-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-medium">Ngữ pháp</h2>
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
      <div className="">
        {Object.entries(grammar).map(([key, value]) => (
          <div key={key} className="py-2">
            <h3 className="text-xl">
              <ChineseWithPinyin
                text={key}
                showPinyin={showPinyin}
                className="text-xl tracking-wider leading-10 border-b pb-2"
              />
            </h3>
            <p className="text-md text-gray-600">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grammar;
