"use client"
import type { NextPage } from 'next';
import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import Head from 'next/head';
import PhrasesSection from '../../components/PhrasesSection';
import Recordings from '@/components/RecordingsSection';
import Navbar from '@/components/Navbar';

const Phrases: NextPage = () => {
  const [activeView, setActiveView] = useState("Phrases");
  
  return (
    <div>
      <Head>
        <title>Record Phrases | Èdèdún APYP</title>
        <meta name="description" content="Record voice phrases for speech data collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {activeView === "Phrases" &&  <PhrasesSection setActiveView={setActiveView} activeView={activeView}/>}
      {activeView === "Recordings" &&  <Recordings setActiveView={setActiveView} activeView={activeView} />}
    </div>
  );
};


export default Phrases;