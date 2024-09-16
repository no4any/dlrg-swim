import SwimErrorNoSwimmer from "@/lib/error/SwimErrorNoSwimmer";
import Swimmer, { SwimmerSchema } from "@/lib/model/Swimmer.interface";

export default async function formToSchwimmer(form: FormData): Promise<Swimmer> {
    try {
        return SwimmerSchema.parse({
            lastName: form.get('name')?.toString() || "",
            firstName: form.get('prename')?.toString() || "",
            email: (form.get('email')?.toString() || "").toLowerCase(),
            birthday: form.get('birthday')?.toString() || undefined,
            teamId: form.get('teamId') || undefined,
            city: form.get('city')?.toString(),
            breakfast: form.get('breakfast') === "on",
            distanceRating: form.get('distanceRating') !== "on",
            publishName: form.get('publishName') === "on",
            newsletter: form.get('newsletter') === "on",
            status: "ANNOUNCED"
        });
    } catch (e) {
        throw new SwimErrorNoSwimmer("Form is no swimmer")
    }
}