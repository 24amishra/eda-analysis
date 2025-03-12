'use client'
import React, { useState ,useEffect} from 'react';
import './globals.css';
import { useRouter } from 'next/navigation'
import Example from './modal';
import { Truculenta } from 'next/font/google';
import Link from 'next/link';
import Loading from './pages/page';
import FetchData from './fetchData';






const FileUpload = () => {
    const router = useRouter();
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [fpred, setFpred] = useState(null);
    const [probability, setProbability] = useState(null);
    const[csv,setCsv] = useState(null);










    // Handle file selection
    const onFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Handle file upload
    const onFileUpload = async () => {
        if (!file) {
            setMessage('Please select a file first.');
            return;
        }
       

        // Create FormData object
        const formData = new FormData();
        formData.append('file', file); // Append the file to FormData
//Fetch Data API endpoint
if (file.type != "text/csv"){
    setCsv[false];
    setMessage('Please input a CSV file only.');

  




    return;
}
        try {
            const res = await fetch('http://localhost:8000/server', { 
                method: 'POST',
            
              
              body: formData
            });

           
            const output = await res.json()
            console.log(output);

            
          
           

              
              
          
              


 


            


            setMessage('File uploaded successfully!');
            setFile(true);
            setCsv(true);
        } catch (err) {
            console.error('Error during file upload:', err);
            setMessage('Error uploading file.');

        }

       


    };
    const nextPage = () => {
        if (csv) {
            
            
            router.push('/pages');

            
            
        }
    }
    
    

    return (
        <div className='flex my-auto
        
        '>
        <div className="flex flex-col items-center font-inter  text-center">
            <div className=' w-128 h-128 flex containe flex-col justify-center items-center bg-purple-300'>
      
  
        
            



        
             
         
      
        <input type="file" onChange={onFileChange} />
            <button className= " focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" 
            onClick={onFileUpload}>Upload</button>
            
         

       
<div className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
   
         
       
      <button type = 'submit'  onClick = {nextPage}
      
      >Begin Initial EDA</button>
       
      
      </div>
      <p>Status: {message}</p>



       
        </div>
        </div>
        </div>
    
    );
};

export default FileUpload;

