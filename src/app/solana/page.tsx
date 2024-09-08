'use client'

import { useState } from "react"
import Image from "next/image";
import Keys from "@/components/ui/Keys";
import { walletKeys } from "@/types/walletKeys";
import axios from 'axios';

export default function Bitcoin() {

    const [Generated, setGenerated] = useState(false);
    const [Phrases, setPhrases] = useState("");
    const [isDropDown, setDropDown] = useState(false);
    const [mnemonics, setMnemonics] = useState("");
    const [WalletKeys, setKeys] = useState<walletKeys[]>([]);
    const [haveMnemonics, setHaveMnemonics] = useState(false);
    const [Count, setCount] = useState(0);
    const [Alert, setAlert] = useState("");

    const handKeys = async () => {

        let response;

        try {
            if(Phrases.length > 0) {
                console.log(Phrases);
                response = await axios.post('/api/v1/wallet/bitcoin', {
                    path: `m/44'/501'/0'/0'/${Count}'`,
                    mnemonic: Phrases
                });
            } else {
                response = await axios.post('/api/v1/wallet/bitcoin', {
                    path: `m/44'/501'/0'/0'/${Count}'`,
                    mnemonic: mnemonics
                });
            }
            
            const key: walletKeys = response.data.Keys;
            key.id = Count;
            setCount(Count+1);
            if(mnemonics.length === 0) setMnemonics(response.data.mnemonic);
            setHaveMnemonics(true);
            setKeys((keys) => [...keys, key]);
            setGenerated(true);


        } catch(err) {
            setAlert("Please provide genuine phrases")
            setTimeout(() => {
                setAlert("");
            }, 3000)
        }
    }

    const handleDelete = async (key: number) => {
        setKeys(WalletKeys.filter(keys => keys.id !== key));
        if(WalletKeys.length === 1) {
            setGenerated(false);
            setMnemonics("");
            setHaveMnemonics(false);
            setPhrases("");
            setCount(0);
        }
    }

    return (
        <div className="flex flex-row h-screen lg:px-10">
            <div className="flex flex-col w-full h-screen pt-32">
                <div className="flex flex-col lg:flex-row">
                    <div className="flex flex-col justify-start gap-5 w-full">
                        <div className={`flex flex-row w-full px-2`}>
                            { mnemonics.length === 0 && 
                                <input
                                onChange={(e) => {
                                    setPhrases(e.target.value);
                                }} 
                                className="w-full mx-1 px-1 lg:px-4 lg:mx-4 text-sm lg:text-3xl font-Roboto rounded-lg bg-slate-200 shadow-lg"></input>
                            }
                            <div className={`${mnemonics.length !== 0 ? 'w-full px-10' : ''}`}>
                                <button onClick={handKeys} className="bg-sol rounded-lg w-full text-center text-white font-bold p-2 lg:p-4 shadow-lg hover:scale-105 transition-transform">
                                    <p className="text-center flex flex-col justify-center text-sm lg:text-xl">
                                        {`${Phrases.length == 0 ? 'Generate' : 'Add'}`}
                                    </p>
                                </button>
                            </div>
                        </div>
                        { 
                            haveMnemonics &&

                            <div className="flex flex-col justify-center px-4">
                                    <div className="flex flex-row justify-center bg-slate-800 shadow-lg">
                                        <div className="flex flex-col justify-center">
                                            <h2 className="text-center text-white font-sans font-semibold p-2 text-xs md:text-2xl">Secret Phrase</h2>
                                        </div>
                                        <Image onClick={() => {
                                            setDropDown(!isDropDown);    
                                        }}
                                        src={"/dropdown.svg"} alt="dropdown" height={25} width={25} className="hover:cursor-pointer hover:scale-125 transition-transform"></Image>
                                    </div>
                                    <div className="flex flex-col justify-center bg-slate-800 rounded-md h-fit shadow-lg">
                                        { isDropDown &&
                                            <div className="h-full bg-slate-700 shadow-lg">
                                                <div className="grid auto-rows-auto grid-cols-4 h-full">
                                                    {mnemonics.split(" ").map((word) => {
                                                        return (
                                                            <div key={word} className="text-center flex flex-col justify-center text-white font-semibold text-xs lg:text-2xl xl:text-3xl p-3 lg:p-7">
                                                                {word}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        }
                                    </div>
                            </div>
                        }
                        { Generated &&
                            <div className="flex flex-col w-full overflow-scroll h-96 gap-10 px-4 lg:my-0 my-10">
                                {
                                    WalletKeys.map((wallKeys: walletKeys) => {
                                        return (
                                            <div key={wallKeys.id}>
                                                <Keys privKey={wallKeys.privKey} pubKey={wallKeys.pubKey} wallet={wallKeys.id.toString()}/>
                                                <div className="flex flex-row justify-end p-2 bg-slate-100">
                                                    <Image onClick={() => {handleDelete(wallKeys.id)}} src={"/delete.svg"} alt="delete" height={20} width={20} className="hover:cursor-pointer hover:scale-110 transition-transform"></Image>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                        <div className="text-center text-red-500">
                            {Alert}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}