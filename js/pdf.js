function gerarPDF() {
    const tabela = document.getElementById("tabela-ocorrencias")

    const opt = {
        margin:       0.5,
        filename:     'ocorrencias.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    html2pdf().set(opt).from(tabela).save();
}
