import Swimmer, { SwimmerSchema } from "@/lib/model/Swimmer.interface";
import getSwimmersCollection from "../getSwimmersCollection";
import { z } from "zod";

export default async function getSwimmers(): Promise<Swimmer[]> {
    const collection = await getSwimmersCollection();
    return await collection.find({}).toArray();
}