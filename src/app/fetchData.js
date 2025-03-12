import React from "react";


export default async function FetchData(){
   
   
   
    try {
        const res = await fetch('http://localhost:3000', { 
            method: 'POST',
            body: formData
        });
        
        const output = await res.json();
        console.log("Yo this works");
        
        setMessage('File uploaded successfully!');
        //

    } catch (err) {
        console.error('Error during file upload:', err);
        setMessage('Error uploading file.');


    }
    return(


        <div>
        



        </div>


    );






}
