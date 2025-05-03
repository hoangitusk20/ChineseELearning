import { BookOpen, Bookmark, Languages, Book } from "lucide-react";

const features = [
  {
    id: 1,
    to: "/create-story-from-topic",
    icon: BookOpen,
    title: "Tạo câu chuyện từ chủ đề",
    detailDescription:
      "Bạn có một chủ đề mà bạn muốn học? Hãy để tôi giúp bạn! Chỉ cần nhập chủ đề đó vào ô bên dưới, và tôi sẽ tạo ra một câu chuyện thú vị bằng tiếng Trung. Bạn sẽ không chỉ học được từ vựng mới mà còn hiểu rõ hơn về ngữ pháp và cách sử dụng chúng trong ngữ cảnh thực tế.",
    description:
      "Nhập chủ đề bạn muốn học, AI sẽ tạo ra một câu chuyện thú vị bằng tiếng Trung kèm theo giải thích từ vựng và ngữ pháp.",
    color: "border-blue-500",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    to: "/pratice-vocabulary",
    icon: Bookmark,
    title: "Tạo câu chuyện từ từ vựng",
    detailDescription:
      "Bạn có một danh sách từ vựng mà bạn muốn học? Hãy để tôi giúp bạn! Chỉ cần nhập danh sách từ vựng đó vào ô bên dưới, và tôi sẽ tạo ra một câu chuyện thú vị sử dụng những từ vựng đó. Bạn sẽ không chỉ học được cách sử dụng từ vựng trong ngữ cảnh mà còn có thể nhớ chúng lâu hơn. Hãy thử ngay nhé!",
    description:
      "Nhập danh sách từ vựng bạn muốn học, AI sẽ tạo ra một câu chuyện hấp dẫn sử dụng các từ vựng đó.",
    color: "border-green-500",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    to: "/practice-writing",
    icon: Languages,
    title: "Luyện viết hán tự",
    detailDescription:
      "Bạn muốn cải thiện kỹ năng viết chữ Hán của mình? Hãy thử luyện viết với hướng dẫn chi tiết về thứ tự nét, phát âm và ý nghĩa của từng chữ. Bạn sẽ không chỉ học cách viết mà còn hiểu rõ hơn về ngữ nghĩa và cách sử dụng của chúng trong câu.",
    description:
      "Luyện viết chữ Hán với hướng dẫn chi tiết về thứ tự nét, phát âm và ý nghĩa của từng chữ.",
    color: "border-red-500",
    image:
      "https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    to: "/learning-materials",
    icon: Book,
    title: "Tài nguyên học tập",
    detailDescription:
      "Bạn đang tìm kiếm tài liệu học tập phong phú và đa dạng? Hãy khám phá kho tài liệu của chúng tôi! Từ sách giáo khoa, bài giảng, video hướng dẫn đến các tài nguyên học tập khác, chúng tôi cung cấp tất cả những gì bạn cần để nâng cao kỹ năng tiếng Trung của mình.",
    description:
      "Truy cập kho tài liệu phong phú bao gồm sách, bài giảng, video và các tài nguyên học tập khác.",
    color: "border-indigo-500",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
];

export default features;
