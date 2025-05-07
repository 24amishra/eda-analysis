
'use client'
import React from "react"
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
import HistogramChart from './graph.js';

const rock_salt = Rock_Salt({
    subsets :['latin'],
    weight:'400'


})
const inter = Inter({
    subsets :['latin'],
    weight:'400'


})

export default  function Loading(){
      const router = useRouter();
  
    const [output,setOutput] = useState(null);
    const[loading,setLoading]= useState(true);
    const[column,setColumn] = useState(null);
    const[row,setRow] = useState(null);
    const[numCol,setnumCol] = useState(null);
    const[message,setMessage] = useState("Success!");
    const[keys,setKeys] = useState(null);
    const[values,setValues] = useState(null);
    const[head,setHead] = useState("");
    const [desc,setDesc] = useState(null);
    const [visible,setVisible] = useState("");
    const[size,setSize] = useState(0);
    const[digit,setDigit] = useState(0);
    const[img,setImg] = useState("");
    const[color,setColor] = useState("bg-gray");
    const[error,setError] = useState(false);
    const [view, setView] = useState(false);
    const textRef = useRef(null);
    const[corr,setCorr] = useState("Top Correlated Columns");
    const[pair,setPair] = useState(null);
    const[holes,setHoles] = useState(null);
    const[length,setLength ] = useState(null);
    const[clean,setClean] = useState(true);
    const [histograms, setHistograms] = useState({});

    



    let empty = '';
    
   let colarray = [];
    const getData = async () => {
    try{
        fetch('http://localhost:8000/chart') // adjust to your Flask endpoint
          .then((response) => response.json())
          .then((data) => setHistograms(data))
          .catch((error) => console.error('Error loading data:', error));
      }
      
      catch(error){
        setMessage("ERROR");
        setError(true);

      };
   
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
             //setPair(data.pairs)

          // setCorr(data.topCor);
           
            setHead(data.overview);
            setDesc(data.describe);
            setColor("");
            empty = data.missing;
            empty = JSON.parse(empty);
            
           
             let scrapeKey = Object.keys(empty);
              let scrapeValue = Object.values(empty);
             scrapeValue = JSON.stringify(scrapeValue);
             setValues(scrapeValue);
             setKeys(scrapeKey);
             setDigit(data.numerical);
             setPair(data.pairs)
             
             console.log(data.pairs)
             
             console.log(data.numerical)
             

            
             
            
            setLoading(false);
            
        }catch(error){
            setMessage("ERROR");
            setError(true);
           
            





        };


        try{
const res = await fetch ("http://localhost:8000/clean")
const data = await res.json();
setHoles(data.missing)
if (data.missing.length > 0 ){

setClean(false);

}
setLength(data.missing.length)
        }
catch(err){
  setMessage("ERROR")
  console.error('Error during file upload:', err);



}


        
        try{
            const response = await fetch("http://localhost:8000/image"); 
            const blob = await response.blob(); //Blob: Large Binary Object:: Need to convert image to BLOB for Processing
            const imageUrl = URL.createObjectURL(blob);
            setImg(imageUrl);

           
           
   

            
         
        
           

            
    
;            
                   
    }
    catch(err){
        

setMessage("ERROR")
        console.error('Error during file upload:', err);

    }
}


useEffect(() => {
    getData();
   

  
}, []);
useEffect(() => {
  if (digit && digit.length > 0 && !visible) {
    setVisible(digit[0]);
  }
}, [digit]);


useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setView(true);
          observer.unobserve(entry.target); 
        }
      },
      { threshold: 0.2 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, []);




if (head != ''){
    var headArr = JSON.parse(head);

}
    let missing = []

    
    let datDescribe = JSON.parse(desc);    
if(values != null){
    let arr = JSON.parse(values) 
        for ( let x = 0; x < arr.length ; x++){
            if (Number.isInteger(parseInt(arr[x])) == true){
                
                missing.push(arr[x]);
    
            }
        }            
}
     for(let x = 0; x < colarray.length; x++){
        let obj = {};
        obj[colarray[x]] = missing[x]; 
        datDescribe.push(obj);
     }
