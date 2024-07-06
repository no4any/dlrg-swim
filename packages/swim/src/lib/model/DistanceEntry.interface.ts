import { z } from "zod"

export const DistanceEntrySchema = z.object({
    createdAt: z.number(),
    laps: z.number().min(1),
    registerer: z.string()
})

type DistanceEntry = z.infer<typeof DistanceEntrySchema>

export default DistanceEntry;