"use server"

import { LOGIN_FORM_FIELD_PASSWORD, LOGIN_FORM_FIELD_USERNAME, LoginFormState } from "./LoginForm";

interface Credentials {
    username: string,
    password: string
}

async function validateFormData(formData: FormData): Promise<Credentials> {
    console.log("formData validate", formData);

    return {
        username: LOGIN_FORM_FIELD_USERNAME,
        password: LOGIN_FORM_FIELD_PASSWORD,
    }
}

export default async function LoginAction(_prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {
    const credentials = await validateFormData(formData)

    console.log(credentials);

    return {
        wrongCredentials: true
    }
}