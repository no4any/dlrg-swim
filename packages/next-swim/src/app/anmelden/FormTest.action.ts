"use server"

import formDataToObject from "@/lib/helper/FormDataToObject";
import { z } from "zod"

export interface FormState {
    error?: boolean
}

const MySchema = z.object({
    a1: z.string(),
    b2: z.string()
})

export default async function FormTestAction(prevState: FormState, formData: FormData): Promise<FormState> {
    console.log(formData);
    return {}
}