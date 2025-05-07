'use client'
import { useState,useEffect,useRef } from "react";
import { motion } from "motion/react"


export default function Regress(){
    const[column,setColumn] = useState(null)
    const[digit,setDigit] = useState(0)

    const getData = async () => {

    try {
        const res = await fetch('http://localhost:8000/data', { 
            method: 'POST',
            credentials: 'include',
        
          
          
        });
        const data = await res.json()
        if (!res.ok) {

            throw new Error(data.error || "File upload failed");
        }

        setOutput(data)
       
        
       setColumn(data.columns);
        setRow(data.shape[0]);
        setnumCol(data.shape[1]);
        setDigit(data.numerical);
       
       
        
    }catch(error){
        setMessage("ERROR");
        setError(true);
       
        





    };
    useEffect(() => {
        getData();
       
    
      
    }, []);
    }
    console.log(digit)



    return(
       <div className=" text-white bg-slate-800">

<div className="container flex flex-col items-center mt-10">

    <h1>Select two variables to run a regression on.</h1>
    <motion.select
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true, amount: 1 }}
    className="mb-4 px-4 py-2 border rounded-lg bg-gray-500 shadow-md focus:outline-none"
    
    
  >


  
    {/* {digit.map((col) => (
      <option key={col} value={col}>
        {col}
      </option>
    ))} */}
  </motion.select>

</div>




    </div>
    )
    
    }