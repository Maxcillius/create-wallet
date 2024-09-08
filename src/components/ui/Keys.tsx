import Image from "next/image"

export default function Keys({privKey, pubKey, wallet}: {privKey: string, pubKey: string, wallet: string}) {
    return (
        <div className="flex flex-col justify-center">
            <div className="bg-slate-700 grid grid-cols-12">
                <h2 className="text-3xl p-4 text-white text-center col-span-11">Wallet {wallet}</h2>
            </div>
            <div className="flex flex-col justify-center">
                <div className="flex flex-row justify-start">
                    <p className="text-center flex flex-col justify-center px-4 bg-slate-200 text-xl font-semibold w-40">Private</p>
                    <p className="text-center text-slate-800 p-4 bg-slate-100 w-full overflow-scroll">{privKey}</p>
                </div>
                <div className="flex flex-row justify-start shadow-lg">
                    <p className="text-center flex flex-col justify-center px-4 bg-slate-200 text-xl font-semibold w-40">Public</p>
                    <p className="text-center text-slate-800 p-4 bg-slate-100 w-full">{pubKey}</p>
                </div>
            </div>
        </div>
    )
}