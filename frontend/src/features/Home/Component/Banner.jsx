import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const titles = [
  "Học tiếng Trung hiệu quả với AI",
  "Khám phá câu chuyện tiếng Trung theo trình độ của bạn",
  "Biến mỗi bài học thành một chuyến phiêu lưu ngôn ngữ",
];

const descriptions = [
  "Khám phá phương pháp học tiếng Trung thông minh với sự hỗ trợ của công nghệ AI, giúp bạn tiến bộ nhanh chóng và duy trì động lực học tập.",
  "AI tự tạo câu chuyện phù hợp với trình độ và chủ đề bạn quan tâm — học mà như đang đọc truyện!",
  "Không còn nhàm chán! Mỗi câu chuyện là một trải nghiệm sống động giúp bạn ghi nhớ từ vựng tự nhiên.",
];

const Banner = ({ activeFeature }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 5000); // đổi mỗi 5 giây

    return () => clearInterval(interval); // cleanup khi component bị unmount
  }, []);

  return (
    <section className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-8 text-white transition-all duration-500 ">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold mb-4 transition-opacity duration-500 ease-in-out h-20">
          {titles[index]}
        </h1>
        <p className="text-xl mb-6 transition-opacity duration-500 ease-in-out">
          {descriptions[index]}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to={activeFeature.to}>
            <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Bắt đầu ngay
            </button>
          </Link>
          <a href="https://www.youtube.com/watch?v=T-kWFihp0Q4">
            <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              Tìm hiểu thêm
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Banner;
