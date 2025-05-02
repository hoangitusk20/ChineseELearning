import { Slider } from "@/shared/components/ui/slider";
import React from "react";
import { ChevronDown } from "lucide-react";
import SelectProvider from "@/shared/components/SelectProvider";
import SelectHSKLevel from "@/shared/components/SelectHSKLevel";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";

const InputBox = ({ handleSubmit }) => {
  const [inputText, setInputText] = useState("");
  const [wordCount, setWordCount] = useState(100);
  const [HSKLevel, setHSKLevel] = useState("HSK1");
  const [hideAdVancedOption, setHideAdVancedOption] = useState(true);
  const [provider, setProvider] = useState("Gemini");
  return (
    <div className="w-full border rounded-lg shadow-md p-4  flex flex-col">
      <label htmlFor="input" className="text-red-700  text-md py-2 mx-3">
        Nhập topic bạn muốn tạo
      </label>

      <input
        type="text"
        id="input"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type here..."
        className="border rounded-md p-2 mt-2 my-2 mx-3 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <div className="my-3 flex">
        {/* Word Count */}
        <div className="flex-grow px-3">
          <label htmlFor="wordCount" className="text-red-700  text-md">
            Độ dài câu chuyện: {wordCount} từ
          </label>
          <Slider
            id="wordCount"
            defaultValue={[100]}
            max={500}
            value={[wordCount]}
            onValueChange={(value) => setWordCount(value[0])}
            step={10}
            className="my-5"
          />
        </div>
        {/* HSK Level */}
        <div className="flex-grow px-3">
          <label htmlFor="hskLevel" className="text-red-700  text-md">
            {" "}
            Chọn cấp độ
          </label>
          <SelectHSKLevel
            HSKLevel={HSKLevel}
            setHSKLevel={setHSKLevel}
            className="w-full my-2"
          />
        </div>
      </div>
      {/* Advanced options */}
      <div className="px-3 flex flex-col">
        <div className="flex">
          <ChevronDown
            id="advancedOptions"
            className={`${
              hideAdVancedOption ? "rotate-180" : ""
            } transition-all duration-300`}
          />
          <label
            htmlFor="advancedOptions"
            className="text-red-700  text-md mx-2 hover:cursor-pointer hover:underline"
            onClick={() => setHideAdVancedOption(!hideAdVancedOption)}
          >
            Tùy chọn nâng cao
          </label>
        </div>

        {!hideAdVancedOption && (
          <div className="mx-3 my-3 py-4 px-4 bg-gray-100 rounded-md">
            <label htmlFor="Provider" className="text-red-700  text-sm">
              {" "}
              Dịch vụ
            </label>
            <SelectProvider
              provider={provider}
              setProvider={setProvider}
              className="w-full my-2"
            />
          </div>
        )}
      </div>
      <Button
        className={`mx-3 my-5 w-auto`}
        onClick={() => handleSubmit(inputText, wordCount, HSKLevel, provider)}
      >
        Tạo câu chuyện
      </Button>
    </div>
  );
};

export default InputBox;
