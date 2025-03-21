/* eslint-disable @typescript-eslint/no-require-imports */
"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Search, X, XCircle } from "lucide-react";

// You'll need to create this JSON file in your data directory
// or import it from a package
interface CountryData {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}

interface PhoneInputProps {
  value: string;
  onChangePhoneNumber: (phoneNumber: string) => void;
  placeholder: string;
  initialCountryCode: string;
  error?: boolean;
  errorMessage?: string;
}

const PhoneInputCustom: React.FC<PhoneInputProps> = ({
  value,
  onChangePhoneNumber,
  placeholder = "Enter your phone number",
  initialCountryCode = "NG",
  error,
  errorMessage,
}) => {
  // This would be imported from your data file
  const countriesData: CountryData[] = require("../data/countryDialCode.json");

  const [phoneNumber, setPhoneNumber] = useState(value || "");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryData>({
    name: "Nigeria",
    flag: "🇳🇬",
    code: "NG",
    dial_code: "+234",
  });
  const [filteredCountries, setFilteredCountries] = useState<CountryData[]>([]);

  useEffect(() => {
    const defaultCountry = countriesData.find(
      (country) => country.code === initialCountryCode.toUpperCase()
    );
    if (defaultCountry) {
      setSelectedCountry(defaultCountry);
    }
  }, [initialCountryCode, countriesData]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCountries(countriesData);
    } else {
      const filtered = countriesData.filter(
        (country) =>
          country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          country.dial_code.includes(searchQuery) ||
          country.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [searchQuery, countriesData]);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    const finalNumber = numericValue.replace(/^0/, "");
    setPhoneNumber(numericValue);

    if (onChangePhoneNumber) {
      onChangePhoneNumber(selectedCountry?.dial_code + finalNumber);
    }
  };

  const selectCountry = (country: CountryData) => {
    setSelectedCountry(country);
    setModalVisible(false);
    setSearchQuery("");

    if (onChangePhoneNumber) {
      onChangePhoneNumber(country.dial_code + phoneNumber);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`flex text-[#80838D] items-center border-1 h-[52px] bg-[#F0F0F3] rounded-md overflow-hidden ${
          error ? "border-[#D42620]" : "border-[#80838D]"
        }`}
      >
        {/* Country Selector */}
        <div
          className="flex items-center px-3 py-3.5 border-r border-[#E0E0E0] bg-[#F0F0F3] cursor-pointer"
          onClick={() => {
            setModalVisible(true);
            setFilteredCountries(countriesData);
          }}
        >
          <span className="text-xl mr-1">{selectedCountry?.flag}</span>
          <span className="text-sm text-[#80838D] mr-1">
            {selectedCountry?.dial_code}
          </span>
          <ChevronDown size={16} className="text-gray-500" />
        </div>

        {/* Phone Input */}
        <input
          className="flex-1 px-3 py-3.5 text-base text-[#80838D] bg-[#F0F0F3] focus:outline-none"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder={placeholder}
          type="tel"
        />
      </div>

      {error && (
        <p className="text-[#D42620] mt-2 text-xs font-medium">
          {errorMessage}
        </p>
      )}

      {/* Country Selection Modal */}
      {modalVisible && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center sm:items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-xl max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-[#E0E0E0]">
              <h3 className="text-lg font-bold text-gray-800">
                Select Country
              </h3>
              <button
                className="p-1"
                onClick={() => {
                  setModalVisible(false);
                  setSearchQuery("");
                }}
              >
                <X size={24} className="text-gray-800" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex items-center mx-4 my-3 px-3 border border-[#E0E0E0] rounded-lg bg-[#F8F8F8]">
              <Search size={20} className="text-gray-500 mr-2" />
              <input
                className="flex-1 py-2.5 text-base text-gray-700 bg-transparent focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search countries..."
                autoCapitalize="none"
              />
              {searchQuery.length > 0 && (
                <button onClick={() => setSearchQuery("")}>
                  <XCircle size={20} className="text-gray-500" />
                </button>
              )}
            </div>

            {/* Country List */}
            <div className="overflow-y-auto flex-1">
              {filteredCountries.map((country) => (
                <div
                  key={country.code}
                  className="flex items-center py-3 px-4 border-b border-[#F0F0F0] cursor-pointer hover:bg-gray-50"
                  onClick={() => selectCountry(country)}
                >
                  <span className="text-2xl mr-3">{country.flag}</span>
                  <div>
                    <div className="text-base text-gray-800">
                      {country.name}
                    </div>
                    <div className="text-sm text-gray-500 mt-0.5">
                      {country.dial_code}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneInputCustom;
