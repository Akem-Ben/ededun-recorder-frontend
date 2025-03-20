// components/AuthForm.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { useAlert, Alerts } from "next-alert"
import Button from "./Button";
import Link from "next/link";
import NormalInputField from "./NormalInputField";
import { LoadingIcon } from "../constants/svgPath";
import PhoneInputCustom from "./PhoneNumberInput";
import { registerUser, loginUser } from "@/axiosFolder/configurations/axiosLinkToBackend";

type AuthFormProps = {
  isLogin: boolean;
};

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const { addAlert } = useAlert()

  const router = useRouter()

  const [error, setError] = useState({
    firstNameError: false,
    lastNameError: false,
    phoneNumberError: false,
    emailError: false,
    passwordError: false,
  });


  const validateForm = () => {
    if (!isLogin) {
      if (!firstName) {
        setError({ ...error, firstNameError: true });
        return false;
      }
      if (!lastName) {
        setError({ ...error, lastNameError: true });
        return false;
      }
      if (!phoneNumber) {
        setError({ ...error, phoneNumberError: true });
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
    } else if (isLogin) {
      if (!email) {
        setError({ ...error, emailError: true });
        return false;
      }
      if (!password) {
        setError({ ...error, passwordError: true });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log(validateForm());
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    setError({
      firstNameError: false,
      lastNameError: false,
      phoneNumberError: false,
      emailError: false,
      passwordError: false,
    });

    try {
      let response;
      
      if(isLogin) {

        response = await loginUser({ email, password })
        localStorage.setItem('user', JSON.stringify(response.data.data.user))
        localStorage.setItem('accessToken', response.data.data.accessToken)
        localStorage.setItem('refreshToken', response.data.data.refreshToken)

      }else {
        response = await registerUser({ email, password, firstName, lastName, phoneNumber });
      }

      if (response.status !== 201 && response.status !== 200) {
        setLoading(false)
        return addAlert("Error", response.data.message, "error")
      }

      if (!isLogin) {
        addAlert('Success', response.data.message, 'success')
        setLoading(false)
        return router.push('/login')
      }

      router.push('/phrases')

      return setLoading(false)



    } catch (err: any) {
      setError({ ...error, emailError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-4">
      <form className="space-y-4">
        {!isLogin && (
          <>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-[#60646C]"
              >
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
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-[#60646C]"
              >
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
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-[#60646C]"
              >
                Phone Number
              </label>

              <PhoneInputCustom
                value={phoneNumber}
                onChangePhoneNumber={(fullPhoneNumber: string) => {
                  setPhoneNumber(fullPhoneNumber);
                  setError({ ...error, phoneNumberError: false });
                }}
                placeholder="Input your phone number"
                initialCountryCode="US"
                error={error.phoneNumberError}
                errorMessage="Phone Number is required"
              />
            </div>
          </>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#60646C]"
          >
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
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#60646C]"
          >
            Password
          </label>
          <NormalInputField
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError({ ...error, passwordError: false });
            }}
            placeholder="Input your password"
            type="password"
            error={error.passwordError}
            errorMessage="Password is required"
          />
        </div>

        <div className="mt-6">
          <Button type="submit" disabled={loading} onClick={handleSubmit}>
            {loading ? <LoadingIcon /> : isLogin ? "Login" : "Sign Up"}
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

export default AuthForm;
