import React from 'react';
import Image from "next/image";
import Button from './Button';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <div className='h-[94px] px-10 bg-[#FFFFFF] flex justify-between items-center w-full'>
      <div className="relative h-12 w-32 lg:h-[71.51px] lg:w-[150px]">
        <Image
          src={"/general/logo-black.png"}
          alt="Èdèdún Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='bg-[#1671D9] px-6 py-3 rounded-lg'
        style={{borderRadius: '10px'}}
      >
          <div className='flex text-white items-center gap-[10px]'>
            <div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00195 7C8.01406 4.82497 8.11051 3.64706 8.87889 2.87868C9.75757 2 11.1718 2 14.0002 2H15.0002C17.8286 2 19.2429 2 20.1215 2.87868C21.0002 3.75736 21.0002 5.17157 21.0002 8V16C21.0002 18.8284 21.0002 20.2426 20.1215 21.1213C19.2429 22 17.8286 22 15.0002 22H14.0002C11.1718 22 9.75757 22 8.87889 21.1213C8.11051 20.3529 8.01406 19.175 8.00195 17" stroke="#FFF" stroke-width="2.0" stroke-linecap="round" />
                <path d="M8 19.5C5.64298 19.5 4.46447 19.5 3.73223 18.7678C3 18.0355 3 16.857 3 14.5V9.5C3 7.14298 3 5.96447 3.73223 5.23223C4.46447 4.5 5.64298 4.5 8 4.5" stroke="#FFF" stroke-width="2.0" />
                <path d="M15 12L6 12M6 12L8 14M6 12L8 10" stroke="#FFF" stroke-width="2.0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              Logout
            </div>
          </div>
      </motion.button>
    </div>
  )
}

export default Navbar;