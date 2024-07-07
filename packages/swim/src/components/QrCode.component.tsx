"use client"

import { useQRCode } from "next-qrcode"

export default function QrCode({ msg }: { msg: string }) {
    const { Canvas } = useQRCode();

    return <Canvas text={msg} options={{width:360, color: {
        dark:  "#000000",
        light: "#00000000"
    }}}/>
}