'use client'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";  // changed to framer-motion since "motion/react" isn't standard
import { useRouter } from 'next/navigation'
import { PacmanLoader } from "react-spinners";
import { ScatterChart } from "recharts";
import Example from "../modal";





export default function Classify(){



    const [column, setColumn] = useState(null);
    const [digit, setDigit] = useState([]);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const[var1,setVar1] = useState("y");
    const[var2,setVar2] = useState("");
    const[select,setSelect] = useState(false);
    const[split,setSplit] = useState("80-20");
    const[cross_val,setCross_val] = useState(null);
    const[meanScore,setMeanScore] = useState(null);
    const[loading,setLoading] = useState(false);
    const[pred,setPred] = useState(null);
    const[lin,setLin] = useState(null);
     const [popup,setPopup] = useState(false);
        const [state,setState ] = useState(0)
        const [depth,setDepth ] = useState(null);
        const[sample,setSample] = useState(2);
        const[variance,setVariance] = useState(null);
        const[remove,setRemove] = useState(false);
        const[model,setModel] = useState('Decision Tree Regression');
        const[outlier,setOutlier] = useState(true);
      


const router = useRouter();
const getData = async () => {

  try {
      const res = await fetch('http://localhost:8000/data', { 
          method: 'POST',
          credentials: 'include',
      
        
        
      });
      const data = await res.json()
      console.log(data);
      if (!res.ok) {

          throw new Error(data.error || "File upload failed");
      }


     
     setColumn(data.columns);
   
      setDigit(data.numerical);
     
     
      
  }catch(error){
      setMessage("ERROR");
      setError(true);
     
      





  };  

  const getModel = async () => {
    
    try {
      const res = await fetch('http://localhost:8000/columns', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ var1, split,depth,sample,variance,remove,model,outlier }),
      });

       
      const data = await res.json();
      
    setLoading(false);
      console.log(data)
      console.log(data.cross_val_scores);
      console.log(data.mean_score);
     setCross_val(data.cross_val_scores);
     setMeanScore(data.mean_score);
     setPred(data.prediction);
     setVariance(data.variance);
     console.log("Variance: " + data.variance);
     const lineData = Array.from({ length: 100 }, (_, i) => ({
      x: i,
      y: i,
    }));
    setLin(lineData);
    
    
    
      
      if (!res.ok) {
        throw new Error(data.error || "File upload failed");
      }

      setColumn(data.columns);
      setDigit(data.numerical);  
    } catch (error) {
      setMessage("ERROR");
      setError(true);
      console.log(error);
    }
  };

};
useEffect(() => {

    getData();
   

  
}, []);
const splitModel = () =>{

    setSelect(true);
    
    
      }

      const initialize =  async() =>
        {
      
       
        
          console.log("Sending to backend:", { var1, split,remove ,model});
      
      
      
           setLoading(true);
           await getModel();
        }



    
return(

 
<div className="min-h-screen bg-slate-800 text-white">
<div className="container mx-auto flex flex-col items-center px-4 py-12 space-y-10">

<div className="container flex flex-col items-center mt-10">
  <div className="container flex flex-col items-center mb-10">
        <h1 className="text-center"> Please select a  variable for Logistic Regression</h1>

        

        <div>

{!select &&
<div>
    <motion.select
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 1 }}
      onChange = {(e) => setVar1(e.target.value)}
      className="mb-4 ml px-4 py-2 border rounded-lg bg-gray-500 shadow-md focus:outline-none"

    >

      {digit.length > 0 &&
        digit.map((col) => (
          <option key={col} value={col}>
            {col}
          </option>
        ))}

    </motion.select>

    
</div>
    }



<div className="container flex flex-col items-center mt-10 ">
          
          <button onClick = {splitModel}  className= "focus:outline-none text-black bg-white-700 hover:bg-blue-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-blue-600 dark:hover:bg-blue -700 dark:focus:ring-blue-900">
          Confirm
  </button>
  </div>







  Click below to begin the multi-variable regression: 
        <button onClick = {initialize}  className=  " mt-10 focus:outline-none text-black bg-white-700 hover:bg-blue-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-blue-600 dark:hover:bg-blue -700 dark:focus:ring-blue-900">

    Begin
</button>
{loading &&
  <div>

Please wait as the model loads...

</div>

  }


 </div>
 </div>
 </div>
 </div>
 </div>
);
};