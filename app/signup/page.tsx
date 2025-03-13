"use client";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect } from "react";
// import { useRouter } from 'next/navigation';
import Head from "next/head";
import AuthForm from "../components/AuthForm";

const Signup: NextPage = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     router.push('/phrases');
  //   }
  // }, [router]);

  return (
    <div>
      <Head>
        <title>Signup | Èdèdún APYP</title>
        <meta
          name="description"
          content="Create an account for the voice recording application"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col md:flex-row relative bg-gradient-to-br from-indigo-100 to-purple-100">
        {/* Image section - Full height on desktop, background on mobile */}
        <div className="hidden md:block md:w-1/2 h-screen">
          <div className="relative w-full h-full">
            <Image
              src="/signup/yoru.jpg"
              alt="Èdèdún background"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority
            />
          </div>
        </div>

        {/* Background image for mobile only */}
        <div className="md:hidden absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/signup/yoru.jpg"
              alt="Èdèdún background"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority
            />
            <div className="absolute inset-0 bg-indigo-900/50"></div>
          </div>
        </div>

        {/* Form section - Overlays image on mobile, takes right half on desktop */}
        <div className="md:w-1/2 w-full flex items-center justify-center z-10 py-8 px-4 md:px-8">
          <div className="">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-800 mb-2">
                Èdèdún AI Powered Yorùbá Platform
              </h1>
              <p className="text-gray-600">
                Sign up to start recording phrases 😊
              </p>
            </div>
            <AuthForm isLogin={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
