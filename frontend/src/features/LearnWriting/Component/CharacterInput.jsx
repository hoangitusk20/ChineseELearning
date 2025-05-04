import React from "react";

const CharacterInput = ({ value, onChange }) => {
  return (
    <input
      className="w-full p-2 border rounded"
      placeholder="Nhập chữ Hán..."
      maxLength={1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default CharacterInput;
