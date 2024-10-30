import React, { useMemo, useState } from "react";
import { useGetAllPatientsQuery } from "@/hooks/api-hooks/usePatientsQuery";
import Patient from "./patient/Patient";
import PatientInfo from "./patient/PatientInfo";
import { MdClear } from "react-icons/md";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import Filters from "./Filters";
import { useNavigate, useParams } from "react-router-dom";

export default function PatientsList() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [copySelectedFilters, setCopySelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copySearchQuery, setCopySearchQuery] = useState<string>("");
  const { patientId } = useParams();
  const navigate = useNavigate();
  const { data: patientsData, isLoading } = useGetAllPatientsQuery({
    filters: copySelectedFilters,
    searchQuery: copySearchQuery,
  });

  const patients = useMemo(() => {
    return patientsData?.data || [];
  }, [patientsData]);

  const isMenuOpen = useMemo(() => {
    return !patientId?.trim();
  }, [patientId]);

  const handleSearchQuery = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCopySearchQuery(searchQuery);
    setCopySelectedFilters(selectedFilters);
    navigate("/");
  };
  const handleQueryClear = () => {
    setSearchQuery("");
    setSelectedFilters([]);
    setCopySearchQuery("");
    setCopySelectedFilters([]);
    navigate("/");
  };
  return (
    <div className="w-screen flex-1 flex md:m-2 mt-2 overflow-hidden">
      <div
        className={cn(
          "md:hidden w-screen h-full flex flex-col bg-white transform transition-transform duration-300 ease-in-out overflow-hidden box-border",
          isMenuOpen ? "translate-x-0" : "w-0 -translate-x-full"
        )}
      >
        <form className="max-w-lg flex mx-2" onSubmit={handleSearchQuery}>
          <div className="flex-1 flex">
            <div className="mr-2">
              <Filters
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
            </div>
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-blue-600 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
              />
              <span
                className="h-full flex items-center p-1.5 absolute end-10 top-0 cursor-pointer"
                onClick={() => {}}
              >
                {copySearchQuery && (
                  <MdClear
                    className="h-6 w-6 p-0.5 bg-blue-50 text-blue-600 rounded-full"
                    onClick={handleQueryClear}
                  />
                )}
              </span>
              <button
                type="submit"
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
        <div className="text-xl text-gray-800 py-2 pl-2 border-b border-blue-200">
          Patients
        </div>
        <div className="flex-1 overflow-y-auto">
          {isLoading && (
            <div className="flex pt-16 justify-center">
              <Loader2Icon className=" animate-spin " />
            </div>
          )}
          {!isLoading && patients.length == 0 && <div>No Patient Found</div>}
          {patients.length > 0 &&
            patients.map((patient) => (
              <Patient
                key={patient._id}
                patient={patient}
                searchQuery={searchQuery}
              />
            ))}
        </div>
      </div>
      <div className="hidden md:flex flex-col min-w-80 border-r pr-2 box-border">
        <form className="max-w-lg flex" onSubmit={handleSearchQuery}>
          <div className="flex-1 flex">
            <div className="mr-2 p-1">
              <Filters
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
            </div>
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-blue-600 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
              />
              <span
                className="h-full flex items-center p-1.5 absolute end-10 top-0 cursor-pointer"
                onClick={() => {}}
              >
                {copySearchQuery && (
                  <MdClear
                    className="h-6 w-6 p-0.5 bg-blue-50 text-blue-600 rounded-full"
                    onClick={handleQueryClear}
                  />
                )}
              </span>
              <button
                type="submit"
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
        <div className="text-xl text-gray-800 py-2 border-b border-blue-200">
          Patients
        </div>
        {isLoading && (
          <Loader2Icon className=" animate-spin w-full text-center mt-20" />
        )}
        {!isLoading && patients.length == 0 && <div>No Patient Found</div>}
        {patients.length > 0 &&
          patients.map((patient) => (
            <Patient
              key={patient._id}
              patient={patient}
              searchQuery={searchQuery}
            />
          ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {!patientId && (
          <div className="w-full text-center pt-14 text-muted-foreground text-2xl">
            No Patient Selected
          </div>
        )}
        {patientId && <PatientInfo searchQuery={searchQuery} />}
      </div>
    </div>
  );
}
