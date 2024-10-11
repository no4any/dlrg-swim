"use client";

import logout from "./logout.action";

export default function LogoutLink() {
    return <button className="ml-2" onClick={() => logout()}><b>Abmelden</b></button>
}