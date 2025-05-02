import React, { useState, useEffect, useRef } from "react";
import { pinyin } from "pinyin-pro";
import { Volume2 } from "lucide-react";

const ChineseWithPinyin = ({
  text,
  showPinyin = true,
  className = "",
  showReadCharButton = true, // Hiển thị nút đọc từng chữ
  showReadFullTextButton = true, // Hiển thị nút đọc nguyên văn bản
  fullTextButtonLabel = "Đọc toàn bộ", // Label cho nút đọc nguyên văn bản
}) => {
  const [elements, setElements] = useState([]);
  const [activeChar, setActiveChar] = useState(null);
  const popupRef = useRef(null);

  const isChinese = (char) => /[\u4e00-\u9fa5]/.test(char);

  // Hàm đọc ký tự hoặc text tiếng Trung
  const speakText = (textToSpeak) => {
    if (window.speechSynthesis) {
      // Dừng bất kỳ lời nói nào đang phát
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "zh-CN"; // Đặt ngôn ngữ là tiếng Trung
      window.speechSynthesis.speak(utterance);
    }
  };

  // Xử lý sự kiện click ra ngoài bảng
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActiveChar(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!text) {
      setElements([]);
      return;
    }

    const newElements = [];

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      if (isChinese(char)) {
        const py = pinyin(char, { toneType: "2" });
        newElements.push(
          <span key={i} className="inline-block relative">
            <ruby
              className="cursor-pointer hover:bg-gray-100 rounded px-0.5"
              onClick={() => setActiveChar({ char, py, index: i })}
            >
              {char}
              {showPinyin && <rt>{py}</rt>}
            </ruby>

            {activeChar && activeChar.index === i && (
              <div
                ref={popupRef}
                className="absolute left-0 top-full mt-1 bg-white shadow-md rounded-md p-2 z-10 border border-gray-200 min-w-34"
              >
                <div className="text-center mb-1 pb-1 border-b border-gray-100">
                  <span className="text-xl">{char}</span>
                  <div className="text-xs text-gray-500">{py}</div>
                </div>
                {showReadCharButton && (
                  <button
                    className="flex items-center gap-2 w-full hover:bg-gray-100 px-2 py-1 rounded mb-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(char);
                    }}
                  >
                    <Volume2 size={14} />
                    <span className="text-xs">Đọc</span>
                  </button>
                )}

                {showReadFullTextButton && text.length > 1 && (
                  <button
                    className="flex items-center gap-2 w-full hover:bg-gray-100 px-2 py-1 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(text);
                      setActiveChar(null); // Đóng popup sau khi bắt đầu đọc
                    }}
                  >
                    <Volume2 size={14} />
                    <span className="text-xs">{fullTextButtonLabel}</span>
                  </button>
                )}
              </div>
            )}
          </span>
        );
      } else {
        newElements.push(<span key={i}>{char}</span>);
      }
    }

    setElements(newElements);
  }, [
    text,
    showPinyin,
    activeChar,
    showReadCharButton,
    showReadFullTextButton,
    fullTextButtonLabel,
  ]);

  return <div className={className}>{elements}</div>;
};

export default ChineseWithPinyin;
