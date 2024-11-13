import React, { useState } from "react";
import Select from "react-select";
import { CountryCode, countryOptions } from "../types/countryCodes";
interface PhoneNumberInputProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  phoneNumber,
  setPhoneNumber,
}) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState<CountryCode>({
    label: "+1 (US)",
    value: "+1",
  });

  const handleCountryCodeChange = (option: CountryCode | null) => {
    if (option) {
      setSelectedCountryCode(option);
      setPhoneNumber(option.value + phoneNumber.replace(/^\+\d+/, ""));
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedNumber = e.target.value.replace(/\D/g, "");
    setPhoneNumber(selectedCountryCode.value + updatedNumber);
  };

  return (
    <div className="flex gap-2 items-center">
      <Select
        value={selectedCountryCode}
        onChange={handleCountryCodeChange}
        options={countryOptions}
        className="w-1/2"
        classNamePrefix="select"
        placeholder="Country Code"
      />
      <input
        type="tel"
        value={phoneNumber.replace(selectedCountryCode.value, "")}
        onChange={handlePhoneNumberChange}
        placeholder="Phone Number"
        className="border rounded px-2 py-1 w-3/4"
      />
    </div>
  );
};

export default PhoneNumberInput;
