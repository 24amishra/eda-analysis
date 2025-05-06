

'use client'
import React from "react"
import BarChart from './BarChart';
import { Chart } from "chart.js";
import Results from "../results/result"
import { useState,useEffect,useRef } from "react";
import { useRouter } from 'next/navigation'
import {Table} from 'react-bootstrap';
import Head from "next/head";
import { Rock_Salt } from "next/font/google";
import { Inter } from "next/font/google";
import { data } from "jquery";
import { motion } from "motion/react"
import Spinner from "../load";
import { ClipLoader } from "react-spinners";
import { Dropdown } from "bootstrap";

export default function(){
    const[loading,setLoading] = useState(false);
    const [csvString,setCsvString] = useState(null);
console.log("yo");


  



const getData = async () =>{
    console.log("yo")
    try {
        const res = await fetch('http://localhost:8000/file', { 
            method: 'GET',
            credentials: 'include',
      
        }
       
    );

    const blob = await res.blob();
    
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'cleaned_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
} 
        
        catch(err){


console.log("error")
        }
    }
    //Lets add a streamlit component to visualize all columns in dataset. and allow for outlier caluculations>

    return(      
        
        
        
        
        <div className=" justify-center text-white bg-slate-800">
{/* <BarChart/> */}

<div className="container flex flex-col items-center mt-10">


        <p className="font-bold text-xl">Click here to start download</p>

        <button onClick = {getData} className= " focus:outline-none text-black bg-white-700 hover:bg-blue-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">

        Download Cleaned File
</button>


</div>



        </div>
    )

}