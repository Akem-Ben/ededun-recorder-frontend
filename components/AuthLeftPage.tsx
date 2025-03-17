import React, { useState } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const AuthLeftPage = () => {
  return (
    <div className="container mx-auto px-4 py-6 lg:py-12 h-full flex flex-col">
      <div className="mb-6 animate__animated animate__fadeIn animate__delay-1s">
        <Link href="/">
          <div className="flex items-center">
            <div className="relative h-12 w-32 lg:h-[71.51px] lg:w-[150px]">
              <Image
                src="/general/logo-black.png"
                alt="Èdèdún Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl lg:text-[50px] font-semibold text-[#001C4C] mb-4 lg:mb-[50px] animate__animated animate__fadeInUp">
          <span className="block">Èdèdún AI Powered</span>
          <span className="block mb-4 lg:mb-[24px]">Yoruba Platform</span>
        </h1>
        <p className="text-base lg:text-lg text-[#012657] animate__animated animate__fadeInUp animate__delay-1s">
          Sign up to contribute to the Èdèdún AI Powered
          <br />
          Yorùbá Platform (APYP)
        </p>
      </div>

      <div className="relative flex justify-center">
        <div className="relative h-[300px] lg:h-[548px] w-full max-w-[450px] lg:max-w-[659px]">
          <Image
            src="/general/auth-image-placeholder.png"
            alt="Authentication Page Image"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLeftPage;
