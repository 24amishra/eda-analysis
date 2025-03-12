import Image from "next/image";
import FileUpload from "./fileUpload";

import 'bootstrap/dist/css/bootstrap.min.css';


export default function Home() {







  

  return (
    
    
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-[#0b182e] text-black">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"></link>      
    <div className = "topnav text-lg ">


<div className="">



</div>
<p className="font-inter text-xl font-bold  bg-[#0b182e] " >
Upload a file 
</p>
<p className="font-inter text-l mt-10  ">Enter a CSV dataset  </p>








</div>

    <FileUpload/>
    </div>
  );
}
