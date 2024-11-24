// Obter o modal
var modal = document.getElementById("modal-tradicional");

// Obter o botão de fechar (X)
var span = document.getElementsByClassName("close")[0];

// Quando o usuário clicar no item "Tradicional", exibe o modal
document.getElementById("tradicional-item").onclick = function() {
    modal.style.display = "block";
}

// Quando o usuário clicar no botão de fechar (X), fecha o modal
span.onclick = function() {
    modal.style.display = "none";
}

// Quando o usuário clicar fora do modal, também fecha
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
