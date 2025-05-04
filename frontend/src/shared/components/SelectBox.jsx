import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
const SelectBox = ({ valueDict, value, setvalue, className, placeholder }) => {
  return (
    <Select value={value || ""} onValueChange={setvalue}>
      <SelectTrigger className={` w-full p-5 ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {valueDict.map((value) => (
          <SelectItem key={value.value} value={value.value || ""}>
            {value.display || ""}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectBox;
