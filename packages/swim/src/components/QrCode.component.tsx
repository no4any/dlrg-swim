"use client"

import { useQRCode } from "next-qrcode"

export default function QrCode({ msg }: { msg: string }) {
    const { Canvas } = useQRCode();

    return <div>
        <Canvas text={msg} />
    </div>
}