if (error){


    return( 
    
    <div>
    <p className="text-black size-lg">Something went wrong {error}
    <a href = '/' >Go back home here</a>


    </p>
     <a>

      Go back?
     </a>
     </div>
    
    
    )
   
}

    if (loading){

        //Replace with loading animation. 
       //<Spinner/>
       return(
        
        <div className=" container flex justify-center items-center h-screen">
            <div className="h-20"/>
        <ClipLoader color="#36d7b7" size={100} />
        
        </div>
        )
     




    }
    let numHoles = {}
    for (let x = 0; x < numCol; x++){
        colarray.push(column[x]);

    //    }
    //    for (let x = 0; x < numCol; x++){
        
    //    numHoles.push(data.);
    //    numHoles.push(',');
       
    //    }
   
    
  
 
    }
    const advance = () => {
      
          
          
      router.push('/advance');

      
      
}

    return( 
       

        <div className=" justify-center mb-100
         text-white bg-slate-800">
           <main className={inter.className}>

           <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className=" container flex justify-center text-xl font-bold"
      >
           Your Dataset in Review
      </motion.header>
            </main>
    <main className= {inter.className}>

<div className="container flex justify-center outline-black mt-10" >




     <p className="text-white text-lg"> {row} Rows</p>
    

  

    <p className="text-white  text-lg mr-10 ml-10"> {numCol} Columns</p>
   
   
    </div>
    </main>
     

 <div className="container flex justify-center outline-black mt-10">



  <motion.h1
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="text-lg"
  
  >


 
    Distribution Details: Numerical Columns
    </motion.h1>
    </div>
    
    <div className="container flex flex-col items-center mt-10">
  <motion.select
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true, amount: 1 }}
    className="mb-4 px-4 py-2 border rounded-lg bg-gray-500 shadow-md focus:outline-none"
    
    onChange={(e) => setVisible(e.target.value)}
    value={visible}
  >


  
    {digit.map((col) => (
      <option key={col} value={col}>
        {col}
      </option>
    ))}
  </motion.select>

  
  <div style={{ padding: '16px' }}>
  {Object.entries(histograms).map(([col, data]) => (
    visible === col && (
      <HistogramChart key={col} title={col} data={data} />
    )
  ))}
</div>

  <motion.table
    className="border-collapse border border-gray-400"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true, amount: 1 }}
  >
    <thead>
      <tr>
        <th className="border border-gray-400 px-4 py-2">Metric</th>
        <th className="border border-gray-400 px-4 py-2">Value</th>
      </tr>
    </thead>
    <tbody>
      {['Count', 'Mean', 'Std', 'Min', '25%', '50%', '75%', 'Max', 'Missing Values'].map(
        (metric, index) => (
          <tr key={metric}>
            <td className="border border-gray-400 px-4 py-2">{metric}</td>
            <td className="border border-gray-400 px-4 py-2">{datDescribe[index][visible]}</td>
          </tr>
        )
      )}
    </tbody>
  </motion.table>
</div>


<div className="h-20"/>

<motion.div className="container flex justify-center"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
viewport={{ once: true ,amount:0.5}}


>



<div className="w-30"/>
<div className=" text-bold container flex justify-center">
<p className="mr-10 mt-10 text-xl font-bold">Correlation Analysis:</p>

<select className="text-black mt-10  w-64 h-8 truncate" onChange = {(e) => setCorr(e.target.value)}>

<option className="text-black" >Top Correlated Columns</option>
<option className="text-black">Correlation Heatmap</option>



</select>
</div>
<div className="container w-50 rounded-lg">


 
{corr == "Correlation Heatmap" && img && <img className="w-30 h-15" src={img} alt="Heatmap" />}
</div>
</motion.div>
<div className="h-20"/>

<div className="container w-1/2 mx-auto rounded-xl p-6 mb-10">

<script>This was all Chat GPT for designing this div</script>

{corr == "Top Correlated Columns" &&
    <ul className="">
  
  <motion.li
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true ,amount:0.1}}

  className="bg-gray-100 hover:bg-gray-200 transition rounded-md px-4 py-2 text-lg text-black flex justify-between mb-10 items-center"

  >
         
        
          {pair[0]}
       
      
        </motion.li>
        <motion.li
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true,amount:0.7 }}

  className="bg-white hover:bg-gray-200 transition rounded-md px-4 py-2 text-lg mb-10 text-black flex justify-between items-center"

  >
         {pair[1]}
     
       </motion.li>
       <motion.li
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true,amount:0.7 }}

  className="bg-gray-100 hover:bg-gray-200 transition rounded-md px-4 py-2 text-lg text-gray-700 flex justify-between items-center"

  >
         {pair[2]}
     
       </motion.li>
      
    </ul>
}
</div>






    <div className="container flex justify-center">
 
  
    <motion.h3 className="justify-center">Table Head</motion.h3>
   </div>
    <div className="container w-50 rounded-lg">



<Table responsive striped bordered hover size = 'sm' variant="white" className="text-black">
    <thead>
        <tr>

        {colarray.map((col) => <th key={col}>{col}</th>)}


        </tr>
 
    </thead>
    <tbody>

    {headArr.map((row, i) => (
      <tr key={i}>
        {colarray.map((col) => <td key={col}>{row[col]}</td>)}
      </tr>
    ))}
    </tbody>
    

</Table>
</div>


    <p
      ref={textRef}
      className={` text-black transition-all duration-700 ease-out transform ${
        view ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
   
    </p>
  



  
    <div className="h-20"/>


<div className="container flex flex-col items-center mt-10">
<h1>
Clean Dataset?

</h1>
{length == null && <p> Please wait for the missing value checks to finish</p>}
{length > 0  && <p> {length} Columns have over 40% of their data missing. Check the box below to create a clean, downloadable version of this file</p>
 }
 {length == 0 &&<p> No Columns have missing data!</p> }
 <div>
<button onClick = {advance} className= " focus:outline-none text-black bg-white-700 hover:bg-blue-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">
  <label>Continue to Advanced Analysis?</label> 
</button>
</div>
 </div>


      </div>
    );
    





}