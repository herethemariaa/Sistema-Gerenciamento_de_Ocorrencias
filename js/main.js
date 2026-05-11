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
let ocorrencias = JSON.parse(localStorage.getItem('ocorrencias')) || [];

function mostrarFormulario() {
    document.getElementById('modal').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('form-ocorrencia').reset();
}

function adicionarOcorrencia() {
    const aluno = document.getElementById('add-aluno').value.trim();
    const categoria = document.getElementById('ocorrencia').value;
    const motivo = document.getElementById('descrever-ocorrencia').value.trim();
    const data = document.getElementById('data-ocorrencia').value;
    const responsavel = document.getElementById('responsavel-ocorrencia').value.trim();

    if (!aluno || !categoria || !motivo || !data || !responsavel) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const novaOcorrencia = { aluno, categoria, motivo, data, responsavel };
    ocorrencias.push(novaOcorrencia);
    localStorage.setItem('ocorrencias', JSON.stringify(ocorrencias));

    fecharModal();
    renderizarTabela();
    atualizarEstatisticas();
}

// renderiza a tabela
function renderizarTabela(filtrados = ocorrencias) {
    const corpoTabela = document.getElementById('corpo-tabela');
    corpoTabela.innerHTML = '';

    if (filtrados.length === 0) {
        corpoTabela.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #999; padding: 40px;">Nenhuma ocorrência registrada</td></tr>';
        return;
    }

    filtrados.forEach((ocorrencia, index) => {
        const dataFormatada = new Date(ocorrencia.data).toLocaleDateString('pt-BR');
        const badgeClasse = `badge badge-${ocorrencia.categoria}`;
        const categoriaNome = {
            'ausencia': 'Ausência',
            'comportamento': 'Comportamento',
            'celular': 'Celular'
        }[ocorrencia.categoria];

        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td><strong>${ocorrencia.aluno}</strong></td>
            <td><span class="${badgeClasse}">${categoriaNome}</span></td>
            <td>${ocorrencia.motivo}</td>
            <td>${dataFormatada}</td>
            <td>${ocorrencia.responsavel}</td>
            <td>
                <div class="acoes-cell">
                    <button onclick="deletarOcorrencia(${index})" title="Deletar">🗑️</button>
                </div>
            </td>
        `;
        corpoTabela.appendChild(linha);
    });
}

// deleta ocorrência
function deletarOcorrencia(index) {
    if (confirm('Tem certeza que deseja deletar esta ocorrência?')) {
        ocorrencias.splice(index, 1);
        localStorage.setItem('ocorrencias', JSON.stringify(ocorrencias));
        renderizarTabela();
        atualizarEstatisticas();
    }
}

// filtra ocorrências
function filtro() {
    const filtroAluno = document.getElementById('filtroAluno').value.toLowerCase();
    const filtrados = ocorrencias.filter(ocorrencia => {
        return (
            ocorrencia.aluno.toLowerCase().includes(filtroAluno) ||
            ocorrencia.categoria.toLowerCase().includes(filtroAluno) ||
            ocorrencia.responsavel.toLowerCase().includes(filtroAluno) ||
            ocorrencia.motivo.toLowerCase().includes(filtroAluno)
        );
    });
    renderizarTabela(filtrados);
}

// atualiza estatísticas
function atualizarEstatisticas() {
    const totalOcorrencias = ocorrencias.length;
    const totalAusencias = ocorrencias.filter(o => o.categoria === 'ausencia').length;
    const totalComportamento = ocorrencias.filter(o => o.categoria === 'comportamento').length;
    const totalCelular = ocorrencias.filter(o => o.categoria === 'celular').length;

    document.getElementById('total-ocorrencias').textContent = totalOcorrencias;
    document.getElementById('total-ausencias').textContent = totalAusencias;
    document.getElementById('total-comportamento').textContent = totalComportamento;
    document.getElementById('total-celular').textContent = totalCelular;
}

// fecha modal ao clicar fora dele
window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        fecharModal();
    }
});

window.addEventListener('DOMContentLoaded', () => {
    renderizarTabela();
    atualizarEstatisticas();
});