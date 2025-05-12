'use client'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";  

export default function Eval() {
    const[loading,setLoading] = useState(true);

    const getData = async () => {
        try {
          const res = await fetch('http://localhost:8000/columns')
          
          console.log(res);

          const data = await res.json();
          



    
        
    setLoading(false);
          
        } catch (error) {
      console.log(error)
        }
      };
    

      useEffect(() => {
        getData();
       
    
      
    }, []);



if(loading){


    return(

        <p>We loading up</p>
    )
}



return(

<p>Worked</p>




)

}