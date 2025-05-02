import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const FeatureDetail = ({ activeFeature, setActiveFeature, feature }) => {
  return (
    <div
      key={feature.id}
      onClick={() => setActiveFeature(feature)}
      className={`block p-6 rounded-xl cursor-pointer transition-all ${
        activeFeature.id === feature.id
          ? "bg-white shadow-lg border-l-4 border-red-500"
          : "bg-gray-50 hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center">
        <div
          className={`p-3 rounded-lg mr-4 ${
            activeFeature.id === feature.id
              ? feature.color.replace("border", "bg").replace("-500", "-100")
              : "bg-gray-200"
          }`}
        >
          <feature.icon
            className={`${
              activeFeature.id === feature.id
                ? feature.color
                    .replace("border", "text")
                    .replace("-500", "-600")
                : "text-gray-600"
            }`}
            size={24}
          />
        </div>
        <h3
          className={`text-xl font-semibold ${
            activeFeature.id === feature.id ? "text-red-600" : "text-gray-800"
          }`}
        >
          {feature.title}
        </h3>
      </div>
      {activeFeature.id === feature.id && (
        <p className="mt-4 text-gray-600">{feature.detailDescription}</p>
      )}
      {activeFeature.id === feature.id && (
        <Link
          to={feature.to}
          className="block lg:hidden w-full bg-white text-primary hover:underline p-2 mt-3 text-center rounded-lg text-md"
        >
          Go to Page
          <ChevronRight className="mx-1 inline " />
        </Link>
      )}
    </div>
  );
};

export default FeatureDetail;
