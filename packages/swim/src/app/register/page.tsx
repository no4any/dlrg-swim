import InputCheckbox from "@/components/input/InputCheckbox.component";
import InputDate from "@/components/input/InputDate.component";
import InputText from "@/components/input/InputText.component";
import registerAction from "./register.action";

export default async function RegisterPage() {
    return <div className="xl:mx-64 lg:mx-32 md:mx-16 mx-8 mt-4 mb-8">
        <header className="mb-4">
            <h1 className="lg:text-5xl text-2xl text-dlrg-blue font-extrabold">
                Anmeldung
                <small className="ms-2 font-semibold text-dlrg-black-100">
                    zum 24 Stunden Schwimmen 2024
                </small>
            </h1>
        </header>
        <main>
            <form action={registerAction}>
                <div className="grid lg:grid-cols-2 gap-4 mb-4">
                    <InputText name="name" title="Name" />
                    <InputText name="prename" title="Vorname" />
                    <InputText name="email" title="E-Mail" />
                    <InputDate name="birthday" title="Geburtstag" />
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <InputText name="city" title="Stadt" />
                    <InputText name="teamName" title="Name des Teams" />
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <InputCheckbox name="breakfast" title="Möchten Sie Frühstück" />
                    <InputCheckbox name="distanceRating" title="Möchten Sie an der Distanzwertung teilnehmen" />
                    <InputCheckbox name="publishName" title="Ich bin damit einverstanden, dass mein Name mit meinen Leistungen veröffentlicht wird" />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <button className="bg-dlrg-blue hover:bg-dlrg-blue-900 rounded p-2 font-bold text-dlrg-black-100" type="submit">Anmelden</button>
                    </div>
                </div>
            </form>
        </main>
    </div>
}