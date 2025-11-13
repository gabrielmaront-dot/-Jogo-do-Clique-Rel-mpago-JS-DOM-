// Elementos do DOM
const startBtn = document.getElementById('startBtn');
const timerElement = document.getElementById('time-left');
const scoreElement = document.getElementById('score');
const target = document.getElementById('target');
const gameArea = document.getElementById('gameArea');
const gameOver = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');
const playerModal = document.getElementById('playerModal');
const playerNameInput = document.getElementById('playerNameInput');
const savePlayerBtn = document.getElementById('savePlayerBtn');
const currentPlayerElement = document.getElementById('currentPlayer');
const viewRankingBtn = document.getElementById('viewRankingBtn');
const rankingModal = document.getElementById('rankingModal');
const closeRankingBtn = document.getElementById('closeRankingBtn');
const closeRankingBtn2 = document.getElementById('closeRankingBtn2');
const restartFromRankingBtn = document.getElementById('restartFromRankingBtn');
const rankingList = document.getElementById('rankingList');
const rankingLoading = document.getElementById('rankingLoading');
const playerPosition = document.getElementById('playerPosition');
const savingScore = document.getElementById('savingScore');
const scoreSaved = document.getElementById('scoreSaved');
const personalRecordElement = document.getElementById('personalRecord');
const levelBadge = document.getElementById('levelBadge');
const levelDescription = document.getElementById('levelDescription');
const targetScoreElement = document.getElementById('targetScore');
const newRecord = document.getElementById('newRecord');
const levelUp = document.getElementById('levelUp');
const achievement = document.getElementById('achievement');
const finalRecord = document.getElementById('finalRecord');
const finalLevel = document.getElementById('finalLevel');

// Variáveis do jogo
let timeLeft = 10;
let score = 0;
let gameInterval = null;
let timerInterval = null;
let gameActive = false;
let playerName = localStorage.getItem('playerName') || '';
let personalRecord = parseInt(localStorage.getItem('personalRecord')) || 0;
let currentLevel = parseInt(localStorage.getItem('currentLevel')) || 1;

// Sistema de níveis
const LEVELS = [
    { level: 1, name: 'Iniciante', minScore: 0, target: 10, color: '#6b7280' },
    { level: 2, name: 'Novato', minScore: 10, target: 20, color: '#4ade80' },
    { level: 3, name: 'Aprendiz', minScore: 20, target: 35, color: '#22c55e' },
    { level: 4, name: 'Intermediário', minScore: 35, target: 50, color: '#3b82f6' },
    { level: 5, name: 'Avançado', minScore: 50, target: 70, color: '#8b5cf6' },
    { level: 6, name: 'Expert', minScore: 70, target: 100, color: '#f59e0b' },
    { level: 7, name: 'Mestre', minScore: 100, target: 150, color: '#ef4444' },
    { level: 8, name: 'Lendário', minScore: 150, target: 200, color: '#ec4899' },
    { level: 9, name: 'Épico', minScore: 200, target: 300, color: '#f97316' },
    { level: 10, name: 'LENDÁRIO SUPREMO', minScore: 300, target: 500, color: '#ffd700' }
];

// Função para calcular nível baseado no recorde
function calculateLevel(record) {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
        if (record >= LEVELS[i].minScore) {
            return LEVELS[i];
        }
    }
    return LEVELS[0];
}

// Atualizar display de nível e recorde
function updateLevelDisplay() {
    const levelData = calculateLevel(personalRecord);
    currentLevel = levelData.level;
    
    levelBadge.textContent = `Nível ${currentLevel}`;
    levelBadge.style.background = `linear-gradient(135deg, ${levelData.color} 0%, ${levelData.color}dd 100%)`;
    levelDescription.textContent = levelData.name;
    targetScoreElement.textContent = levelData.target;
    personalRecordElement.textContent = personalRecord;
    
    // Salvar no localStorage
    localStorage.setItem('currentLevel', currentLevel);
    localStorage.setItem('personalRecord', personalRecord);
}

// Verificar conquistas
function checkAchievements(finalScore) {
    const achievements = [];
    
    if (finalScore >= 50) achievements.push('🎯 Atirador Preciso');
    if (finalScore >= 100) achievements.push('🔥 Incrível!');
    if (finalScore >= 150) achievements.push('⚡ Relâmpago!');
    if (finalScore >= 200) achievements.push('👑 Lendário!');
    if (finalScore >= 300) achievements.push('🌟 SUPREMO!');
    
    return achievements;
}

