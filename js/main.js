//lógica utilizada para o modal do formulário

function mostrarFormulario() {
    const modal = document.getElementById("modal")
    modal.style.display = "flex"
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

//tudo o que fizemos aqui basicamente foi criar três funções diferentes 
// onde uma delas serve para adicionar os eventos de abrir e fechar o modal 
// ao clicar. esse tipo de função também conta com a lógica de estilização

// Adiciona nova ocorrência
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
        responsavel
    }

    const ocorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || []

    const indiceEditando = localStorage.getItem("indiceEditando")
    if (indiceEditando !== null) {
        ocorrencias[indiceEditando] = novaOcorrencia
        localStorage.removeItem("indiceEditando")
    } else {
        ocorrencias.push(novaOcorrencia)
    }

    localStorage.setItem("ocorrencias", JSON.stringify(ocorrencias))

    alert("Ocorrência salva com sucesso!")

    document.getElementById("add-aluno").value = ""
    document.getElementById("ocorrencia").value = ""
    document.getElementById("descrever-ocorrencia").value = ""
    document.getElementById("data-ocorrencia").value = ""
    document.getElementById("responsavel-ocorrencia").value = ""

    fecharModal()
    exibirOcorrencias()
}

// Exibe ocorrências na tabela
function exibirOcorrencias(lista = null) {
    const corpoTabela = document.getElementById("corpo-tabela")
    corpoTabela.innerHTML = ""

    const ocorrencias = lista || JSON.parse(localStorage.getItem("ocorrencias")) || []

    ocorrencias.forEach((ocorrencia, index) => {
        const linha = `
            <tr>
                <td>${ocorrencia.aluno}</td>
                <td>${ocorrencia.categoria}</td>
                <td>${ocorrencia.motivo}</td>
                <td>${ocorrencia.data}</td>
                <td>${ocorrencia.responsavel}</td>
                <td>
                <button onclick="editarOcorrencia(${index})" aria-label="Editar ocorrência" style="background-color: #F28705">
                    <img src="imgs/editar.png" alt="Editar" style="width: 18px; height: 18px;">
                </button>
                <button onclick="removerOcorrencia(${index})" aria-label="Remover ocorrência" style="background-color: #ff4444">
                    <img src="imgs/lixo.png" alt="Excluir" style="width: 18px; height: 18px;">
                </button>
                </td>
            </tr>
        `
        corpoTabela.innerHTML += linha
    })
}

// Edita uma ocorrência
function editarOcorrencia(index) {
    const ocorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || []
    const ocorrencia = ocorrencias[index]

    document.getElementById("add-aluno").value = ocorrencia.aluno
    document.getElementById("ocorrencia").value = ocorrencia.categoria
    document.getElementById("descrever-ocorrencia").value = ocorrencia.motivo
    document.getElementById("data-ocorrencia").value = ocorrencia.data
    document.getElementById("responsavel-ocorrencia").value = ocorrencia.responsavel

    mostrarFormulario()
    localStorage.setItem("indiceEditando", index)
}

// Remove uma ocorrência
function removerOcorrencia(index) {
    const ocorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || []
    ocorrencias.splice(index, 1)
    localStorage.setItem("ocorrencias", JSON.stringify(ocorrencias))
    exibirOcorrencias()
}

function filtro(){
    const nomeDigitado = document.getElementById("filtroAluno").value.toLowerCase()
    const todasOcorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || []

    const resultados = todasOcorrencias.filter(ocorrencias =>
        ocorrencias.aluno.toLowerCase().includes(nomeDigitado)
    )
    exibirOcorrencias(resultados)
}
// Inicializa a tabela ao carregar a página
window.onload = () => {
    exibirOcorrencias();
    document.getElementById("filtroAluno").addEventListener("input", filtro);
}
