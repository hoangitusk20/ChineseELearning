import { Button } from "@/shared/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const FeatureImage = ({ activeFeature }) => {
  return (
    <div className="hidden lg:block">
      <div className="relative h-full rounded-xl overflow-hidden">
        <img
          src={activeFeature.image}
          alt={activeFeature.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{activeFeature.title}</h3>
          <p className="text-gray-200 mb-4">{activeFeature.description}</p>
          <Link to={activeFeature.to}>
            <Button className="w-full cursor-pointer bg-red-600 hover:bg-red-700">
              Bắt đầu ngay
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureImage;
