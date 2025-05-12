'use client'
import Image from "next/image";
import FileUpload from "./fileUpload";

import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "motion/react";
import { useState,useEffect } from "react";
import { TypeAnimation } from "react-type-animation";









export default function Home() {







  

  return (
    
    
    <div className= "  bg-slate-800 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]    ">

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"></link>      
    <div className = "topnav text-lg  ">

<div className=" min-h-screen  font-inter text-xl font-bold">
    <TypeAnimation
      sequence={["Automate EDA", 2000, "Enter a CSV dataset!", 2000]}
      speed={50}
      repeat={Infinity}
    />
    </div>

<p className="font-inter text-l mt-10  ">  </p>






</div>



    <FileUpload/>
    </div>
  );
}
