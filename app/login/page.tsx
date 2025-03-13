"use client"
import type { NextPage } from 'next';
import { useEffect } from 'react';
// import { useRouter } from 'next/compat/router';
import Head from 'next/head';
import AuthForm from '../components/AuthForm';

const Login: NextPage = () => {
  // const router = useRouter();
  
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     router('/phrases');
  //   }
  // }, [router]);
  
  return (
    <div>
      <Head>
        <title>Login | Èdèdún APYP</title>
        <meta name="description" content="Login to the voice recording application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-indigo-800 mb-2">Èdèdún AI Powered Yorùbá Platform</h1>
            <p className="text-gray-600">Login to access your recording dashboard</p>
          </div>
          
          <AuthForm isLogin={true} />
        </div>
      </div>
    </div>
  );
};

export default Login;