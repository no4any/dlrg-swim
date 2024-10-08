"use client";

import logout from "./logout.action";

export default function LogoutLink() {
    return <button onClick={() => logout()}><b>Abmelden</b></button>
}