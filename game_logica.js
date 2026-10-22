// Lógica Principal do Jogo Estilo Archero
// Assets utilizados do repositório: heroi_arqueiro.png, projetil_flecha.png, inimigo_slime.png

// 1. Definição do Jogador
let jogador = {
    x: 200,
    y: 400,
    largura: 32,
    altura: 32,
    velocidade: 3,
    sprite: "heroi_arqueiro.png"
};

// 2. Definição do Inimigo (Slime)
let inimigo = {
    x: 200,
    y: 100,
    largura: 32,
    altura: 32,
    velocidade: 1,
    sprite: "inimigo_slime.png"
};

// 3. Sistema de Projéteis (Flechas)
let projeteis = [];

function dispararFlecha() {
    // Cria uma flecha na posição do jogador disparada para cima (estilo Archero ao parar)
    projeteis.push({
        x: jogador.x + 8,
        y: jogador.y,
        velocidadeY: -6,
        sprite: "projetil_flecha.png"
    });
}

// 4. Ciclo de Atualização do Jogo (Game Loop)
function atualizarJogo() {
    // Movimentação do Inimigo em direção ao Jogador (Perseguição Básica)
    if (inimigo.x < jogador.x) inimigo.x += inimigo.velocidade;
    if (inimigo.x > jogador.x) inimigo.x -= inimigo.velocidade;
    if (inimigo.y < jogador.y) inimigo.y += inimigo.velocidade;
    if (inimigo.y > jogador.y) inimigo.y -= inimigo.velocidade;

    // Atualizar posição das flechas
    for (let i = projeteis.length - 1; i >= 0; i--) {
        projeteis[i].y += projeteis[i].velocidadeY;
        
        // Remove a flecha se sair do ecrã
        if (projeteis[i].y < 0) {
            projeteis.splice(i, 1);
        }
    }
}
