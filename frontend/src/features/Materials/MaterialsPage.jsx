import React from "react";
import { materials } from "./Materials";
import { Book } from "lucide-react";

const MaterialsPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <Book className="text-red-600" size={24} />
        <h1 className="text-3xl font-bold">Tài nguyên học tập</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material) => (
          <div
            key={material.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={material.image}
                alt={material.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                {material.level}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500">{material.type}</span>
              </div>
              <h2 className="text-xl font-bold mb-2">{material.title}</h2>
              <p className="text-gray-600 mb-4">{material.description}</p>
              <a
                href={material?.source}
                className="w-full block text-center hover:cursor-pointer bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Tôi muốn nó!
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialsPage;
