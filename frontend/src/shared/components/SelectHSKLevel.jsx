import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

const SelectHSKLevel = ({ HSKLevel, setHSKLevel, className }) => {
  return (
    <Select
      id="hskLevel"
      defaultValue="HSK1"
      value={HSKLevel}
      onValueChange={setHSKLevel}
    >
      <SelectTrigger className={`w-full my-2 ${className}`}>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="HSK1">HSK1</SelectItem>
        <SelectItem value="HSK2">HSK2</SelectItem>
        <SelectItem value="HSK3">HSK3</SelectItem>
        <SelectItem value="HSK4">HSK4</SelectItem>
        <SelectItem value="HSK5">HSK5</SelectItem>
        <SelectItem value="HSK6">HSK6</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectHSKLevel;
