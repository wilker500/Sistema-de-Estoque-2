document.addEventListener("DOMContentLoaded", function() {
    // Obtém a referência do <tbody> da tabela para que as linhas sejam inseridas nele
    const productTableBody = document.getElementById("productTable").querySelector("tbody");
    // Carrega os produtos do localStorage, ou inicia com array vazio se não houver dados
    let products = JSON.parse(localStorage.getItem("products")) || [];

    function renderProducts() {
        // Sempre atualiza os dados lendo do localStorage
        products = JSON.parse(localStorage.getItem("products")) || [];
        productTableBody.innerHTML = "";
        let totalStock = 0;

        products.forEach((product, index) => {
            // Calcula o valor total para o produto e acumula no total geral
            const totalValue = (product.price * product.quantity).toFixed(2);
            totalStock += parseFloat(totalValue);

            // Cria uma linha para o produto
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>R$${Number(product.price).toFixed(2)}</td>
                <td>R$${totalValue}</td>
                <td>${product.date}</td>
                <td>
                    <button class="edit-btn" data-index="${index}">Editar</button>
                    <button class="delete-btn" data-index="${index}">Excluir</button>
                </td>
            `;
            productTableBody.appendChild(row);
        });
        document.getElementById("totalStockValue").textContent = `Valor total do estoque: R$${totalStock.toFixed(2)}`;

        // Após renderizar as linhas, associa os eventos de clique aos botões de edição e exclusão
        attachEvents();
    }

    function attachEvents() {
        // Botões de exclusão
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function() {
                const index = this.getAttribute("data-index");
                confirmDelete(index);
            });
        });

        // Botões de edição
        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", function() {
                const index = this.getAttribute("data-index");
                editProduct(index);
            });
        });
    }

    function confirmDelete(index) {
        if (confirm("Tem certeza que deseja excluir este produto?")) {
            products.splice(index, 1);
            localStorage.setItem("products", JSON.stringify(products));
            renderProducts();
        }
    }

    function editProduct(index) {
        const product = products[index];

        // Solicita ao usuário novos valores usando os atuais como padrão
        let newName = prompt("Editar Nome do Produto:", product.name);
        if (newName === null || newName.trim() === "") return;

        let newPrice = prompt("Editar Preço Unitário:", product.price);
        if (newPrice === null || isNaN(newPrice)) return;

        let newQuantity = prompt("Editar Quantidade:", product.quantity);
        if (newQuantity === null || isNaN(newQuantity)) return;

        let newDate = prompt("Editar Data de Cadastro (DD/MM/AAAA):", product.date);
        if (newDate === null || newDate.trim() === "") return;

        // Atualiza os dados do produto
        product.name = newName.trim();
        product.price = parseFloat(parseFloat(newPrice).toFixed(2));
        product.quantity = parseInt(newQuantity);
        product.date = newDate.trim();

        products[index] = product;
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts();
    }

    // Renderiza os produtos na inicialização
    renderProducts();

    // Evento para exportar a tabela para PDF
    document.getElementById("exportPDF").addEventListener("click", function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("Relatório de Produtos", 14, 16);
        // Usa o plugin autoTable para transformar a tabela HTML em tabela de PDF
        doc.autoTable({ html: '#productTable', startY: 20 });
        doc.save("relatorio_produtos.pdf");
    });

    // Evento para exportar a tabela para Excel
    document.getElementById("exportExcel").addEventListener("click", function() {
        const table = document.getElementById("productTable");
        const workbook = XLSX.utils.table_to_book(table, { sheet: "Produtos" });
        XLSX.writeFile(workbook, "relatorio_produtos.xlsx");
    });
});

// Função para voltar ao Dashboard (caso seja chamada por um botão)
function goToDashboard() {
    window.location.href = "..//Dashboard/dashboard.html";
}
