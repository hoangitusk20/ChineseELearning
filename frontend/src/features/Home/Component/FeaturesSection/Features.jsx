import { Button } from "@/shared/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import features from "./HomeFeatures";
import FeatureIntro from "./FeatureIntro";
import FeatureDetail from "./FeatureDetail";
import FeatureImage from "./FeatureImage";

const Features = ({ activeFeature, setActiveFeature }) => {
  return (
    <section className="py-12">
      <FeatureIntro />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Feature List */}
        <div className="space-y-4">
          {features.map((feature, index) => (
            <FeatureDetail
              activeFeature={activeFeature}
              feature={feature}
              setActiveFeature={setActiveFeature}
              key={index}
            />
          ))}
        </div>
        <FeatureImage activeFeature={activeFeature} />
      </div>
    </section>
  );
};

export default Features;