// Verificar se o jogador já está identificado
if (!playerName) {
    playerModal.classList.remove('hidden');
} else {
    currentPlayerElement.textContent = playerName;
    playerModal.classList.add('hidden');
}

// Inicializar display de nível e recorde
updateLevelDisplay();

// Função para iniciar o jogo
function startGame() {
    // Resetar variáveis
    timeLeft = 10;
    score = 0;
    gameActive = true;
    
    // Atualizar UI
    startBtn.disabled = true;
    startBtn.textContent = 'Jogando...';
    gameOver.classList.add('hidden');
    scoreElement.textContent = score;
    timerElement.textContent = timeLeft;
    timerElement.classList.remove('warning');
    
    // Mostrar o alvo
    target.style.display = 'flex';
    
    // Posicionar o alvo inicialmente
    moveTarget();
    
    // Iniciar cronômetro
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        // Aviso visual quando restam 3 segundos
        if (timeLeft <= 3) {
            timerElement.classList.add('warning');
        }
        
        // Fim do jogo
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// Função para mover o alvo para posição aleatória
function moveTarget() {
    if (!gameActive) return;
    
    // Aguardar um frame para garantir que as dimensões estejam atualizadas
    requestAnimationFrame(() => {
        const areaWidth = gameArea.offsetWidth;
        const areaHeight = gameArea.offsetHeight;
        
        // Tamanho do alvo responsivo
        const targetSize = window.innerWidth <= 768 ? 60 : 80;
        
        // Garantir que temos dimensões válidas
        if (areaWidth <= 0 || areaHeight <= 0) {
            console.warn('Área de jogo com dimensões inválidas, tentando novamente...');
            setTimeout(moveTarget, 100);
            return;
        }
        
        // Calcular posição aleatória garantindo que o alvo fique dentro da área
        const maxX = Math.max(0, areaWidth - targetSize);
        const maxY = Math.max(0, areaHeight - targetSize);
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        target.style.left = randomX + 'px';
        target.style.top = randomY + 'px';
    });
}

// Função para aumentar pontuação
function increaseScore() {
    if (!gameActive) return;
    
    score++;
    scoreElement.textContent = score;
    
    // Mover alvo para nova posição
    moveTarget();
    
    // Efeito visual no alvo
    target.style.transform = 'scale(1.2)';
    setTimeout(() => {
        target.style.transform = 'scale(1)';
    }, 100);
}

// Função para finalizar o jogo
async function endGame() {
    gameActive = false;
    
    // Parar intervalos
    clearInterval(timerInterval);
    
    // Atualizar UI
    startBtn.disabled = false;
    startBtn.textContent = 'Iniciar';
    timerElement.textContent = 0;
    timerElement.classList.remove('warning');
    
    // Verificar recorde pessoal
    const oldRecord = personalRecord;
    const oldLevel = currentLevel;
    let isNewRecord = false;
    let leveledUp = false;
    
    if (score > personalRecord) {
        personalRecord = score;
        isNewRecord = true;
        updateLevelDisplay();
    }
    
    const newLevelData = calculateLevel(personalRecord);
    if (newLevelData.level > oldLevel) {
        leveledUp = true;
    }
    
    // Verificar conquistas
    const achievements = checkAchievements(score);
    
    // Mostrar mensagens especiais
    newRecord.classList.add('hidden');
    levelUp.classList.add('hidden');
    achievement.classList.add('hidden');
    
    if (isNewRecord) {
        newRecord.classList.remove('hidden');
    }
    
    if (leveledUp) {
        levelUp.classList.remove('hidden');
    }
    
    if (achievements.length > 0) {
        achievement.textContent = achievements.join(' | ');
        achievement.classList.remove('hidden');
    }
    
    // Atualizar estatísticas finais
    finalRecord.textContent = personalRecord;
    finalLevel.textContent = currentLevel;
    
    // Mostrar tela de fim de jogo
    finalScoreElement.textContent = score;
    gameOver.classList.remove('hidden');
    
    // Esconder o alvo
    target.style.display = 'none';
    
    // Salvar pontuação no ranking
    if (playerName && score > 0) {
        await saveScoreToRanking(playerName, score);
    }
}

// Função para reiniciar o jogo
function restartGame() {
    console.log('🔄 Reiniciando jogo...');
    
    // Fechar modais abertos
    if (rankingModal && !rankingModal.classList.contains('hidden')) {
        closeRankingModal();
    }
    
    // Resetar variáveis
    score = 0;
    timeLeft = 10;
    gameActive = false;
    
    // Parar qualquer intervalo ativo
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    }
    
    // Atualizar UI
    scoreElement.textContent = score;
    timerElement.textContent = timeLeft;
    if (gameOver) gameOver.classList.add('hidden');
    
    // Esconder mensagens especiais
    if (newRecord) newRecord.classList.add('hidden');
    if (levelUp) levelUp.classList.add('hidden');
    if (achievement) achievement.classList.add('hidden');
    if (savingScore) savingScore.classList.add('hidden');
    if (scoreSaved) scoreSaved.classList.add('hidden');
    
    // Resetar botão
    if (startBtn) {
        startBtn.disabled = false;
        startBtn.textContent = 'Iniciar';
    }
    
    // Esconder alvo
    if (target) {
        target.style.display = 'none';
    }
    
    // Atualizar display de nível
    updateLevelDisplay();
    
    console.log('✅ Jogo resetado, pronto para iniciar');
}

