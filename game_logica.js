// Lógica Principal do Jogo Estilo Archero com Colisão
let jogador = {
    x: 200,
    y: 400,
    largura: 32,
    altura: 32,
    velocidade: 3,
    sprite: "heroi_arqueiro.png"
};

let inimigo = {
    x: 200,
    y: 100,
    largura: 32,
    altura: 32,
    velocidade: 1,
    vivo: true,
    sprite: "inimigo_slime.png"
};

let projeteis = [];

function dispararFlecha() {
    projeteis.push({
        x: jogador.x + 8,
        y: jogador.y,
        largura: 8,
        altura: 16,
        velocidadeY: -6,
        sprite: "projetil_flecha.png"
    });
}

// Função de colisão AABB (caixas delimitadoras)
function verificarColisao(obj1, obj2) {
    return (
        obj1.x < obj2.x + obj2.largura &&
        obj1.x + obj1.largura > obj2.x &&
        obj1.y < obj2.y + obj2.altura &&
        obj1.y + obj1.altura > obj2.y
    );
}

function atualizarJogo() {
    // Movimentação do Inimigo em direção ao Jogador
    if (inimigo.vivo) {
        if (inimigo.x < jogador.x) inimigo.x += inimigo.velocidade;
        if (inimigo.x > jogador.x) inimigo.x -= inimigo.velocidade;
        if (inimigo.y < jogador.y) inimigo.y += inimigo.velocidade;
        if (inimigo.y > jogador.y) inimigo.y -= inimigo.velocidade;
    }

    // Atualizar posição das flechas e verificar colisão com o inimigo
    for (let i = projeteis.length - 1; i >= 0; i--) {
        projeteis[i].y += projeteis[i].velocidadeY;
        
        // Verificar colisão com o slime
        if (inimigo.vivo && verificarColisao(projeteis[i], inimigo)) {
            inimigo.vivo = false; // O slime é eliminado
            projeteis.splice(i, 1); // Remove a flecha
            break;
        }
        
        // Remove a flecha se sair do ecrã
        if (projeteis[i] && projeteis[i].y < 0) {
            projeteis.splice(i, 1);
        }
    }
}
