"use client"
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

const Home: NextPage = () => {
  const router = useRouter();
  
  useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     router.push('/phrases');
  //   } else {
      router.push('/login');
  //   }
  }, [router]);
  
  return (
    <div>
      <Head>
        <title>Voice Recording App</title>
        <meta name="description" content="Record voice phrases for speech data collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 text-indigo-600"></div>
      </div>
    </div>
  );
};

export default Home;

// export default Phrases;

// pages/_app.tsx
// import '../styles/globals.css';
// import type { AppProps } from 'next/app';
// import Head from 'next/head';

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <>
//       <Head>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       </Head>
//       <Component {...pageProps} />
//     </>
//   );
// }

// export default MyApp;

// styles/globals.css
// @tailwind base;
// @tailwind components;
// @tailwind utilities;

/* Additional custom styles */
// body {
//   @apply bg-gray-50 text-gray-900 antialiased;
// }

// /* For WebKit browsers */
// ::-webkit-scrollbar {
//   width: 8px;
// }

// ::-webkit-scrollbar-track {
//   @apply bg-gray-100 rounded-full;
// }

// ::-webkit-scrollbar-thumb {
//   @apply bg-indigo-300 rounded-full;
// }

// ::-webkit-scrollbar-thumb:hover {
//   @apply bg-indigo-400;
// }