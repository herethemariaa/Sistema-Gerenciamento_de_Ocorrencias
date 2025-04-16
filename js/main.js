//passo 1 - adicionar uma ocorrência

function adicionarOcorrencia(){
    const aluno = document.getElementById("add-aluno").value
    const categoria = document.getElementById("ocorrencia").value
    const motivo = document.getElementById("descrever-ocorrencia").value
    const data = document.getElementById("data-ocorrencia").value
    const responsavel = document.getElementById("responsavel-ocorrencia").value

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
    //tenta exibir uma lista de informações já existentes, se não existir inicia uma lista vazia
    const ocorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || []

    ocorrencias.push(novaOcorrencia)
    localStorage.setItem("ocorrencias", JSON.stringify(ocorrencias))

    alert("Ocorrência adicionada com sucesso!")


}

//passo 2 - exibir ocorrências

function exibirOcorrencias(){
    const corpoTabela = document.getElementById("corpo-tabela")
    corpoTabela.innerHTML = ""

    const ocorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || []

    ocorrencias.forEach((ocorrencia, index) => {
        //for each cria uma variavel temporaria pra se referir a um dado individual da lista (correncia)//
        const linha = `
            <tr>
                <td>${ocorrencia.aluno}</td>
                <td>${ocorrencia.categoria}</td>
                <td>${ocorrencia.motivo}</td>
                <td>${ocorrencia.data}</td>
                <td>${ocorrencia.responsavel}</td>
                <td>
                <button onclick="removerOcorrencia(${index})">Remover</button>
                <button onclick="editarOcorrencia(${index})">Editar</button>
                </td>
            </tr>
        `
        corpoTabela.innerHTML += linha
    })
}