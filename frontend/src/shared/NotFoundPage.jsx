import React from "react";
import { AlertCircle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-red-600 p-6 flex justify-center">
          <AlertCircle size={80} color="white" strokeWidth={1.5} />
        </div>

        <div className="p-6 space-y-6">
          <h1 className="text-5xl font-bold text-red-600">404</h1>
          <div className="h-1 w-16 bg-red-600 mx-auto"></div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Trang không tìm thấy
          </h2>
          <p className="text-gray-600">
            Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di
            chuyển.
          </p>

          <div className="pt-4">
            <button
              onClick={() => (window.location.href = "/")}
              className="px-6 py-3 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors duration-300 shadow-md"
            >
              Trở về trang chủ
            </button>
          </div>
        </div>

        <div className="bg-red-50 p-4 border-t border-red-100">
          <p className="text-sm text-red-800">
            Nếu bạn tin rằng đây là lỗi, vui lòng liên hệ đội hỗ trợ của chúng
            tôi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
