import React from "react";
import { Link } from "react-router-dom";

const Banner = ({ activeFeature }) => {
  return (
    <section className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-8 text-white">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">
          Học tiếng Trung hiệu quả với AI
        </h1>
        <p className="text-xl mb-6">
          Khám phá phương pháp học tiếng Trung thông minh với sự hỗ trợ của công
          nghệ AI, giúp bạn tiến bộ nhanh chóng và duy trì động lực học tập.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/register">
            <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Bắt đầu ngay
            </button>
          </Link>
          <Link to={activeFeature.to}>
            <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              Khám phá
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
