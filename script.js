document.addEventListener("DOMContentLoaded", () => {
    const menuContainer = document.getElementById("menu-container");

    // Carregar o JSON da pasta
    fetch('assets/lanches.json')
        .then(response => response.json())
        .then(data => {
            // Iterar sobre os lanches e criar elementos
            data.lanches.forEach(lanche => {
                const lancheDiv = document.createElement("div");
                lancheDiv.className = "menu-item";
                
                lancheDiv.innerHTML = `
                    <h3>${lanche.nome}</h3>
                    <p>Ingredientes: ${lanche.descricao}</p>
                    <p class="price">${lanche.preco}</p>
                `;

                // Adicionar evento de clique para abrir o modal
                lancheDiv.addEventListener("click", () => {
                    const modalContent = document.querySelector(".modal-content");
                    modalContent.innerHTML = `
                        <h2>${lanche.nome}</h2>
                        <br>
                        <p class="ingredientes">Ingredientes: ${lanche.descricao}</p>
                        
                        <p class="acrescimos"><strong>Acréscimos disponíveis:</strong><br>
                            Bacon - R$ 6,00<br>
                            Calabresa - R$ 5,00<br>
                            Frango - R$ 5,00<br>
                            Carne Moída - R$ 5,00<br>
                            Ovos - R$ 2,50<br>
                            Cheddar - R$ 5,00<br>
                            Catupiry - R$ 5,00<br>
                            Hambúrguer - R$ 5,00<br>
                            Porção de Cebola - R$ 3,50<br>
                        </p>
                        <br>
                        <p class="price">${lanche.preco}</p>
                        
                        <p class="aviso">Aviso, não fazemos entrega.</p>
                        
                        <a href="https://wa.me/5511998765432?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido."
                           target="_blank" class="whatsapp-button">
                            Faça o pedido no WhatsApp
                        </a>
                    `;

                    // Alterar a cor do h2 para #bf4342
                    const modalTitle = modalContent.querySelector("h2");
                    modalTitle.style.color = "#bf4342"; // Define a cor dinâmica do título
                    modalTitle.style.fontSize = "1.5em"; // Aumenta a fonte do título

                    // Aumentar o tamanho da fonte dos "Ingredientes", "Acréscimos" e "Aviso"
                    const ingredientes = modalContent.querySelector(".ingredientes");
                    const aviso = modalContent.querySelector(".aviso");
                    const acrescimos = modalContent.querySelector(".acrescimos");
                    ingredientes.style.fontSize = "17px"; // Aumenta o tamanho da fonte para os ingredientes
                    aviso.style.fontSize = "17px"; // Aumenta o tamanho da fonte para o aviso
                    acrescimos.style.fontSize = "17px"; // Aumenta o tamanho da fonte para os acréscimos

                    // Exibir o modal
                    document.getElementById("modal").style.display = "block";
                });

                menuContainer.appendChild(lancheDiv);
            });
        })
        .catch(error => console.error("Erro ao carregar o JSON:", error));

    // Fechar o modal quando clicar fora dele
    document.querySelector(".modal").addEventListener("click", (event) => {
        if (event.target === document.querySelector(".modal")) {
            document.getElementById("modal").style.display = "none";
        }
    });
});
