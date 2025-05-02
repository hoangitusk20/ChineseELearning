import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ChineseLMS</h3>
            <p className="text-gray-300">
              Nền tảng học tiếng Trung thông minh tích hợp AI, giúp bạn học
              nhanh và hiệu quả.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Tính năng</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/create-by-topic"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Học theo chủ đề
                </Link>
              </li>
              <li>
                <Link
                  to="/create-by-vocab"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Học theo từ vựng
                </Link>
              </li>
              <li>
                <Link
                  to="/learn-character"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Học chữ Hán
                </Link>
              </li>

              <li>
                <Link
                  to="/documents"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Tài liệu
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <p className="text-gray-300">Email: contact@chineselms.com</p>
            <p className="text-gray-300">Điện thoại: +84 123 456 789</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} ChineseLMS. Tất cả quyền được bảo
            lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
