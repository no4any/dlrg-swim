"use server"

import flatten from "@/lib/flatten";
import getAge from "@/lib/getAge";
import Swimmer from "@/lib/model/Swimmer.interface";
import getDistanceForSwimmer from "@/lib/mongo/operations/distances/getDistanceForSwimmer";
import getDistanceForSwimmerNight from "@/lib/mongo/operations/distances/getDistanceForSwimmerNight";
import getSwimmers from "@/lib/mongo/operations/getSwimmers";

export default async function getSwimmerWithResultsAction(): Promise<(Swimmer & {
    total: number,
    night: number,
    age: number
})[]> {
    const swimmers = (await getSwimmers()).filter(swimmer => swimmer.status !== "ANNOUNCED");

    const result = await Promise.all(swimmers.map(async (swimmer) => ({
        ...swimmer,
        age: swimmer.birthday ? getAge(new Date(swimmer.birthday)) : 0,
        total: await getDistanceForSwimmer(swimmer._id?.toString() || ""),
        night: await getDistanceForSwimmerNight(swimmer._id?.toString() || "")
    })))

    return await flatten(result);
}