export default function textForRegMail(link:string): string {
    return `<h1>Ihre Anmeldung</h1>
    <p>Mit dieser Mail erhalten sie den Link zu ihren anmeldedaten. Sollte Änderungen nötig sein, können sie diese bei der Registrierung am Veranstaltungstag vornahmen lassen.<p>
    <p>Teamleiter können über ihren Link auch den Stand ihrer Mannschaften einsehen.</p>
    <p><a href="${link}">Link zu Ihren anmeldedaten</a></p>`
}