import { Collection } from "mongodb";
import Swimmer from "../model/Swimmer.interface";
import getDatabase from "./getDatabase";
import { MONGO_SWIMMERS_COLLECTION } from "../params";

export default async function getSwimmersCollection(): Promise<Collection<Swimmer>> {
    return (await getDatabase()).collection<Swimmer>(MONGO_SWIMMERS_COLLECTION);
}