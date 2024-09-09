import RegisterForm from "./RegisterForm.component";

export default async function RegisterPage() {


    return <div className="">
        <header className="mb-4">
            <h1 className="lg:text-5xl text-2xl text-dlrg-blue font-extrabold">
                Anmeldung
                <small className="ms-2 font-semibold text-dlrg-black-100">
                    zum 24 Stunden Schwimmen 2024
                </small>
            </h1>
        </header>
        <main>
            <RegisterForm />
        </main>
    </div>
}