'use client'

import { useState } from "react"
import Link from "next/link";

export default function Home() {

  const [isEvent, setEvent] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleEvent = () => {
    setEvent(true);
    
  }

  const handleLoading = () => {
    setLoading(true);
  }  

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex flex-col justify-center gap-10">
        <div className={`flex flex-col justify-center gap-10`}>
          <h1 className={`${isEvent ? 'hide' : ''} text-5xl text-center p-3 font-Roboto`}>
            Create Your Own Wallet
          </h1>
          <div className="flex flex-row justify-center gap-10">
            <button onClick={handleEvent} className={`${ isEvent ? 'move' : ''} absolute bg-[#2a9d8f] shadow-xl hover:scale-110 transition-transform font-semibold text-3xl p-4 px-10 rounded-xl font-Fira_Code text-white`}>Begin</button>
            <div className="flex flex-col justify-center">
              <div className={`${isLoading ? 'loader' : ''}`}></div>
            </div>
            <h1 className={`${isEvent ? 'visible': ''} ${isLoading ? 'hide' : ''} collapse text-3xl flex flex-col justify-center font-Fira_Code`}>Select your wallet</h1>
            <button onClick={handleLoading} className={`${isEvent ? 'visible' : ''} collapse bg-orange-500 shadow-xl hover:scale-110 transition-transform font-semibold text-3xl p-4 px-10 rounded-xl font-Fira_Code text-white`}><Link href="/bitcoin">Bitcoin</Link></button>
            <button onClick={handleLoading} className={`${isEvent ? 'visible' : ''} collapse bg-[#0077b6] shadow-xl hover:scale-110 transition-transform font-semibold text-3xl p-4 px-10 rounded-xl font-Fira_Code text-white`}><Link href="/ethereum">Ethereum</Link></button>
            <button onClick={handleLoading} className={`${isEvent ? 'visible' : ''} collapse bg-[#7209b7] shadow-xl hover:scale-110 transition-transform font-semibold text-3xl p-4 px-10 rounded-xl font-Fira_Code text-white`}><Link href="/solana">Solana</Link></button>
          </div>
        </div>
      </div>
    </div>
  )
}