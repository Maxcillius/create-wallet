import Image from "next/image"

export default function Keys({privKey, pubKey, wallet}: {privKey: string, pubKey: string, wallet: string}) {
    return (
        <div className="flex flex-col justify-center">
            <div className="bg-slate-700 flex justify-center">
                <h2 className="text-lg md:text-3xl p-1 md:p-4 text-white text-center col-span-11">Wallet {wallet}</h2>
            </div>
            <div className="flex flex-col justify-center">
                <div className="flex flex-row justify-start">
                    <p className="text-center flex flex-col justify-center px-4 bg-slate-200 text-xs md:text-xl font-semibold w-40">Private</p>
                    <p className="text-center text-slate-800 p-1 md:p-4 bg-slate-100 w-full overflow-scroll text-xs md:text-xl">{privKey}</p>
                </div>
                <div className="flex flex-row justify-start shadow-lg">
                    <p className="text-center flex flex-col justify-center px-4 bg-slate-200 text-xs md:text-xl font-semibold w-40">Public</p>
                    <p className="text-center text-slate-800 p-1 md:p-4 bg-slate-100 w-full overflow-scroll text-xs md:text-xl">{pubKey}</p>
                </div>
            </div>
        </div>
    )
}