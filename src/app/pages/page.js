
'use client'
import React from "react"
import Results from "../results/result"
import { useState,useEffect } from "react";
import { useRouter } from 'next/navigation'
import {Table} from 'react-bootstrap';



export default  function Loading(){
    const [output,setOutput] = useState(null);
    const[loading,setLoading]= useState(true);
    const[column,setColumn] = useState(null);
    const[row,setRow] = useState(null);
    const[numCol,setnumCol] = useState(null);
    const[message,setMessage] = useState("Success!");
    const[keys,setKeys] = useState(null);
    const[values,setValues] = useState(null);
    const[head,setHead] = useState("");

    let empty = '';
    
   let colarray = [];
    const getData = async () => {
       

 






        try {
            const res = await fetch('http://localhost:8000/data', { 
                method: 'POST',
                credentials: 'include',
            
              
              
            });

           
            const data = await res.json()
            setOutput(data)
           
            
           setColumn(data.columns);
            setRow(data.shape[0]);
            setnumCol(data.shape[1]);

            
            setLoading(false);
            setHead(data.overview);
    
            
           
            empty = data.missing;
            empty = JSON.parse(empty);
            
           
             let scrapeKey = Object.keys(empty);
              let scrapeValue = Object.values(empty);
             scrapeValue = JSON.stringify(scrapeValue);
             setValues(scrapeValue);
             setKeys(scrapeKey);
            
    
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




console.log(head);
if (head == ''){


}
else{
var headArr = JSON.parse(head);
 
}
console.log(typeof headArr);





   
    


    if (loading){
        return(<p className="text-black">LOADING</p>)
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


    return( 
    
    

        <div className=" justify-center text-black bg-blue-100">

            <header className="flex justify-center font-bold text-lg  font-rockSalt" >Your Dataset in Review</header>

<div className="container flex justify-center outline-black mt-10" >
     <p className="text-black">Number of Rows:  {row}</p>
    

  

    <p className="text-black mr-10 ml-10"> Number of Columns: {numCol}</p>
    </div>
        <p className="text-black">{message}</p>
     
     
    <p className="text-black"> Column Names:{colarray}  </p>
    
    <p className="text-black">Total missing values for the dataset: {values}</p>
    <p className="text-black">Column Types: {output.num}</p>






























<Table striped bordered hover variant="dark" className="text-black">
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
    );
    





}