'use client'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";  // changed to framer-motion since "motion/react" isn't standard
import { useRouter } from 'next/navigation'
import { PacmanLoader } from "react-spinners";
import { ScatterChart } from "recharts";
import ScatterPlot from "./graph";
import Example from "../modal";
import { TypeAnimation } from "react-type-animation";




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
      const[listPar,setListPar] = useState([]);
      const [faded, setFaded] = useState({});
      const[param,setParam] = useState([]);
      const[ corr,setCorr] = useState();

      

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
      if (data.numerical.length > 0) {
        setVar1(data.numerical[0]);
      }     
     
      
  }catch(error){
      setMessage("ERROR");
      setError(true);
     
      





  };
 
  }
  useEffect(() => {

    getData();
   

  
}, []);

const getCorr = async() =>{

try{



const res = await fetch('http://localhost:8000/corr', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ var1 }),
});

const data = await res.json();
setCorr(data.correlations);

console.log(data.correlations);



}
catch (error){

setError(error);



}


}



  const getModel = async () => {
    
    try {
      const res = await fetch('http://localhost:8000/columns', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ var1, split,depth,sample,variance,remove,model,outlier,param }),
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

const valueToRemove = var1;
const index = digit.indexOf(var1);

if (index > -1) {
  digit.splice(index, 1); // Removes 1 element at the found index
}

getCorr();




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
if (loading){

console.log(corr)

}
if (digit == null){
  setDigit([])
}



const handleSub = (col) => {
console.log(digit)
  setFaded((prev) => ({ ...prev, [col]: true }));
  setParam((prev) => ([...prev, col,  ]));
  
  
};

  return (
    
<div className="min-h-screen bg-slate-800 text-white">
<div className="container mx-auto flex flex-col items-center px-4 py-4 space-y-10">

<div className="flex flex-col items-center ">
  <h1 className="text-center">Please select a variable for Decision Tree Regression</h1>

  <div className="flex flex-col justify-center items-center min-h-[60vh]">
    {!select && (
      <motion.select
        initial={{ opacity: 0, y: 20 }}

        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 1 }}
        onChange={(e) => setVar1(e.target.value)}
        className="mb-4 px-4 py-2 border rounded-lg bg-gray-500 text-white shadow-md focus:outline-none"
      >
        {digit.map((col) => (
          <option key={col} value={col}>
            {col}
          </option>
        ))}
      </motion.select>
    )}
  </div>

  <div className="">
    {var1 === var2 ? (
      <p>
        Please select a variable for
        <a href={modal} className="font-bold underline ml-1">
          Decision Tree Regression
        </a>
      </p>
    ) : (
      <button
        onClick={splitModel }
        className="focus:outline-none text-black bg-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 mb-4"
      >
        Confirm
      </button>
    )}


  </div>

{ digit != null && corr != null && 

  <div
   
    className="flex flex-col items-center justify-center min-h-screen"
  >
    <p className="font-bold text-lg mb-4">Chosen parameters:</p>
    <div className="max-h-64 overflow-y-auto w-full flex border border-white justify-center">
      <div className="flex flex-wrap gap-4 mt-4 ml-10">
        {param.map((col) => (
          <button
            key={col}
            className="text-black bg-gray-200 w-64 h-32 rounded-xl shadow-lg border border-gray-300 flex items-center justify-center"
          >
            {col}
          </button>
        ))}
      </div>
    </div>

    <p className="font-bold text-lg mt-10">Select any parameters to use for regression:</p>
    <div className="max-h-64 overflow-y-auto w-full flex border border-white justify-center">
     
     {
      
      
      
      
      
      <div className="flex  flex-wrap gap-4 mt-4 items-center justify-center">
        {digit.map((col,idx) => (
         


        (
          <button
            onClick={() => handleSub(col)}
            key={col}
            className={`text-black  ${
              corr[idx] > 0.7
          ? 'bg-green-200'
          : corr[idx] > 0.5
          ? 'bg-yellow-200'
          : 'bg-red-200'
            } w-64 h-32 rounded-xl shadow-lg border border-gray-300 flex items-center justify-center transition-opacity duration-700 ${
              faded[col] ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >



            {col}: {corr[idx]}
          </button>













         )
        ))}
      
      </div>
}
    </div>
      
  </div>



  }

  {select && (
    <div className="mt-10  flex flex-col items-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 1 }}
        className="mb-4"
      >
        Train Test Split?
      </motion.p>

      <div className="flex gap-4 mb-4">
        {["80-20", "70-30", "90-10"].map((ratio) => (
          <button
            key={ratio}
            onClick={() => setSplit(ratio)}
            className="focus:outline-none text-black bg-white hover:bg-blue-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
          >
            {ratio}
          </button>
        ))}
      </div>

      {split === null && (
        <div className="text-sm text-center">
          <p>Please select a testing margin</p>
          <button
            onClick={() => {
              setPopup(true);
              setState(2);
            }}
            className="underline text-blue-300"
          >
            (What does this mean?)
          </button>
        </div>
      )}

      {model === "Decision Tree Regression" && split && (
        <div className="mt-10 flex flex-col items-center">
          <p className="mb-2">{split}% selected. Select Hyperparameters</p>

          <label className="mb-1">Max Depth</label>
          <motion.select
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 1 }}
            onChange={(e) => setDepth(e.target.value)}
            className="mb-4 px-4 py-2 border rounded-lg bg-gray-500 text-white shadow-md"
          >
            <option>None</option>
            <option>5</option>
            <option>10</option>
            <option>15</option>
          </motion.select>

          <label className="mb-1">Min Sample Split</label>
          <motion.select
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 1 }}
            onChange={(e) => setSample(e.target.value)}
            className="mb-4 px-4 py-2 border rounded-lg bg-gray-500 text-white shadow-md"
          >
            <option>2</option>
            <option>0.01</option>
            <option>0.05</option>
            <option>0.1</option>
            <option>10</option>
          </motion.select>

          
        </div>
      )}

      <p className="mt-10">Click below to begin the multi-variable regression:</p>
      <button
        onClick={initialize}
        className="mt-4 focus:outline-none text-black bg-white hover:bg-blue-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Begin
      </button>

      {loading && (
        <div className="mt-6 text-center">
          <p>Please wait as the model loads</p>
          <TypeAnimation sequence={['', 2000, '...', 2000]} speed={50} repeat={Infinity} />
        </div>
      )}
    </div>
  )}

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
