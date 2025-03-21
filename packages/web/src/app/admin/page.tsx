import ContentArea from "@/components/ContentArea.component";
import InputText from "@/components/input/InputText.component";

export default async function AdminPage() {
    return <ContentArea>
        <>
            Hi Admin!
            <div>
                <InputText name="a" value="asdf" label="Hallo" />
            </div>
        </>
    </ContentArea>
}