// ========== FUNÇÕES DO SUPABASE ==========

// Salvar pontuação no ranking
async function saveScoreToRanking(name, playerScore) {
    try {
        savingScore.classList.remove('hidden');
        scoreSaved.classList.add('hidden');
        
        // Verificar se o Supabase foi inicializado
        if (!supabase && window.supabaseClient) {
            supabase = window.supabaseClient;
        }
        
        if (!supabase) {
            console.error('Supabase não foi inicializado');
            savingScore.textContent = 'Erro: Supabase não inicializado';
            savingScore.style.color = '#ff6b6b';
            return;
        }
        
        console.log('Salvando pontuação:', name, playerScore);
        
        const { data, error } = await supabase
            .from('ranking')
            .insert([
                {
                    player_name: name,
                    score: playerScore
                }
            ]);
        
        if (error) {
            console.error('❌ Erro ao salvar pontuação:', error);
            savingScore.textContent = `Erro: ${error.message || 'Erro ao salvar pontuação'}`;
            savingScore.style.color = '#ff6b6b';
        } else {
            console.log('✅ Pontuação salva com sucesso!');
            savingScore.classList.add('hidden');
            scoreSaved.classList.remove('hidden');
        }
    } catch (err) {
        console.error('❌ Erro ao salvar pontuação:', err);
        savingScore.textContent = `Erro: ${err.message || 'Erro desconhecido'}`;
        savingScore.style.color = '#ff6b6b';
    }
}

// Buscar ranking do Supabase
async function fetchRanking() {
    console.log('🔄 ========== INICIANDO fetchRanking() ==========');
    
    try {
        // Verificar elementos DOM
        if (!rankingLoading || !rankingList) {
            console.error('❌ Elementos DOM não encontrados!');
            return;
        }
        
        // Preparar UI
        rankingLoading.classList.remove('hidden');
        rankingLoading.textContent = 'Carregando ranking...';
        rankingLoading.style.color = '';
        rankingList.innerHTML = '';
        if (playerPosition) playerPosition.classList.add('hidden');
        
        // Verificar Supabase
        if (!supabase) {
            console.error('❌ Supabase não disponível na função fetchRanking');
            rankingLoading.textContent = 'Erro: Supabase não disponível';
            rankingLoading.style.color = '#ff6b6b';
            return;
        }
        
        console.log('✅ Supabase verificado, iniciando query...');
        console.log('Supabase URL:', supabase.supabaseUrl);
        console.log('Método from:', typeof supabase.from);
        
        // Executar query
        console.log('📡 Executando: supabase.from("ranking").select("*")...');
        const queryResult = supabase
            .from('ranking')
            .select('*')
            .order('score', { ascending: false })
            .limit(20);
        
        console.log('Query criada, aguardando resposta...');
        const { data, error } = await queryResult;
        
        console.log('📥 ========== RESPOSTA RECEBIDA ==========');
        console.log('Data recebida:', data);
        console.log('Error recebido:', error);
        console.log('Data é array?', Array.isArray(data));
        console.log('Data length:', data ? data.length : 'null/undefined');
        
        // Tratar erro
        if (error) {
            console.error('❌ ERRO DO SUPABASE:');
            console.error('Código:', error.code);
            console.error('Mensagem:', error.message);
            console.error('Detalhes:', error.details);
            console.error('Hint:', error.hint);
            console.error('Objeto completo:', error);
            
            let errorMsg = error.message || 'Erro ao carregar ranking';
            if (error.code === 'PGRST116') {
                errorMsg = 'Tabela "ranking" não encontrada. Execute os scripts SQL no Supabase.';
            } else if (error.code === '42501') {
                errorMsg = 'Permissão negada. Verifique as políticas RLS no Supabase.';
            }
            
            rankingLoading.textContent = `Erro: ${errorMsg}`;
            rankingLoading.style.color = '#ff6b6b';
            return;
        }
        
        // Esconder loading
        rankingLoading.classList.add('hidden');
        console.log('✅ Loading escondido');
        
        // Processar dados
        if (data && Array.isArray(data) && data.length > 0) {
            console.log(`✅ Exibindo ${data.length} registros`);
            displayRanking(data);
            findPlayerPosition(data);
        } else {
            console.log('ℹ️ Nenhum dado encontrado');
            rankingList.innerHTML = '<p style="text-align: center; padding: 20px; opacity: 0.7;">Nenhuma pontuação ainda. Seja o primeiro!</p>';
        }
        
        console.log('✅ ========== fetchRanking() CONCLUÍDO ==========');
        
    } catch (err) {
        console.error('❌ ========== ERRO CRÍTICO EM fetchRanking() ==========');
        console.error('Erro:', err);
        console.error('Mensagem:', err.message);
        console.error('Stack:', err.stack);
        console.error('Tipo:', err.constructor.name);
        
        if (rankingLoading) {
            rankingLoading.textContent = `Erro: ${err.message || 'Erro desconhecido'}`;
            rankingLoading.style.color = '#ff6b6b';
        }
    }
}

