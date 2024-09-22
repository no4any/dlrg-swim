import { ObjectId } from "mongodb";
import { z } from "zod";

export const UserSchema = z.object({
    _id: z.union([z.instanceof(ObjectId), z.string()]).optional(),
    mail: z.string().min(2),
    password: z.string().min(2),
    isAdmin: z.boolean().optional().nullable()
})

type User = z.infer<typeof UserSchema>

export default User;