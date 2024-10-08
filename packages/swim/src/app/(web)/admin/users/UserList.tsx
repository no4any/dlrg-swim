"use client"

import User from "@/lib/model/User.interface"
import { useState } from "react"
import { FaRegTrashCan } from "react-icons/fa6";
import getUsers from "./getUsers.action";
import removeUser from "./removeUser.action";

export interface UserListProps {
    users: User[]
}

function onConfirm(msg: string, func: () => void) {
    if (confirm(msg)) {
        func();
    }
}

export default function UserList({ users }: UserListProps) {
    const [us, setUs] = useState(users);

    async function reload() {
        setUs(await getUsers())
    }

    return <div>
        {us.map((user) => <div key={user.mail} className="grid lg:grid-cols-3 grid-cols-2 mb-4">
            <div className="p-1">{user.isAdmin ? <b>{user.mail}</b> : <span>{user.mail}</span>}</div>
            <div className="p-1 hidden lg:block">{user.isAdmin ? "ADMIN" : "Normaler User"}</div>
            <div className="text-right">
                <button className="rounded-lg bg-dlrg-red-500 p-1" onClick={() => onConfirm("Wirklich löschen?", async () => {
                    const status = await removeUser(user.mail);
                    if(status) await reload();
                })}>🗑</button>
            </div>
        </div>)}
    </div>
}