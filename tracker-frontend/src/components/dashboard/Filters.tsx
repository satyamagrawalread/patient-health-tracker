import React from "react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

export default function Filters({selectedFilters, setSelectedFilters}: {selectedFilters: string[], setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Filter <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={selectedFilters.includes("name")}
          onCheckedChange={() => {
            setSelectedFilters((prevFilters) =>
              prevFilters.includes("name")
                ? prevFilters.filter((filter) => filter !== "name")
                : [...prevFilters, "name"]
            );
          }}
        >
          Name
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedFilters.includes("gender")}
          onCheckedChange={() => {
            setSelectedFilters((prevFilters) =>
              prevFilters.includes("gender")
                ? prevFilters.filter((filter) => filter !== "gender")
                : [...prevFilters, "gender"]
            );
          }}
        >
          Gender
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedFilters.includes("condition")}
          onCheckedChange={() => {
            setSelectedFilters((prevFilters) =>
              prevFilters.includes("condition")
                ? prevFilters.filter((filter) => filter !== "condition")
                : [...prevFilters, "condition"]
            );
          }}
        >
          Condition
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedFilters.includes("treatmentPlan")}
          onCheckedChange={() => {
            setSelectedFilters((prevFilters) =>
              prevFilters.includes("treatmentPlan")
                ? prevFilters.filter((filter) => filter !== "treatmentPlan")
                : [...prevFilters, "treatmentPlan"]
            );
          }}
        >
          Treatment Plan
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedFilters.includes("medicalHistory")}
          onCheckedChange={() => {
            setSelectedFilters((prevFilters) =>
              prevFilters.includes("medicalHistory")
                ? prevFilters.filter((filter) => filter !== "medicalHistory")
                : [...prevFilters, "medicalHistory"]
            );
          }}
        >
          Medical History
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={false}
          onCheckedChange={() => {
            setSelectedFilters([]);
          }}
        >
          Clear All
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
