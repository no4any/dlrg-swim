import { z } from "zod";
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
    gender: z.enum(["0", "M", "W"]).optional(),
    city: z.string().optional(),
    distanceRating: z.boolean().optional(),
    birthday: z.string().date().nullable().optional(),
    teamId: z.string().optional(),
    breakfast: z.boolean().optional(),
    optIn: z.boolean().optional(),
    publishName: z.boolean().optional(),
    capColor: z.string().optional(),
    capNr: z.number().min(1).max(100).optional(),
    regNr: z.number().min(100).max(999).optional(),
    newsletter: z.boolean().optional(),
})

type Swimmer = z.infer<typeof SwimmerSchema>

export default Swimmer;