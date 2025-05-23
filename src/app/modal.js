'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

const Example = ({ isVisible, onClose, message }) => {
  const [detail, setDetail] = useState("")

  useEffect(() => {
    switch (message) {
      case 1:
        setDetail('Risk/Fraud Tech Intern under Joe Burling.')
        break
      case 2:
        setDetail('Work on maintaining and updating club website, participating in board meetings, and helping drive club growth. Utilized Tailwind, Astro, and React.')
        break
      default:
        setDetail('')
    }
  }, [message])

  if (!isVisible) {
    return null
  }

  return (
    <Dialog open={isVisible} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    Description
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {detail}{' '}
                      <a href="https://scikit-learn.org/stable/" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800">
                        Learn more
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Close Popup
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default Example
