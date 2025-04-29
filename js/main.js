// passo 1 - EXIBIR MODAL COM FORMULÁRIO

function mostrarFormulario() {
    const modal = document.getElementById("modal")
    modal.style.display = "flex" // exibindo o modal
}

function fecharModal() {
    const modal = document.getElementById("modal")
    modal.style.display = "none"
}

window.addEventListener("click", function(event) {
    const modal = document.getElementById("modal")
    if (event.target === modal) {
        fecharModal()
    }
})

// passo 2 - VALIDAR E PREENCHER INPUTS

function adicionarOcorrencia() {
    const aluno = document.getElementById("add-aluno").value
    const categoria = document.getElementById("ocorrencia").value
    const motivo = document.getElementById("descrever-ocorrencia").value
    const data = document.getElementById("data-ocorrencia").value
    const responsavel = document.getElementById("responsavel-ocorrencia").value

    if (!aluno || !categoria || !motivo || !data || !responsavel) {
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

    const ocorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || []

    ocorrencias.push(novaOcorrencia)
    localStorage.setItem("ocorrencias", JSON.stringify(ocorrencias))

    alert("Ocorrência adicionada com sucesso!")

    document.getElementById("add-aluno").value = ""
    document.getElementById("ocorrencia").value = ""
    document.getElementById("descrever-ocorrencia").value = ""
    document.getElementById("data-ocorrencia").value = ""
    document.getElementById("responsavel-ocorrencia").value = ""

    fecharModal()
    
    exibirOcorrencias()
}

// passo 3 - TABELA PRA EXIBIR AS INFORMAÇÕES DO FORM

function exibirOcorrencias() {
    const corpoTabela = document.getElementById("corpo-tabela")
    corpoTabela.innerHTML = ""

    const ocorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || []

    ocorrencias.forEach((ocorrencia, index) => {
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

//funções para botão remover
