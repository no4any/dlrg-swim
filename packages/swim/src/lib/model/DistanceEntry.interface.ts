import { z } from "zod"

export const DistanceEntrySchema = z.object({
    nr: z.number(),
    deactivated: z.boolean().optional(),
    createdAt: z.number(),
    laps: z.number().min(1),
    registerer: z.string(),
    nightCup: z.boolean().optional(),
})

type DistanceEntry = z.infer<typeof DistanceEntrySchema>

export default DistanceEntry;