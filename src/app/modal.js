'use client'



// see https://tailwindui.com/components/application-ui/overlays/modal-dialogs
//for more information on the modal code structure
import { useState,useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'



const Example = ({isVisible,onClose,message}) =>{
  const [open, setOpen] = useState(true)
    const [detail,setDetail] = useState("y");


    useEffect(() => {
      switch (message) {
        case 1:
          setDetail('Risk/Fraud Tech Intern under Joe Burling.');
          break;
        case 2:
          setDetail('Work on maintaining and updating club website, participating in board meetings, and helping drive club growth. Utilized Tailwind, Astro, and React.');
          break;
        default:
          setDetail('');
      }
    }, [message]);




 






  if (!isVisible){
  
    return null;
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} 
    className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start"> 
                
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                Description 
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                   Classification works best for binary data. If your data has columns with distinct states (0 1 2, etc), then classification may work best. 
                   Regression is mainly used for predicting continious values, such as house prices. For more information, check here:
                   <a href  = ' kit-learn.org/stable/'></a>


                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button onClick={onClose} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >Close Popup </button>
            
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
};

export default Example;