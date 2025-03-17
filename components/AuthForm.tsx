// components/AuthForm.tsx
import React, { useState } from "react";
// import { useRouter } from 'next/router';
import { motion } from "framer-motion";
import Button from "./Button";
import Link from "next/link";
import NormalInputField from "./NormalInputField";
import { LoadingIcon } from "../constants/svgPath";
import PhoneInputCustom from "./PhoneNumberInput";

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
  const [error, setError] = useState({
    firstNameError: false,
    lastNameError: false,
    phoneNumberError: false,
    emailError: false,
    passwordError: false,
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
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitting form");
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
      // const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      // const response = await fetch(endpoint, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(isLogin ? { email, password } : { name, email, password }),
      // });
      // const data = await response.json();
      // if (!response.ok) {
      //   throw new Error(data.message || 'Authentication failed');
      // }
      // Store token in localStorage
      // localStorage.setItem('token', data.token);
      // Redirect to phrases page
      //   router.push('/phrases');
    } catch (err: any) {
      setError({ ...error, emailError: true });
    } finally {
      setLoading(false);
    }
  };
  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     setLoading(true);
  //     setError('');

  //     try {
  //       const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
  //       const response = await fetch(endpoint, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(isLogin ? { email, password } : { name, email, password }),
  //       });

  //       const data = await response.json();

  //       if (!response.ok) {
  //         throw new Error(data.message || 'Authentication failed');
  //       }

  //       // Store token in localStorage
  //       localStorage.setItem('token', data.token);

  //       // Redirect to phrases page
  //     //   router.push('/phrases');
  //     } catch (err: any) {
  //       setError(err.message || 'Something went wrong');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <div className="w-full max-w-md mx-auto py-6 lg:py-12">
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
              initialCountryCode="NG"
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

      {!isLogin && (
        <div className="my-4 flex flex-col gap-4 justify-center items-center">
          <div className="text-sm leading-[145%] font-[400] text-[#645D5D]">
            Forgot Password?{" "}
            <Link
              href="/login"
              style={{
                textDecoration: "none",
                color: "#eb512f",
                fontWeight: "400",
              }}
            >
              Recover
            </Link>
          </div>
          <div className="w-full flex flex-col gap-6">
            <div className="text-sm leading-[24px] flex justify-center items-center font-[500] text-[#60646C]">
              Or Register with
            </div>
          </div>
        </div>
      )}
    </form>
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
      <Button borderRadius="32px" backgroundColor="#E8E8EC">
        <div className="flex gap-[8px] items-center justify-center">
          <div>
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6233 6.82353C15.2906 7.64706 14.4675 9.05882 14.4675 10.6275C14.4675 12.3922 15.5258 14 17.1329 14.6667C16.8193 15.6863 16.3489 16.6275 15.761 17.4902C14.8987 18.7059 13.9971 19.9608 12.6644 19.9608C11.3318 19.9608 10.9398 19.1765 9.37191 19.1765C7.84324 19.1765 7.29448 20 6.04019 20C4.78589 20 3.92356 18.8627 2.94364 17.451C1.65015 15.4902 0.905408 13.2157 0.866211 10.8235C0.866211 6.94118 3.37481 4.86274 5.8834 4.86274C7.21609 4.86274 8.3136 5.72549 9.13673 5.72549C9.92067 5.72549 11.175 4.82353 12.6644 4.82353C14.2323 4.78431 15.7218 5.52941 16.6233 6.82353ZM11.9589 3.17647C12.6252 2.39216 12.978 1.41176 13.0172 0.392157C13.0172 0.27451 13.0172 0.117647 12.978 0C11.8413 0.117647 10.783 0.666667 10.0383 1.52941C9.37191 2.27451 8.97995 3.21569 8.94075 4.23529C8.94075 4.35294 8.94075 4.47059 8.97995 4.58824C9.05834 4.58824 9.17593 4.62745 9.25432 4.62745C10.3126 4.54902 11.2926 4 11.9589 3.17647Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="text-[#1C2024]">Apple</div>
        </div>
      </Button>
      <Button borderRadius="32px" backgroundColor="#E8E8EC">
        <div className="flex gap-[8px] items-center justify-center">
          <div>
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.3 10.2083C19.3 9.55825 19.2417 8.93325 19.1333 8.33325H10.5V11.8791H15.4333C15.2208 13.0249 14.575 13.9958 13.6042 14.6458V16.9458H16.5667C18.3 15.3499 19.3 12.9999 19.3 10.2083Z"
                fill="#4285F4"
              />
              <path
                d="M10.5003 19.1667C12.9753 19.1667 15.0503 18.3459 16.5669 16.9459L13.6044 14.6459C12.7836 15.1959 11.7336 15.5209 10.5003 15.5209C8.11276 15.5209 6.09193 13.9084 5.37109 11.7417H2.30859V14.1167C3.81693 17.1125 6.91693 19.1667 10.5003 19.1667Z"
                fill="#34A853"
              />
              <path
                d="M5.37051 11.7416C5.18717 11.1916 5.08301 10.6041 5.08301 9.99997C5.08301 9.3958 5.18717 8.8083 5.37051 8.2583V5.8833H2.30801C1.66634 7.16068 1.33244 8.57048 1.33301 9.99997C1.33301 11.4791 1.68718 12.8791 2.30801 14.1166L5.37051 11.7416Z"
                fill="#FBBC05"
              />
              <path
                d="M10.5003 4.47908C11.8461 4.47908 13.0544 4.94159 14.0044 5.84992L16.6336 3.22075C15.0461 1.74159 12.9711 0.833252 10.5003 0.833252C6.91693 0.833252 3.81693 2.88742 2.30859 5.88325L5.37109 8.25825C6.09193 6.09158 8.11276 4.47908 10.5003 4.47908Z"
                fill="#EA4335"
              />
            </svg>
          </div>
          <div className="text-[#1C2024]">Google</div>
        </div>
      </Button>
    </div>
    </div>
  );
};

export default AuthForm;
