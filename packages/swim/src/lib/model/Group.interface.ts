import { ObjectId } from "mongodb";
import { z } from "zod";

export const GroupSchema = z.object({
    _id: z.union([z.instanceof(ObjectId), z.string()]).optional(),
    name: z.string().min(2),
    owner: z.string().min(2), // _id of Swimmer
})

type Group = z.infer<typeof GroupSchema>

export default Group;