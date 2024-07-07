import { z } from "zod";
import { DistanceEntrySchema } from "./DistanceEntry.interface";
import { ObjectId } from "mongodb";

export const SWIMMER_STATE_ANNOUNCED = "ANNOUNCED";
export const SWIMMER_STATE_REGISTERED = "REGISTERED";
export const SWIMMER_STATE_FINISHED = "FINISHED";

export const SwimmerSchema = z.object({
    _id: z.union([z.instanceof(ObjectId), z.string()]).optional(),
    status: z.enum(["ANNOUNCED", "REGISTERED", "FINISHED"]).optional(),
    email: z.string().email(),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    city: z.string().optional(),
    distanceRating: z.boolean().optional(),
    birthday: z.string().date().optional(),
    teamName: z.string().optional(),
    breakfast: z.boolean().optional(),
    optIn: z.boolean().optional(),
    publishName: z.boolean().optional(),
    distanceEntries: z.array(DistanceEntrySchema).optional()
})

type Swimmer = z.infer<typeof SwimmerSchema>

export default Swimmer;