// Exibir ranking na tela
function displayRanking(rankingData) {
    console.log('🎨 Iniciando exibição do ranking...');
    console.log('Dados recebidos:', rankingData);
    console.log('Elemento rankingList:', rankingList);
    
    if (!rankingList) {
        console.error('❌ Elemento rankingList não encontrado!');
        return;
    }
    
    rankingList.innerHTML = '';
    console.log('Lista limpa, adicionando', rankingData.length, 'itens...');
    
    rankingData.forEach((entry, index) => {
        console.log(`Processando item ${index + 1}:`, entry);
        const position = index + 1;
        const item = document.createElement('div');
        item.className = 'ranking-item';
        
        // Adicionar classes especiais para top 3
        if (position === 1) item.classList.add('top-1');
        if (position === 2) item.classList.add('top-2');
        if (position === 3) item.classList.add('top-3');
        
        // Formatar data
        const date = new Date(entry.created_at);
        const formattedDate = date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        item.innerHTML = `
            <div class="ranking-position">${position}º</div>
            <div class="ranking-name">
                ${entry.player_name}
                <span class="ranking-date">${formattedDate}</span>
            </div>
            <div class="ranking-score">${entry.score}</div>
        `;
        
        rankingList.appendChild(item);
        console.log(`Item ${index + 1} adicionado ao DOM`);
    });
    
    console.log('✅ Ranking exibido com sucesso! Total de itens:', rankingList.children.length);
}

// Encontrar e exibir posição do jogador atual
function findPlayerPosition(rankingData) {
    if (!playerName) return;
    
    // Buscar todas as pontuações do jogador
    const playerScores = rankingData.filter(entry => entry.player_name === playerName);
    
    if (playerScores.length > 0) {
        const bestScore = playerScores[0].score;
        const position = rankingData.findIndex(entry => entry.player_name === playerName) + 1;
        
        playerPosition.classList.remove('hidden');
        playerPosition.innerHTML = `
            <h3>🎯 Sua Posição</h3>
            <p><strong>${playerName}</strong> está em <strong>${position}º lugar</strong> com <strong>${bestScore} pontos</strong></p>
        `;
    }
}

// ========== GERENCIAMENTO DE MODAIS ==========

// Salvar nome do jogador
savePlayerBtn.addEventListener('click', () => {
    const name = playerNameInput.value.trim();
    
    if (name.length < 3) {
        alert('Por favor, digite um nome com pelo menos 3 caracteres');
        return;
    }
    
    playerName = name;
    localStorage.setItem('playerName', name);
    currentPlayerElement.textContent = name;
    playerModal.classList.add('hidden');
});

// Permitir Enter no input
playerNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        savePlayerBtn.click();
    }
});

