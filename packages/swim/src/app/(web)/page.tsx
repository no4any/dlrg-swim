import getSwimmersCollection from "@/lib/mongo/getSwimmersCollection"
import getTeamsCollection from "@/lib/mongo/getTeamsCollection";
import fs from "fs";

const TEAMS_FILE = "/data/teams.json";
const SWIMMERS_FILE = "/data/swimmers.json";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function Home() {
  try {

    console.log("Exporting swimmers")
    const scol = await getSwimmersCollection();
    const sJson = JSON.stringify(await scol.find({}).toArray());
    fs.writeFileSync(SWIMMERS_FILE, sJson);
    console.log("Exporting teams")
    const tcol = await getTeamsCollection();
    const tJson = JSON.stringify(await tcol.find({}).toArray());
    fs.writeFileSync(TEAMS_FILE, tJson);
  } catch (e) { }

  return <div>Hello DLRG!</div>
}
