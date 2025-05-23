'use client'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";  // changed to framer-motion since "motion/react" isn't standard
import { useRouter } from 'next/navigation'
import { PacmanLoader } from "react-spinners";
import { ScatterChart } from "recharts";
import ScatterPlot from "./graph";
import Example from "../modal";



export default function Regress() {
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
      const[outlier,setOutlier] = useState(false);
      

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
 
  }
  useEffect(() => {

    getData();
   

  
}, []);



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


const home = () =>{

router.push('/')

}
const mod = ()=>{

router.push('/regression');

}

  const splitModel = () =>{

setSelect(true);


  }

  const initialize =  async() =>
  {

 
  
    console.log("Sending to backend:", { var1, split,remove ,model});



     setLoading(true);
await getModel();

//router.push('/eval');

  }
  const handleClick = () =>{


  //  setRemove(prev => !prev)
  }

 
const handleChange = ()=>{




}

  return (
    
<div className="min-h-screen bg-slate-800 text-white">
<div className="container mx-auto flex flex-col items-center px-4 py-12 space-y-10">

<div className="container flex flex-col items-center mt-10">
  <div className="container flex flex-col items-center mb-10">
        <h1 className="text-center"> Please select a  variable for Decision Tree Regression</h1>
        
        
        

        </div>

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
        {var1 == var2 &&
        <div className="container flex flex-col items-center mt-10 ">
            <p>Please select a  variable for</p><a href = {modal} className="font-bold text-underline"> Decision Tree Regression</a>
            <button  className= "focus:outline-none text-black bg-white-700 hover:bg-gray-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-gray-600 dark:hover:bg-gray -700 dark:focus:ring-gray-900">
            Confirm
    </button>
    </div>

        }
   {var1 != var2 &&
        <div className="container flex flex-col items-center mt-10 ">
          
            <button onClick = {splitModel}  className= "focus:outline-none text-black bg-white-700 hover:bg-blue-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-blue-600 dark:hover:bg-blue -700 dark:focus:ring-blue-900">
            Confirm
    </button>
    </div>

        }
</div>

<div>

{select && 
<div>
<motion.p
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
viewport={{ once: true, amount: 1 }}
className="container flex flex-col items-center mt-10">
    
    
    Train Test Split?
    </motion.p>    


    <div className="container flex flex-col items-center mt-10">
    <button onClick={() => setSplit("80-20")}  className= "focus:outline-none text-black bg-white-700 hover:bg-blue-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-2.5 mb-4 dark:bg-blue-600 dark:hover:bg-blue -700 dark:focus:ring-blue-900">
           80-20
    </button>
    <button onClick={() => setSplit("70-30")}  className= "focus:outline-none text-black bg-white-700 hover:bg-blue-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-2.5 mb-4 dark:bg-blue-600 dark:hover:bg-blue -700 dark:focus:ring-blue-900">
          70-30
    </button>
    <button  onClick={() => setSplit("90-10")} className= "focus:outline-none text-black bg-white-700 hover:bg-green-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-2.5 mb-4 dark:bg-blue-600 dark:hover:bg-blue -700 dark:focus:ring-blue-900">
          90-10
    </button>
   
    {split == null  &&
    


<div>








<p>Please select an testing margin</p>
<button onClick  = {() => {
    setPopup(true);  
    setState(2);   }


        }className="text-sm underline text-blue-300">
          (What does this mean?)
        </button>

</div>


    }

 { model == 'Decision Tree Regression'  && 
<div>
{split != null && 
    <div className="container flex flex-col items-center mt-10">

        {split} % selected.



        <p>Select Hyperparameters</p>


     <p>Max Depth</p>
        <motion.select
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 1 }}
          onChange = {(e) => setDepth(e.target.value)}
          className="mb-4 ml px-4 py-2 border rounded-lg bg-gray-500 shadow-md focus:outline-none"

        >
<option>None</option>
<option>5</option>
<option>10</option>
<option>15</option>


          </motion.select>
      <p>   Min Sample Split</p> 
      <motion.select
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 1 }}
          onChange = {(e) => setSample(e.target.value)}
          className="mb-4 ml px-4 py-2 border rounded-lg bg-gray-500 shadow-md focus:outline-none"

        >
<option>2</option>
<option>0.01</option>
<option>0.05</option>
<option>0.1</option>
<option>10</option>



          </motion.select>
















          <div>
          {/*here*/}
          <div className = ' mb-10 container flex flex-row items-center mt-10'>
          <input checked = {remove} onChange = {handleClick} id = 'remove' type = 'checkbox'/> 
         <label htmlFor="remove" > Remove non-correlated columns from training?</label>

</div>
</div>

{/* <a>Why?</a> */}




        </div>
}
</div>
}


Click below to begin the multi-variable regression: 
        <button onClick = {initialize}  className=  " mt-10 focus:outline-none text-black bg-white-700 hover:bg-blue-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-blue-600 dark:hover:bg-blue -700 dark:focus:ring-blue-900">

    Begin
</button>

  </div>

  {loading &&
  <div>

Please wait as the model loads...

</div>

  }

    </div>
    
  
    
    }


</div>

        </div>
       
        {error && <p className="text-red-500 mt-4">{message}</p>}
      </div>
   

<div className="container flex flex-col items-center mt-10">

<p className="font-bold "> Average Cross Validation Score of the model: {meanScore}</p>


<ScatterPlot data={pred} lineData  = {lin} title="Yo" />

</div>



</div>

<div>


{meanScore > 0.75 && meanScore != null &&



<p className="container flex flex-col items-center mt-10 font-bold">
  
  Your data resulted in a mean CV score above 0.75, which means it fared well during the testing portion of model training!
  
  </p>}
  { 0.5 < meanScore && meanScore < 0.75 &&  meanScore != null && <p className="container flex flex-col items-center mt-10 font-bold">
  
  Your data resulted in a mean CV score between 0.5 and 0.75, which means it fared average during the testing portion of model training!
  
  </p>}
  {meanScore < 0.5 && meanScore != null && (
  <div className="container flex flex-col items-center mt-10 font-bold">
    <p>
      Your data resulted in a mean CV score below 0.5, which means it fared poorly during the testing portion of model training.
      Here are some common issues and possible reasons for the poor performance with your requested column:
    </p>
    <ul>
      <li><strong>Data Imbalance:</strong> If the dataset is heavily imbalanced, the model may struggle to generalize to the minority class.</li>
      <li><strong>Feature Quality:</strong> Ensure the features you're using are relevant and not noisy. Irrelevant or poorly chosen features can hurt model performance.</li>
      <li><strong>Model Overfitting:</strong> Overfitting may occur if your model is too complex for the amount of data you have. Try increasing the data size.</li>
      <li><strong>Hyperparameter Tuning:</strong> The model might not be optimized. Tuning hyperparameters like learning rate, regularization, etc., might help improve performance.</li>
    </ul>
    <p>
      Try addressing these issues and rerun your model training to improve the results.
    </p>
  
  
  
  
  
  
  </div>

)}

  
<div className="container flex flex-col items-center">
<button onClick = {home}  className= "focus:outline-none text-black bg-white-700 hover:bg-blue-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-blue-600 dark:hover:bg-blue -700 dark:focus:ring-blue-900">

Go Home?
</button>
<button onClick = {mod}  className= "focus:outline-none text-black bg-white-700 hover:bg-blue-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-blue-600 dark:hover:bg-blue -700 dark:focus:ring-blue-900">

Try another feature
</button>



</div>
</div>

     
    </div>
  
  );
}
