"use client"
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import Head from 'next/head';
import PhrasesSection from '../../components/PhrasesSection';
import Navbar from '@/components/Navbar';

const Phrases: NextPage = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const router = useRouter();
  
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     router.push('/login');
  //   } else {
  //     setIsAuthenticated(true);
  //   }
  // }, [router]);
  
  // if (!isAuthenticated) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin h-10 w-10 text-indigo-600"></div>
  //     </div>
  //   );
  // }
  
  return (
    <div>
      <Head>
        <title>Record Phrases | Èdèdún APYP</title>
        <meta name="description" content="Record voice phrases for speech data collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <PhrasesSection />
    </div>
  );
};


export default Phrases;