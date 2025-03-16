"use client"
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const Home: NextPage = () => {
  const router = useRouter();
  
  useEffect(() => {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     router.push('/phrases');
    //   } else {
        // router.push('/login');
    //   }
    }, [router]);
  
  return (
    <div className="bg-[#001633] min-h-screen">
      <Head>
        <title>Èdèdún - AI Powered Yoruba Platform</title>
        <meta name="description" content="Contribute to the Èdèdún AI Powered Yorùbá Platform by recording Yoruba phrases" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header with logo */}
        <div className="mb-8 animate__animated animate__fadeIn animate__delay-1s">
          <div className="flex items-center">
            <div className="relative h-[71.51px] w-[150px]">
              <Image
                src="/landingPage/logo.png"
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
            <span className="block">Yoruba Platform</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 animate__animated animate__fadeInUp animate__delay-1s">
            Help build the future of Yoruba language technology by contributing your voice.
            Record Yoruba phrases to train our AI systems.
          </p>
          
          <div className="bg-blue-900/30 p-6 rounded-lg mb-8 animate__animated animate__fadeInUp animate__delay-2s">
            <h2 className="text-xl font-semibold mb-3">Why Contribute?</h2>
            <ul className="space-y-2">
              <li className="flex items-start animate__animated animate__fadeInRight animate__delay-2s">
                <span className="text-blue-400 mr-2">•</span>
                <span>Preserve and promote the Yoruba language</span>
              </li>
              <li className="flex items-start animate__animated animate__fadeInRight animate__delay-3s">
                <span className="text-blue-400 mr-2">•</span>
                <span>Help create accessible AI technologies in Yoruba</span>
              </li>
              <li className="flex items-start animate__animated animate__fadeInRight animate__delay-4s">
                <span className="text-blue-400 mr-2">•</span>
                <span>Contribute to indigenous language AI development</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4 mb-8 animate__animated animate__fadeInUp animate__delay-4s">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login" className="bg-[#3277AC] hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium text-center flex-1 transition duration-200 animate__animated animate__pulse animate__infinite animate__slower">
                Login to Contribute
              </Link>
              <Link href="/signup" className="bg-transparent border border-blue-400 hover:bg-blue-900/30 text-white py-3 px-6 rounded-lg font-medium text-center flex-1 transition duration-200">
                Create Account
              </Link>
            </div>
            <Link href="/#" className="text-blue-400 hover:text-blue-300 text-sm inline-block transition duration-200">
              Learn more about the Èdèdún AI Powered Yorùbá Platform (APYP) →
            </Link>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="text-gray-400 text-sm animate__animated animate__fadeIn animate__delay-5s">
          <div className="border-t border-gray-700 pt-4 flex flex-col sm:flex-row justify-between items-center">
            <p>© 2025 Èdèdún AI Project</p>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <Link href="/#" className="hover:text-white transition duration-200">Privacy</Link>
              <Link href="/#" className="hover:text-white transition duration-200">Terms</Link>
              <Link href="/#" className="hover:text-white transition duration-200">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;