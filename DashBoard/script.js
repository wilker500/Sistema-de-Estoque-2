document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("productForm").addEventListener("submit", function(event) {
        event.preventDefault();

        // Captura dos valores dos campos do formulário
        const productName = document.getElementById("productName").value;
        let productPrice = parseFloat(document.getElementById("productPrice").value);
        const productQuantity = parseInt(document.getElementById("productQuantity").value);
        let productDate = document.getElementById("productDate").value;

        // Verificação para evitar campos vazios ou valores inválidos
        if (!productName || isNaN(productPrice) || isNaN(productQuantity) || !productDate) {
            alert("Por favor, preencha corretamente todos os campos!");
            return;
        }

        // Converte a data para o formato brasileiro (DD/MM/AAAA)
        let dateObj = new Date(productDate);
        let formattedDate = dateObj.toLocaleDateString("pt-BR", { timeZone: "UTC" });

        // Garante que o preço tenha duas casas decimais
        productPrice = parseFloat(productPrice.toFixed(2));
        let totalValue = (productQuantity * productPrice).toFixed(2); // Opcional: para cálculos futuros

        // Armazena o produto no localStorage para uso na tela de relatório
        let products = JSON.parse(localStorage.getItem("products")) || [];
        products.push({ 
            name: productName, 
            price: productPrice, 
            quantity: productQuantity, 
            date: formattedDate 
        });
        localStorage.setItem("products", JSON.stringify(products));

        // Exibe o popup de confirmação
       alert("Produto cadastrado!");

        // Limpa os campos do formulário após o cadastro
        document.getElementById("productForm").reset();
    });

    // Botão de logout
    document.getElementById("logoutBtn").addEventListener("click", function() {
        alert("Sessão encerrada!");
        window.location.href = "..//Login/login.html"; // Se login.html estiver na pasta Login
   
    });

    // Botão de acesso ao relatório com caminho ajustado
    document.getElementById("reportBtn").addEventListener("click", function() {
        window.location.href = "..//Relatorio/report.html"; //Redirecionada para Dashboard.html       
    });
});
