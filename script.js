document.addEventListener("DOMContentLoaded", () => {
    
    const categorias = ["lanches", "xburguers", "bebidas"]; 

    
    categorias.forEach(categoria => {
        
        fetch(`assets/${categoria}.json`)
            .then(response => response.json())
            .then(data => {
            
                const itens = data[categoria]; 
                
                const menuContainer = document.getElementById(`${categoria}-menu-container`);
                if (!menuContainer) {
                    console.error(`Container para a categoria ${categoria} não encontrado.`);
                    return;
                }

                itens.forEach(item => {
                    const itemDiv = document.createElement("div");
                    itemDiv.className = "menu-item";

                    
                    let itemHTML = `
                        <h3>${item.nome}</h3>
                        <p>Ingredientes: ${item.descricao}</p>
                        <p class="price">${item.preco}</p>
                    `;

                    
                    if (categoria === 'bebidas') {
                        
                        itemHTML = `
                            <h3>${item.nome}</h3>
                            <p class="price">${item.preco}</p>
                        `;
                    }

                   
                    itemDiv.innerHTML = itemHTML;

                    
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

                            <a href="https://wa.me/5544997163853
"
                               target="_blank" class="whatsapp-button">
                                Faça o pedido no WhatsApp
                            </a>
                        `;

                    
                        const modalTitle = modalContent.querySelector("h2");
                        modalTitle.style.color = "#bf4342"; 
                        modalTitle.style.fontSize = "1.5em";

                       
                        const ingredientes = modalContent.querySelector(".ingredientes");
                        const aviso = modalContent.querySelector(".aviso");
                        const acrescimos = modalContent.querySelector(".acrescimos");
                        ingredientes.style.fontSize = "17px"; 
                        aviso.style.fontSize = "17px"; 
                        acrescimos.style.fontSize = "17px"; 

                        if (categoria === 'bebidas') {
                            ingredientes.style.display = 'none';  
                            acrescimos.style.display = 'none';   
                        }

                        document.getElementById("modal").style.display = "block";
                    });

                    menuContainer.appendChild(itemDiv);
                });
            })
            .catch(error => console.error("Erro ao carregar o JSON:", error));
    });

    document.querySelector(".modal").addEventListener("click", (event) => {
        if (event.target === document.querySelector(".modal")) {
            document.getElementById("modal").style.display = "none";
        }
    });
});
