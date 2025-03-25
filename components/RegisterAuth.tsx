/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { useAlert, Alerts } from "next-alert";
import Button from "./Button";
import NormalInputField from "./NormalInputField";
import { LoadingIcon } from "../constants/svgPath";
import PhoneInputCustom from "./PhoneNumberInput";
import { registerUser } from "@/axiosFolder/axiosFunctions/axiosLinkToBackend";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const RegisterAuth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [ageGroup, setAgeGroup] = useState<"child" | "teenager" | "adult" | "">("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { addAlert } = useAlert();
  const router = useRouter();

  const [error, setError] = useState({
    firstNameError: false,
    lastNameError: false,
    phoneError: false,
    emailError: false,
    passwordError: false,
    genderError: false,
    ageGroupError: false,
  });

  const validateForm = () => {
    if (!firstName) {
      setError({ ...error, firstNameError: true });
      return false;
    }
    if (!lastName) {
      setError({ ...error, lastNameError: true });
      return false;
    }
    if (!phone) {
      setError({ ...error, phoneError: true });
      return false;
    }
    if (!email) {
      setError({ ...error, emailError: true });
      return false;
    }
    if (!password) {
      setError({ ...error, passwordError: true });
      return false;
    }
    if (!gender) {
      setError({ ...error, genderError: true });
      return false;
    }
    if (!ageGroup) {
      setError({ ...error, ageGroupError: true });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    setError({
      firstNameError: false,
      lastNameError: false,
      phoneError: false,
      emailError: false,
      passwordError: false,
      genderError: false,
      ageGroupError: false,
    });

    console.log(email,
      password,
      firstName,
      lastName,
      phone,
      gender,
      ageGroup,
      loading,
      showPassword
    )
    try {
      const response = await registerUser({
        email,
        password,
        firstName,
        lastName,
        phone,
        gender,
        ageGroup,
      });

      if (response.status !== 201) {
        setLoading(false);
        return addAlert("Error", response.data.message, "error");
      }

      addAlert("Success", response.data.message, "success");
      setLoading(false);
      router.push("/login");
    } catch (err: any) {
      addAlert("Error", err.message, "error");
      setError({ ...error, emailError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-4">
      <form className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-[#60646C]">
            First Name
          </label>
          <NormalInputField
            id="firstName"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setError({ ...error, firstNameError: false });
            }}
            placeholder="Input your first name"
            type="text"
            error={error.firstNameError}
            errorMessage="First name is required"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-[#60646C]">
            Last Name
          </label>
          <NormalInputField
            id="lastName"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setError({ ...error, lastNameError: false });
            }}
            placeholder="Input your last name"
            type="text"
            error={error.lastNameError}
            errorMessage="Last name is required"
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#60646C]">
            Phone Number
          </label>
          <PhoneInputCustom
            value={phone}
            onChangePhoneNumber={(fullPhoneNumber: string) => {
              setPhone(fullPhoneNumber);
              setError({ ...error, phoneError: false });
            }}
            placeholder="Input your phone number"
            initialCountryCode="US"
            error={error.phoneError}
            errorMessage="Phone Number is required"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-[#60646C]">
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value as "male" | "female");
              setError({ ...error, genderError: false });
            }}
            className={`w-full text-[#80838D] bg-[#F0F0F3] border-1 px-3 h-[52px] py-2 rounded-lg ${
              error.genderError ? "border-[#D42620]" : "border-[#80838D]"
            }`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {error.genderError && (
            <p className="text-red-500 text-sm mt-1">Gender is required</p>
          )}
        </div>
        <div>
          <label htmlFor="ageGroup" className="block text-sm font-medium text-[#60646C]">
            Age Group
          </label>
          <select
            id="ageGroup"
            value={ageGroup}
            onChange={(e) => {
              setAgeGroup(e.target.value as "child" | "teenager" | "adult");
              setError({ ...error, ageGroupError: false });
            }}
            className={`w-full px-3 text-[#80838D] bg-[#F0F0F3] h-[52px] py-2 border-1 rounded-lg ${
              error.ageGroupError ? "border-[#D42620]" : "border-[#80838D]"
            }`}
          >
            <option value="">Select Age Group</option>
            <option value="child">Child</option>
            <option value="teenager">Teenager</option>
            <option value="adult">Adult</option>
          </select>
          {error.ageGroupError && (
            <p className="text-red-500 text-sm mt-1">Age Group is required</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#60646C]">
            Email
          </label>
          <NormalInputField
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError({ ...error, emailError: false });
            }}
            placeholder="Input your email address"
            type="email"
            error={error.emailError}
            errorMessage="Email is required"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[#60646C]">
            Password
          </label>
          <div className="relative">
            <NormalInputField
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError({ ...error, passwordError: false });
              }}
              placeholder="Input your password"
              type={showPassword ? "text" : "password"}
              error={error.passwordError}
              errorMessage="Password is required"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
              ) : (
                <AiOutlineEye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
        <div className="mt-6">
          <Button type="submit" disabled={loading} onClick={handleSubmit}>
            {loading ? <LoadingIcon /> : "Sign Up"}
          </Button>
        </div>
      </form>
      <Alerts
        position="bottom-right"
        direction="right"
        timer={3000}
        className="rounded-md relative z-50 !w-80"
      />
    </div>
  );
};

export default RegisterAuth;