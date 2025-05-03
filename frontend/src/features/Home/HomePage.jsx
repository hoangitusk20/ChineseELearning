import React, { useState } from "react";
import Banner from "./Component/Banner";
import Features from "./Component/FeaturesSection/Features";
import HomeFeatuers from "./Component/FeaturesSection/HomeFeatures";

const HomePage = () => {
  const [activeFeature, setActiveFeature] = useState(HomeFeatuers[0]);
  return (
    <div className="space-y-8">
      <Banner activeFeature={activeFeature} />
      <Features
        activeFeature={activeFeature}
        setActiveFeature={setActiveFeature}
      />
    </div>
  );
};

export default HomePage;
