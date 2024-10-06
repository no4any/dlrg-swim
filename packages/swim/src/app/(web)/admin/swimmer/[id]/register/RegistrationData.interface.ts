import { z } from "zod";

export const RegistrationDataSchema = z.object({
    regNr: z.number().min(0).max(999),
    capColor: z.enum(["R", "Y", "G", "B"]),
    capNr: z.number().min(1).max(100),
    breakfast: z.boolean(),
    distanceRating: z.boolean(),
    publishName: z.boolean(),
    newsletter: z.boolean()
})

type RegistrationData = z.infer<typeof RegistrationDataSchema>

export default RegistrationData;