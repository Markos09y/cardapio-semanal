/**
 * Database de receitas com base nos critérios de Dieta e Objetivo.
 */
const database = [
    // CAFÉ DA MANHÃ
    { nome: "Smoothie de Frutas Vermelhas", tipo: "cafe", dieta: "vegetariana", objetivo: "saudavel" },
    { nome: "Ovos de Ouro (Cúrcuma e Ervas)", tipo: "cafe", dieta: "low-carb", objetivo: "ganho-massa" },
    { nome: "Tapioca de Queijo e Tomate", tipo: "cafe", dieta: "vegetariana", objetivo: "saudavel" },
    { nome: "Panqueca de Banana Fit", tipo: "cafe", dieta: "vegetariana", objetivo: "perder-peso" },
    { nome: "Iogurte com Granola e Mel", tipo: "cafe", dieta: "vegetariana", objetivo: "saudavel" },
    { nome: "Omelete de Espinafre", tipo: "cafe", dieta: "low-carb", objetivo: "perder-peso" },
    { nome: "Bowl de Açaí com Whey", tipo: "cafe", dieta: "ganho-massa", objetivo: "ganho-massa" },

    // ALMOÇO
    { nome: "Frango Grelhado com Salada Verde", tipo: "almoco", dieta: "low-carb", objetivo: "perder-peso" },
    { nome: "Salmão ao Forno com Brócolis", tipo: "almoco", dieta: "low-carb", objetivo: "saudavel" },
    { nome: "Risoto de Cogumelos", tipo: "almoco", dieta: "vegetariana", objetivo: "saudavel" },
    { nome: "Lasanha de Abobrinha", tipo: "almoco", dieta: "low-carb", objetivo: "perder-peso" },
    { nome: "Bowl de Grão-de-bico e Quinoa", tipo: "almoco", dieta: "vegetariana", objetivo: "ganho-massa" },
    { nome: "Picadinho de Carne com Batata Doce", tipo: "almoco", dieta: "ganho-massa", objetivo: "ganho-massa" },
    { nome: "Moqueca de Palmito", tipo: "almoco", dieta: "vegetariana", objetivo: "saudavel" },
    
    // JANTAR
    { nome: "Sopa de Ervilha Detox", tipo: "jantar", dieta: "vegetariana", objetivo: "perder-peso" },
    { nome: "Filé de Tilápia com Purê de Couve-flor", tipo: "jantar", dieta: "low-carb", objetivo: "perder-peso" },
    { nome: "Macarrão Integral ao Pesto", tipo: "jantar", dieta: "vegetariana", objetivo: "ganho-massa" },
    { nome: "Wrap de Atum Light", tipo: "jantar", dieta: "saudavel", objetivo: "perder-peso" },
    { nome: "Estrogonofe de Cogumelos", tipo: "jantar", dieta: "vegetariana", objetivo: "saudavel" },
    { nome: "Cuscuz Marroquino com Vegetais", tipo: "jantar", dieta: "vegetariana", objetivo: "saudavel" },
    { nome: "Torta de Frango com Aveia", tipo: "jantar", dieta: "ganho-massa", objetivo: "ganho-massa" }
];

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const menuGrid = document.getElementById('menu-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Controle dos botões de filtro (Single selection por grupo)
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.parentElement;
            group.querySelector('.active').classList.remove('active');
            btn.classList.add('active');
        });
    });

    generateBtn.addEventListener('click', () => {
        const filters = {
            dieta: document.querySelector('.dieta-group .active').dataset.value,
            objetivo: document.querySelector('.objetivo-group .active').dataset.value,
            refeicoes: Array.from(document.querySelectorAll('input[name="refeicao"]:checked')).map(cb => cb.value)
        };

        generateMenu(filters);
    });

    /**
     * Função principal para filtrar e exibir o menu.
     * @param {Object} filters - Critérios escolhidos pelo usuário.
     */
    function generateMenu(filters) {
        menuGrid.innerHTML = ''; // Limpa o grid
        const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

        diasSemana.forEach(dia => {
            const column = document.createElement('div');
            column.className = 'day-column';
            
            // Header do dia
            const header = document.createElement('div');
            header.className = 'day-header';
            header.innerText = dia;
            column.appendChild(header);

            // Filtragem das receitas por tipo de refeição
            filters.refeicoes.forEach(tipo => {
                const filteredRecipes = database.filter(recipe => {
                    // Lógica do Filtro:
                    // 1. Deve ser o tipo correto (café, almoço ou jantar)
                    // 2. Se o filtro de dieta for 'todas', aceita qualquer uma. Senão, deve bater.
                    // 3. Se o filtro de objetivo for 'todos', aceita qualquer um. Senão, deve bater.
                    const matchTipo = recipe.tipo === tipo;
                    const matchDieta = filters.dieta === 'todas' || recipe.dieta === filters.dieta;
                    const matchObjetivo = filters.objetivo === 'todos' || recipe.objetivo === filters.objetivo;
                    
                    return matchTipo && matchDieta && matchObjetivo;
                });

                // Seleção Aleatória: Se encontrou receitas, pega uma aleatória da lista filtrada.
                // Se não encontrou (filtro muito restrito), pega uma aleatória do mesmo tipo na base toda.
                let selectedRecipe;
                if (filteredRecipes.length > 0) {
                    selectedRecipe = filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)];
                } else {
                    const fallbackRecipes = database.filter(r => r.tipo === tipo);
                    selectedRecipe = fallbackRecipes[Math.floor(Math.random() * fallbackRecipes.length)];
                }

                // Criação do card da refeição
                const card = document.createElement('div');
                card.className = 'meal-card';
                card.innerHTML = `
                    <span class="meal-type">${getMealLabel(tipo)}</span>
                    <p class="meal-name">${selectedRecipe.nome}</p>
                `;
                column.appendChild(card);
            });

            menuGrid.appendChild(column);
        });
    }

    function getMealLabel(type) {
        const labels = {
            'cafe': '☕ Café da Manhã',
            'almoco': '🍛 Almoço',
            'jantar': '🥗 Jantar'
        };
        return labels[type] || type;
    }
});
