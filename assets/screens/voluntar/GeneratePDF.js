import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

const html = `
    <html>
        <body>
            <h1>Adeverință de voluntariat</h1>
                <p>
                    Prin prezenta se atestă faptul că studentul(a)
                    <b>${nume} ${prenume}</b>,
                    înscrisă la <b>${universitatea}</b>, 
                    facultatea <b>${facultatea}</b>,
                    specializarea <b>${specializarea}</b>,
                    anul <b>${anul}</b>,
                    este membru a <b>Organizației Studenților Basarabeni din Timișoara</b>,
                    conform contractului de voluntariat nr.____, din data de __.__.____,
                    având un număr de <b>${totalOreDeVoluntariat} de ore de voluntariat</b>.
                    (Semestrul <b>${semestru}</b>, anul de studii <b>${anulDeStudiu}</b>).
                </p>
            <p> Prezenta adeverință servește pentru cazare/credite voluntariat </p>
        </body>
    </html>
`;

const generatePDF = () => {

}
