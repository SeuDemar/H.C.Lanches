document.addEventListener("DOMContentLoaded", () => {
    // Defina as categorias
    const categorias = ["lanches", "xburguers", "bebidas"]; // Exemplos de categorias

    // Loop para carregar as categorias
    categorias.forEach(categoria => {
        // Carregar o JSON da pasta
        fetch(`assets/${categoria}.json`)
            .then(response => response.json())
            .then(data => {
                // A estrutura do JSON pode ser diferente dependendo da categoria
                const itens = data[categoria]; // Acessa a chave pelo nome da categoria
                
                // Obtém o container correspondente à categoria
                const menuContainer = document.getElementById(`${categoria}-menu-container`);
                if (!menuContainer) {
                    console.error(`Container para a categoria ${categoria} não encontrado.`);
                    return;
                }

                // Iterar sobre os itens e criar elementos
                itens.forEach(item => {
                    const itemDiv = document.createElement("div");
                    itemDiv.className = "menu-item";

                    // Criar conteúdo do item
                    let itemHTML = `
                        <h3>${item.nome}</h3>
                        <p>Ingredientes: ${item.descricao}</p>
                        <p class="price">${item.preco}</p>
                    `;

                    // Se a categoria for "bebidas", ocultar ingredientes e acréscimos
                    if (categoria === 'bebidas') {
                        // Ocultar ingredientes e acréscimos para bebidas
                        itemHTML = `
                            <h3>${item.nome}</h3>
                            <p class="price">${item.preco}</p>
                        `;
                    }

                    // Inserir o HTML do item no container
                    itemDiv.innerHTML = itemHTML;

                    // Adicionar evento de clique para abrir o modal
                    itemDiv.addEventListener("click", () => {
                        const modalContent = document.querySelector(".modal-content");
                        modalContent.innerHTML = `
                            <h2>${item.nome}</h2>
                            <br>
                            <p class="ingredientes">Ingredientes: ${item.descricao}</p>

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
                            <p class="price">${item.preco}</p>

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

                        // Verificar se a categoria é 'bebidas' e ocultar ingredientes e acréscimos no modal
                        if (categoria === 'bebidas') {
                            ingredientes.style.display = 'none';  // Esconde os ingredientes no modal
                            acrescimos.style.display = 'none';   // Esconde os acréscimos no modal
                        }

                        // Exibir o modal
                        document.getElementById("modal").style.display = "block";
                    });

                    menuContainer.appendChild(itemDiv);
                });
            })
            .catch(error => console.error("Erro ao carregar o JSON:", error));
    });

    // Fechar o modal quando clicar fora dele
    document.querySelector(".modal").addEventListener("click", (event) => {
        if (event.target === document.querySelector(".modal")) {
            document.getElementById("modal").style.display = "none";
        }
    });
});
