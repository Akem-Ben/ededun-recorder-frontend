import React, { useState } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

type AuthFormProps = {
  isLogin?: boolean;
};

const AuthLeftPage: React.FC<AuthFormProps> = ({ isLogin }) => {
  return (
    <div className="mx-auto px-16 max-w-full h-full flex flex-col">
      <div className="mb-6 animate__animated animate__fadeIn animate__delay-1s">
        <Link href="/">
          <div className="flex items-center">
            <div className="relative h-12 w-32 lg:h-[71.51px] lg:w-[150px]">
              <Image
                src={isLogin ? "/general/logo-white.png" : "/general/logo-black.png"}
                alt="Èdèdún Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </Link>
      </div>

      <div className="w-full">
        <h1 className={"text-3xl lg:text-[50px] font-semibold mb-4 lg:mb-[50px] animate__animated animate__fadeInUp"}
        style={{color: isLogin ? "#fff" : "#001C4C"}}
        >
          <span className="block">Èdèdún AI Powered</span>
          <span className="block mb-4 lg:mb-[24px]">Yoruba Platform</span>
        </h1>
        <p className="text-base lg:text-lg animate__animated animate__fadeInUp animate__delay-1s"
        style={{color: isLogin ? "#fff" : "#012657"}}
        >
          {!isLogin ? "Sign up to contribute to the Èdèdún AI Powered" : "Login to contribute to the Èdèdún AI Powered"}
          <br />
          Yorùbá Platform (APYP)
        </p>
      </div>

      <div className="relative flex">
        <div className="relative lg:h-[548px] w-[800px] max-w-[800px] lg:max-w-[800px]">
          <Image
            src="/general/auth-image-placeholder.png"
            alt="Authentication Page Image"
            // fill
            width={659}
            height={548}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLeftPage;
