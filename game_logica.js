// Lógica do Jogo - Estilo Archero (Versão Expandida)

// 1. Configuração do Jogador
let jogador = {
    x: 200,
    y: 400,
    largura: 32,
    altura: 32,
    velocidade: 3,
    hpMax: 100,
    hpAtual: 100,
    dano: 25,
    sprite: "heroi_arqueiro.png"
};

// 2. Lista de Inimigos (Suporta múltiplos monstros)
let inimigos = [];

function criarInimigo(tipo, x, y) {
    let hp = tipo === "boss" ? 200 : 50;
    let vel = tipo === "boss" ? 0.8 : 1.2;
    let spriteImg = tipo === "boss" ? "inimigo_demonio_chefe.png" : "inimigo_slime.png";

    inimigos.push({
        x: x,
        y: y,
        largura: 32,
        altura: 32,
        velocidade: vel,
        hpMax: hp,
        hpAtual: hp,
        dano: 10,
        tipo: tipo,
        sprite: spriteImg
    });
}

// Criar uma vaga inicial de teste
criarInimigo("slime", 100, 50);
criarInimigo("slime", 300, 50);

// 3. Sistema de Projéteis
let projeteis = [];

function dispararFlecha() {
    projeteis.push({
        x: jogador.x + 12,
        y: jogador.y,
        largura: 8,
        altura: 16,
        velocidadeY: -7,
        dano: jogador.dano,
        sprite: "projetil_flecha.png"
    });
}

// 4. Detecção de Colisão AABB
function verificarColisao(obj1, obj2) {
    return (
        obj1.x < obj2.x + obj2.largura &&
        obj1.x + obj1.largura > obj2.x &&
        obj1.y < obj2.y + obj2.altura &&
        obj1.y + obj1.altura > obj2.y
    );
}

// 5. Loop do Jogo
function atualizarJogo() {
    // Atualizar Inimigos
    for (let i = inimigos.length - 1; i >= 0; i--) {
        let monstro = inimigos[i];

        // Perseguição
        if (monstro.x < jogador.x) monstro.x += monstro.velocidade;
        if (monstro.x > jogador.x) monstro.x -= monstro.velocidade;
        if (monstro.y < jogador.y) monstro.y += monstro.velocidade;
        if (monstro.y > jogador.y) monstro.y -= monstro.velocidade;

        // Dano no Jogador (se encostar)
        if (verificarColisao(monstro, jogador)) {
            jogador.hpAtual -= 0.5; // Dano contínuo ao tocar
            if (jogador.hpAtual <= 0) {
                console.log("Game Over!");
            }
        }
    }

    // Atualizar Projéteis e Causar Dano
    for (let p = projeteis.length - 1; p >= 0; p--) {
        let f = projeteis[p];
        f.y += f.velocidadeY;

        let flechaRemovida = false;

        for (let i = inimigos.length - 1; i >= 0; i--) {
            let monstro = inimigos[i];

            if (verificarColisao(f, monstro)) {
                monstro.hpAtual -= f.dano;

                // Se o monstro morrer
                if (monstro.hpAtual <= 0) {
                    inimigos.splice(i, 1);
                }

                projeteis.splice(p, 1);
                flechaRemovida = true;
                break;
            }
        }

        // Remover flechas que saem da tela
        if (!flechaRemovida && f.y < 0) {
            projeteis.splice(p, 1);
        }
    }
}
