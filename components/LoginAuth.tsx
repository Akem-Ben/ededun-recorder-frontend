/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { useAlert, Alerts } from "next-alert";
import Button from "./Button";
import NormalInputField from "./NormalInputField";
import { LoadingIcon } from "../constants/svgPath";
import { loginUser } from "@/axiosFolder/configurations/axiosLinkToBackend";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginAuth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { addAlert } = useAlert();
  const router = useRouter();

  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
  });

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setError((prev) => ({ ...prev, emailError: true }));
      isValid = false;
    }
    if (!password) {
      setError((prev) => ({ ...prev, passwordError: true }));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    setError({
      emailError: false,
      passwordError: false,
    });

    try {
      const response = await loginUser({ email, password });

      if (response.status !== 200) {
        setLoading(false);
        return addAlert("Error", response.data.message, "error");
      }

      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);

      addAlert("Success", response.data.message, "success");

      setLoading(false);
      router.push("/phrases");
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
            {loading ? <LoadingIcon /> : "Login"}
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

export default LoginAuth;