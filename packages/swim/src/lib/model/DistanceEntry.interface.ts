import { ObjectId } from "mongodb";
import { z } from "zod"

export const DistanceEntrySchema = z.object({
    _id: z.union([z.instanceof(ObjectId), z.string()]).optional(),
    swimmerId: z.string(),
    nr: z.number(),
    deactivated: z.boolean().optional(),
    createdAt: z.number(),
    laps: z.number().min(1),
    registerer: z.string(),
    nightCup: z.boolean().optional(),
})

type DistanceEntry = z.infer<typeof DistanceEntrySchema>

export default DistanceEntry;