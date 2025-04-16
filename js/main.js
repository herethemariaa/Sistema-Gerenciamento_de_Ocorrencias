function adicionarOcorrencia(){
    const aluno = document.getElementById("add-aluno").value
    const categoria = document.getElementById("ocorrencia").value
    const motivo = document.getElementById("descrever-ocorrencia").value
    const data = document.getElementById("data-ocorrencia").value
    const responsavel = document.getElementById(responsavel)-ocorrencias.value

    if (!aluno || !categoria || !motivo || !data || !responsavel){
        alert("Preencha todos os campos!")
        return
    }
    const novaOcorrencia = {
        aluno,
        categoria,
        motivo,
        data,
        responsavel,
    }
}
//tenta exibir uma lista de informações já existentes, se não existir innicia uma lista vazia
const ocorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || []

ocorrencias.push(novaOcorrencia)
localStorage.setItem("ocorrencias", JSON.stringify(ocorrencias))

