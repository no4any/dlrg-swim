"use server"

import LoginForm from "@/components/forms/loginForm/LoginForm"

export default async function LoginPage() {
    return <div className="xl:w-[760px] lg:w-[760px] md:w-[480px]">
        <LoginForm />
    </div>
}