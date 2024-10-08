import getSession from "@/lib/auth/getSession";
import Link from "next/link";
import LogoutLink from "./Logout";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { mail } = await getSession();

  if (mail === null) {
    return <div><h1>Sie sind nicht angemeldet</h1></div>
  }

  return <div>
    <div className="bg-white/25 p-4 rounded-lg backdrop-blur xl:mx-64 lg:mx-32 md:mx-16 mx-8 mt-4 mb-8">
      <Link href="/admin/log" className="mr-2"><b>Erfassen</b></Link>
      <Link href="/admin/laps" className="mr-2"><b>Bahnen</b></Link>
      <Link href="/admin/swimmer" className="mr-2"><b>Schwimmer</b></Link>
      <Link href="/admin/teams" className="mr-2"><b>Teams</b></Link>
      <Link href="/admin/users" className="mr-2"><b>Benutzerverwaltung</b></Link>
      <Link href="/admin/users/add" className="mr-2"><b>Benutzer hinzufügen</b></Link>
      <Link href="/admin/user" className="mr-2"><b>Passwort ändern</b></Link>
      <LogoutLink />
    </div>
    <div className="bg-white/25 p-4 rounded-lg backdrop-blur xl:mx-64 lg:mx-32 md:mx-16 mx-8 mt-4 mb-8">
      {children}
    </div>
    <div className="bg-white/25 p-4 rounded-lg backdrop-blur xl:mx-64 lg:mx-32 md:mx-16 mx-8 mt-4">
      <a href="https://giessen.dlrg.de/impressum-und-datenschutz/">Impressum</a>
    </div>
  </div>
}