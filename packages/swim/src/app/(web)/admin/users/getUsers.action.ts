"use server"

import User from "@/lib/model/User.interface"
import listUsers from "@/lib/mongo/operations/users/listUsers"
import "server-only"

export default async function getUsers(): Promise<User[]> {
    return await listUsers();
}