// Abrir modal de ranking
viewRankingBtn.addEventListener('click', async () => {
    console.log('🏆 ========== BOTÃO RANKING CLICADO ==========');
    
    try {
        // Abrir modal primeiro
        rankingModal.classList.remove('hidden');
        console.log('✅ Modal de ranking aberto');
        
        // Verificar elementos DOM
        if (!rankingLoading) {
            console.error('❌ rankingLoading não encontrado!');
            return;
        }
        if (!rankingList) {
            console.error('❌ rankingList não encontrado!');
            return;
        }
        console.log('✅ Elementos DOM encontrados');
        
        // Garantir que o supabase está disponível
        if (!supabase) {
            console.log('⚠️ Supabase local não encontrado, tentando window.supabaseClient...');
            if (window.supabaseClient) {
                supabase = window.supabaseClient;
                console.log('✅ Supabase recuperado de window.supabaseClient');
            } else {
                console.error('❌ Supabase não disponível em nenhum lugar!');
                rankingLoading.textContent = 'Erro: Supabase não inicializado. Recarregue a página.';
                rankingLoading.style.color = '#ff6b6b';
                return;
            }
        }
        
        console.log('✅ Supabase disponível:', !!supabase);
        console.log('Tipo do supabase:', typeof supabase);
        console.log('Método from disponível?', typeof supabase.from === 'function');
        
        // Chamar fetchRanking de forma assíncrona
        console.log('🔄 Chamando fetchRanking()...');
        await fetchRanking();
        console.log('✅ fetchRanking() concluído');
        
    } catch (error) {
        console.error('❌ ERRO CRÍTICO ao abrir ranking:', error);
        console.error('Stack:', error.stack);
        if (rankingLoading) {
            rankingLoading.textContent = `Erro crítico: ${error.message || 'Erro desconhecido'}`;
            rankingLoading.style.color = '#ff6b6b';
        }
    }
});

// Função para fechar o modal de ranking
function closeRankingModal() {
    console.log('🔒 Fechando modal de ranking...');
    rankingModal.classList.add('hidden');
    // Limpar conteúdo ao fechar
    if (rankingList) rankingList.innerHTML = '';
    if (rankingLoading) {
        rankingLoading.classList.remove('hidden');
        rankingLoading.textContent = 'Carregando ranking...';
        rankingLoading.style.color = '';
    }
    if (playerPosition) playerPosition.classList.add('hidden');
    console.log('✅ Modal de ranking fechado');
}

// Fechar modal de ranking - botão X
if (closeRankingBtn) {
    closeRankingBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeRankingModal();
    });
}

// Fechar modal de ranking - botão "Fechar Ranking"
if (closeRankingBtn2) {
    closeRankingBtn2.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeRankingModal();
    });
}

// Reiniciar jogo a partir do ranking
if (restartFromRankingBtn) {
    restartFromRankingBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('🔄 Reiniciando jogo a partir do ranking...');
        closeRankingModal();
        // Fechar tela de fim de jogo se estiver aberta
        if (gameOver) gameOver.classList.add('hidden');
        // Reiniciar o jogo
        restartGame();
    });
}

// Fechar modal ao clicar fora
if (rankingModal) {
    rankingModal.addEventListener('click', (e) => {
        if (e.target === rankingModal) {
            closeRankingModal();
        }
    });
}

// Fechar modal com tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && rankingModal && !rankingModal.classList.contains('hidden')) {
        closeRankingModal();
    }
});

// ========== EVENT LISTENERS DO JOGO ==========

// Event Listeners
startBtn.addEventListener('click', startGame);
target.addEventListener('click', increaseScore);
restartBtn.addEventListener('click', restartGame);

// Prevenir que o alvo seja clicado quando o jogo não está ativo
target.addEventListener('click', (e) => {
    if (!gameActive) {
        e.preventDefault();
    }
});

// Ajustar responsividade ao redimensionar a janela
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Se o jogo estiver ativo, reposicionar o alvo se necessário
        if (gameActive && target.style.display !== 'none') {
            const areaWidth = gameArea.offsetWidth;
            const areaHeight = gameArea.offsetHeight;
            const currentLeft = parseInt(target.style.left) || 0;
            const currentTop = parseInt(target.style.top) || 0;
            const targetSize = window.innerWidth <= 768 ? 60 : 80;
            
            // Verificar se o alvo está fora da área visível
            if (currentLeft + targetSize > areaWidth || currentTop + targetSize > areaHeight) {
                moveTarget();
            }
        }
    }, 250);
});

