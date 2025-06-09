

'use client'
import React from "react"
import BarChart from './BarChart';
import { Chart } from "chart.js";
import Results from "../results/result"
import { useState,useEffect,useRef } from "react";
import { useRouter } from 'next/navigation'
import {Modal, Table} from 'react-bootstrap';
import Head from "next/head";
import { Rock_Salt } from "next/font/google";
import { Inter } from "next/font/google";
import { data } from "jquery";
import { motion } from "motion/react"
import Spinner from "../load";
import { ClipLoader } from "react-spinners";
import { Dropdown } from "bootstrap";
import Example from "../modal";

export default function(){
    const[loading,setLoading] = useState(false);
    const [csvString,setCsvString] = useState(null);

    const [popup,setPopup] = useState(false);
    const [state,setState ] = useState(0)
          const router = useRouter();
    



  



    //Lets add a streamlit component to visualize all columns in dataset. and allow for outlier caluculations>


    const regress = () => {
      
          
          
        router.push('/regression');

  }


  const classify = () =>{

router.push('/classify')



  }
    return(      
        
        
        
        
<div className="min-h-screen bg-slate-800 text-white">
  <div className="container mx-auto flex flex-col items-center px-4 py-12 space-y-10">


    <hr className="w-full border-white" />

    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 px-4">
      <div>
        <h1 className="text-lg font-semibold">
          Run an exploratory model on your data in seconds.
        </h1>
        <button onClick  = {() => {
    setPopup(true);  
    setState(1);   }


        }className="text-sm underline text-blue-300">
          {/* (What does this mean?) */}
        </button>
        <Example isVisible={popup} onClose = {() => setPopup(false)} whichState = {state} />
      </div>
      <div className="flex gap-4">
        <button
          onClick={regress}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 transition duration-200"
        >
          Regression
        </button>
        
      </div>
    </div>

    <hr className="w-full border-white" />

    <div className="text-center space-y-2">
      <h4 className="text-md">Got another dataset?</h4>
      <a href="/" className="text-blue-400 underline">
        Go back home here
      </a>
    </div>
  </div>
</div>

    );
}