import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
const SelectProvider = ({ provider, setProvider, className }) => {
  return (
    <Select value={provider} onValueChange={setProvider}>
      <SelectTrigger className={` w-full p-5 ${className}`}>
        <SelectValue placeholder="Select provider" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Gemini">Gemini</SelectItem>
        <SelectItem value="OpenAI">OpenAI</SelectItem>
        <SelectItem value="Deepseek">Deepseek</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectProvider;
