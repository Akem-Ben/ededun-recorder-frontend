"use client";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Spinner from "react-bootstrap/Spinner";
import { Alerts } from "next-alert";

const Home: NextPage = () => {
  const router = useRouter();

  const [createAccountLoading, setCreateAccountLoading] = useState(false);
  const [loginAccountLoading, setLoginAccountLoading] = useState(false);

  useEffect(() => {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     router.push('/phrases');
    //   } else {
    // router.push('/login');
    //   }
  }, [router]);

  const handleCreateAccount = () => {
    setCreateAccountLoading(true);
    router.push("/signup");
    return setCreateAccountLoading(false);
  };

  const handleLoginAccount = () => {
    setLoginAccountLoading(true);
    router.push("/login");
    return setLoginAccountLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 min-h-screen">
      <Head>
        <title>Èdèdún - AI Powered Yorùbá Platform</title>
        <meta
          name="description"
          content="Contribute to the Èdèdún AI Powered Yorùbá Platform by recording Yorùbá phrases"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header with logo */}
        <div className="mb-8 animate__animated animate__fadeIn animate__delay-1s">
          <div className="flex items-center">
            <div className="relative h-[71.51px] w-[150px]">
              <Image
                src="/general/logo-white.png"
                alt="Èdèdún Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="text-white mb-12">
          <h1 className="text-4xl font-bold mb-4 animate__animated animate__fadeInUp">
            <span>Welcome To</span>
            <span className="block">Èdèdún AI Powered</span>
            <span className="block text-emerald-300">Yorùbá Platform</span>
          </h1>
          <p className="text-lg text-emerald-100 mb-8 animate__animated animate__fadeInUp animate__delay-1s">
            Help build the future of Yorùbá language technology by contributing
            your voice. Record Yorùbá phrases to train our AI systems.
          </p>

          <div className="bg-emerald-900/30 backdrop-blur-sm p-6 rounded-lg border border-emerald-700/30 shadow-lg mb-8 animate__animated animate__fadeInUp animate__delay-2s">
            <h2 className="text-xl font-semibold mb-3 text-emerald-200">
              Why Contribute?
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start animate__animated animate__fadeInRight animate__delay-2s">
                <span className="text-emerald-400 mr-2">•</span>
                <span>Preserve and promote the Yorùbá language</span>
              </li>
              <li className="flex items-start animate__animated animate__fadeInRight animate__delay-3s">
                <span className="text-emerald-400 mr-2">•</span>
                <span>Help create accessible AI technologies in Yorùbá</span>
              </li>
              <li className="flex items-start animate__animated animate__fadeInRight animate__delay-4s">
                <span className="text-emerald-400 mr-2">•</span>
                <span>Contribute to indigenous language AI development</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 mb-8 animate__animated animate__fadeInUp animate__delay-4s">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div
                className="bg-emerald-600 w-full hover:cursor-pointer hover:bg-emerald-500 text-white py-6 text-lg px-3 rounded-lg font-medium text-center transition duration-200 shadow-md animate__animated animate__pulse animate__infinite animate__slower"
                onClick={handleLoginAccount}
              >
                <button className="">
                  {loginAccountLoading ? (
                    <Spinner animation="border" variant="info" size="sm" />
                  ) : (
                    "Login to Contribute"
                  )}
                </button>
              </div>
              <div
                className="rounded-lg w-full border text-center justify-center items-center py-6 text-lg px-3 flex transition duration-200 border-emerald-500 hover:bg-emerald-900/40 hover:cursor-pointer shadow-md"
                onClick={handleCreateAccount}
              >
                <button className="text-lg text-white font-medium text-center">
                  {createAccountLoading ? (
                    <Spinner animation="border" variant="success" size="sm" />
                  ) : (
                    "Create an Account"
                  )}
                </button>
              </div>
            </div>
            <Link
              href="/#"
              className="text-emerald-300 hover:text-emerald-200 text-sm inline-block transition duration-200"
            >
              Learn more about the Èdèdún AI Powered Yorùbá Platform (APYP) →
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-emerald-200/70 text-sm animate__animated animate__fadeIn animate__delay-5s">
          <div className="border-t border-emerald-700/30 pt-4 flex flex-col sm:flex-row justify-between items-center">
            <p>© 2025 Èdèdún AI Project</p>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <Link
                href="/#"
                className="hover:text-white transition duration-200"
              >
                Privacy
              </Link>
              <Link
                href="/#"
                className="hover:text-white transition duration-200"
              >
                Terms
              </Link>
              <Link
                href="/#"
                className="hover:text-white transition duration-200"
              >
                Contact
              </Link>
            </div>
          </div>
        </footer>
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

export default Home;
