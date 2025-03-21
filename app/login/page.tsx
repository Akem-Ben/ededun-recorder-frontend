/* eslint-disable @next/next/no-img-element */
"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect } from "react";
// import { useRouter } from 'next/navigation';
import Head from "next/head";
// import AuthForm from "../../components/AuthForm";
import AuthLeftPage from "../../components/AuthLeftPage";
import Link from "next/link";
import { Alerts } from "next-alert";
import LoginAuth from "@/components/LoginAuth";

const Login: NextPage = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     router.push('/phrases');
  //   }
  // }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Login | Èdèdún APYP</title>
        <meta
          name="description"
          content="Create an account for the voice recording application"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col md:flex-row min-h-screen relative">
        {/* Left section - hidden on small screens */}
        <div className="hidden md:block md:w-1/2 lg:w-1/2 pt-20 min-h-screen bg-[#001633]">
          <AuthLeftPage isLogin={true} />
        </div>

        {/* Right section - full width on small screens */}
        <section className="w-full md:w-1/2 lg:w-1/2 flex justify-center items-center px-4 sm:px-6 md:px-8 py-20 min-h-screen">
          <div className="flex flex-col justify-center w-full max-w-md my-auto">
            {/* Logo for mobile only */}
            <div className="md:hidden flex flex-col justify-center mb-8">
              <Link href="/">
                <div className="relative h-12 w-36">
                  <img
                    src="/general/logo-black.png"
                    alt="Èdèdún Logo"
                    className="object-contain w-full h-full"
                  />
                </div>
              </Link>
              <div className="mt-6">
                <h1 className="text-3xl lg:text-[50px] font-semibold text-[#001C4C] mb-4 lg:mb-[50px] animate__animated animate__fadeInUp">
                  <span className="block">Èdèdún AI Powered</span>
                  <span className="block mb-4 lg:mb-[24px]">
                  Yorùbá Platform
                  </span>
                </h1>
                <p className="text-base lg:text-lg text-[#012657] animate__animated animate__fadeInUp animate__delay-1s">
                  Login to contribute to the Èdèdún AI Powered
                  <br />
                  Yorùbá Platform (APYP)
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <h1 className="text-2xl font-bold">Login to your account</h1>
              <div>
                <p className="text-sm text-[#645D5D]">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    style={{ textDecoration: "none", color: "#eb512f" }}
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>

            <div className="w-full">
              <LoginAuth />
            </div>
          </div>
        </section>
      </div>
      <Alerts
        position="bottom-right"
        direction="right"
        timer={3000}
        className="rounded-md relative z-50 !w-80"
      />
    </div>
  );
};

export default Login;
