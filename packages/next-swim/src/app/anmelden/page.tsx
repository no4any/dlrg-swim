import { Button } from "@/components/Button";
import { H1, H2, H3, H4, H5, H6 } from "@/components/H";
import FormTest from "./Formtest";


export default async function AnmeldenPage() {
    return <div>
        <H1>Kapitel 1</H1>
        <H2>Kapitel 1.1</H2>
        <H3>Kapitel 1.1.1</H3>
        <H4>Kapitel 1.1.1.1</H4>
        <H5>Kapitel 1.1.1.1.1</H5>
        <H6>Kapitel 1.1.1.1.1.1</H6>
        <Button>Hello World</Button>
        <FormTest />
    </div>
}