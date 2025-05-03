import React from "react";
import APIKeyBox from "./Component/APIKeyBox";

const ProfilePage = () => {
  return (
    <div className="container h-[50vh]">
      <div className="mx-auto text-center justify-center mt-20">
        <h2 className="text-2xl">Thông tin API Key của bạn</h2>
        <APIKeyBox />
      </div>
    </div>
  );
};

export default ProfilePage;
