import { NextRequest, NextResponse } from "next/server";
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js"
import nacl from "tweetnacl";
import bs58 from 'bs58';

export async function POST(req: NextRequest) {

    const body = await req.json();
    const path = body.path;

    const mnemonic = body.mnemonic || generateMnemonic();

    if(!validateMnemonic(mnemonic)) {
        return NextResponse.json({
            message: "Invalid phrases"
        }, {
            status: 400
        })
    }
    
    try {
        const seed = mnemonicToSeedSync(mnemonic);

        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const privKey = bs58.encode(secretKey);
        const pubKey = Keypair.fromSecretKey(secretKey).publicKey.toBase58();

        return NextResponse.json({
            Keys: {
                privKey: privKey,
                pubKey: pubKey
            },
            mnemonic: mnemonic
        })
    
    } catch (err) {

        console.log(err);

        return NextResponse.json({
            message: err
        }, {
            status: 400
        })
    }
}