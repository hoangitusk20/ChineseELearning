import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import { useSelector } from "react-redux";

import InputBox from "./Component/InputBox";
import Story from "./Component/Story/Story";
import Grammar from "./Component/Grammar";
import Vocabulary from "./Component/Vocabulary";
import { generateStoryFromTopic } from "@/shared/services/GenerateStory";
import ChineseWithPinyin from "@/shared/components/ChineseWithPinyin";

const LearnByTopicPage = () => {
  const [story, setStory] = useState("");
  const [vocabulary, setVocabulary] = useState([]);
  const [grammar, setGrammar] = useState([]);
  const [meaning, setMeaning] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { accessToken } = useSelector((state) => state.auth);

  const GenerateStory = async (inputText, wordCount, HSKLevel, provider) => {
    setIsLoading(true); // Bắt đầu loading
    try {
      const response = await generateStoryFromTopic(
        accessToken,
        { content: inputText, hskLevel: HSKLevel, wordCount: wordCount },
        provider
      );
      console.log("response", response);
      setStory(response.story);
      setVocabulary(response.vocabulary);
      setGrammar(response.grammar);
      setMeaning(response.meaning);
    } catch (error) {
      if (error?.response?.data?.errors?.provider) {
        alert(
          "Chúng tôi không hỗ trợ provider này, vui lòng chọn provider khác"
        );
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại sau");
      }
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Title */}
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="text-red-600" size={24} />
        <h1 className="text-3xl font-bold">Tạo câu chuyện từ chủ đề</h1>
      </div>

      {/* Input box */}
      <InputBox handleSubmit={GenerateStory} />
      {/* <ChineseWithPinyin
        text={"你好"}
        showPinyin={true}
        className="text-xl tracking-wider leading-10 border-b pb-2"
      /> */}

      {/* Loading state */}
      {isLoading && (
        <div className="text-center text-blue-600 font-medium my-6">
          Đang tạo câu chuyện, vui lòng chờ...
        </div>
      )}

      {/* Story */}
      {!isLoading && story != "" && <Story story={story} meaning={meaning} />}
      {/* Vocabulary */}
      {vocabulary.length != 0 && !isLoading && (
        <Vocabulary vocabulary={vocabulary} />
      )}
      {/* Grammar */}
      {grammar.length != 0 && !isLoading && <Grammar grammar={grammar} />}
    </div>
  );
};

export default LearnByTopicPage;
