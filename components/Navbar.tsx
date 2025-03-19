import React from 'react';
import Image from "next/image";

const Navbar = () => {
  return (
    <div className='h-[94px] bg-[#FFFFFF] flex justify-center items-center w-full'>
        <div className="relative h-12 w-32 lg:h-[71.51px] lg:w-[150px]">
              <Image
                src={"/general/logo-black.png"}
                alt="Èdèdún Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
    </div>
  )
}

export default Navbar;