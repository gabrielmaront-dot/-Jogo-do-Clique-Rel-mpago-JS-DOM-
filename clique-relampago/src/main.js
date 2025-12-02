/**
 * main.js
 * Ponto de entrada principal do jogo
 */

// Aguardar DOM carregar completamente
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    // DOM já carregado
    initGame();
}

function initGame() {
    console.log('✅ DOM carregado, inicializando jogo...');
    
    // Aguardar um pouco para garantir que todos os scripts carregaram
    setTimeout(() => {
        // Verificar se já tem nome salvo
        const savedName = localStorage.getItem('playerName');
        
        if (!savedName || savedName.trim() === '') {
            // Mostrar modal de entrada de nome
            showPlayerNameModal();
        } else {
            // Usar nome salvo
            initializeGame(savedName);
        }
    }, 100);
}

/**
 * Mostra modal para entrada de nome do jogador
 */
function showPlayerNameModal() {
    // Remover modal existente se houver
    const existingModal = document.querySelector('.player-name-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'player-name-modal';
    modal.innerHTML = `
        <div class="player-name-content">
            <div class="player-name-title">⚡ Bem-vindo ao Clique Relâmpago ⚡</div>
            <div class="player-name-text">Digite seu nome para começar sua jornada:</div>
            <input type="text" id="playerNameInput" class="player-name-input" placeholder="Seu nome aqui..." maxlength="20" autofocus>
            <div class="player-name-feedback" id="playerNameFeedback"></div>
            <button id="playerNameSubmitBtn" class="player-name-btn">🚀 Começar Jornada</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Mostrar animação
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    const input = document.getElementById('playerNameInput');
    const submitBtn = document.getElementById('playerNameSubmitBtn');
    const feedback = document.getElementById('playerNameFeedback');
    
    // Focar no input
    setTimeout(() => {
        if (input) {
            input.focus();
        }
    }, 200);
    
    // Validação em tempo real
    input.addEventListener('input', () => {
        const name = input.value.trim();
        if (name.length > 0) {
            input.style.borderColor = '#4ade80';
            feedback.textContent = '';
        } else {
            input.style.borderColor = '#667eea';
            feedback.textContent = '';
        }
    });
    
    // Submeter ao clicar no botão
    submitBtn.addEventListener('click', () => {
        const name = input.value.trim();
        if (name && name.length >= 2) {
            localStorage.setItem('playerName', name);
            feedback.textContent = '✅ Nome salvo!';
            feedback.style.color = '#4ade80';
            
            // Animação de sucesso
            modal.classList.add('success');
            
            setTimeout(() => {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.remove();
                    initializeGame(name);
                }, 300);
            }, 500);
        } else {
            input.style.borderColor = '#ff6b6b';
            input.style.animation = 'shake 0.5s ease';
            feedback.textContent = '❌ Digite pelo menos 2 caracteres!';
            feedback.style.color = '#ff6b6b';
            
            setTimeout(() => {
                input.style.animation = '';
            }, 500);
        }
    });
    
    // Submeter ao pressionar Enter
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });
}

/**
 * Inicializa o jogo com o nome do jogador
 * @param {string} playerName - Nome do jogador
 */
function initializeGame(playerName) {
    // Elementos do DOM
    const startBtn = document.getElementById('startBtn');
    const currentPlayer = document.getElementById('currentPlayer');
    
    // Verificar se elementos existem
    if (!startBtn) {
        console.error('❌ Botão startBtn não encontrado!');
        // Tentar novamente após um delay
        setTimeout(() => initializeGame(playerName), 200);
        return;
    }
    
    // Atualizar nome do jogador com animação
    if (currentPlayer) {
        currentPlayer.textContent = playerName;
        currentPlayer.style.animation = 'fadeInScale 0.5s ease';
    }
    
    // Adicionar botão para alterar nome
    addChangeNameButton();
    
    // Event listener do botão Iniciar
    startBtn.addEventListener('click', async () => {
        console.log('🎮 Botão Iniciar clicado');
        
        if (window.gameEngine) {
            await window.gameEngine.startGame();
        } else {
            console.error('❌ GameEngine não encontrado!');
        }
    });
    
    console.log('✅ Jogo inicializado e pronto!');
}

/**
 * Adiciona botão para alterar nome do jogador
 */
function addChangeNameButton() {
    // Verificar se já existe
    if (document.getElementById('changeNameBtn')) {
        return;
    }
    
    const playerInfo = document.querySelector('.player-info');
    if (!playerInfo) return;
    
    const changeBtn = document.createElement('button');
    changeBtn.id = 'changeNameBtn';
    changeBtn.className = 'change-name-btn';
    changeBtn.innerHTML = '✏️';
    changeBtn.title = 'Alterar nome';
    
    changeBtn.addEventListener('click', () => {
        // Limpar nome salvo
        localStorage.removeItem('playerName');
        // Mostrar modal novamente
        showPlayerNameModal();
    });
    
    playerInfo.appendChild(changeBtn);
}

