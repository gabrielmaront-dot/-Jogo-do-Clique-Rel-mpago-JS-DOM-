/**
 * GameEngine.js
 * Motor principal do jogo
 */

class GameEngine {
    constructor() {
        this.isRunning = false;
        this.currentPhase = 0;
        this.score = 0;
        this.phaseScore = 0; // Pontuação da fase atual
        this.timeLeft = 0;
        this.currentBoss = null;
        this.timerInterval = null;
        this.targetSpawnInterval = null;
    }

    /**
     * Inicia o jogo
     */
    async startGame() {
        this.isRunning = true;
        this.currentPhase = 1;
        this.score = 0;
        
        console.log('🎮 Jogo iniciado');
        
        await this.startPhase(this.currentPhase);
    }

    /**
     * Inicia uma fase
     * @param {number} phaseNumber - Número da fase
     */
    async startPhase(phaseNumber) {
        if (!window.phaseManager) {
            console.error('PhaseManager não encontrado');
            return;
        }

        const phaseInfo = await window.phaseManager.startPhase(phaseNumber);
        const phaseConfig = window.phaseManager.getPhaseConfig(phaseNumber);
        
        this.currentPhase = phaseNumber;
        this.timeLeft = phaseConfig.timeLimit;
        
        console.log(`✅ Fase ${phaseNumber} iniciada`);
        
        // Determinar qual boss aparece nesta fase
        const bossId = this.getBossIdForPhase(phaseNumber);
        
        // Mostrar diálogo do boss antes de aparecer
        if (window.storySystem && bossId) {
            await window.storySystem.showBossDialogue(bossId);
        }
        
        // Iniciar lógica da fase
        this.startPhaseLogic(phaseConfig, bossId);
    }

    /**
     * Retorna ID do boss para a fase
     * @param {number} phaseNumber - Número da fase
     * @returns {string} - ID do boss
     */
    getBossIdForPhase(phaseNumber) {
        const bosses = {
            1: 'Boss01_NeonShade',
            2: 'Boss02_Holografx',
            3: 'Boss03_PulseCore',
            4: 'Boss04_StaticGhost',
            5: 'Boss05_NeonCore',
            6: 'Boss06_VineShock',
            7: 'Boss07_LeafBolt',
            8: 'Boss08_RootSpike',
            9: 'Boss09_CanopyArc',
            10: 'Boss10_RootShock',
            11: 'Boss11_FrostSpark',
            12: 'Boss12_IceShard',
            13: 'Boss13_BlizzardCore',
            14: 'Boss14_Permafrost',
            15: 'Boss15_GlacioVolt',
            16: 'Boss16_LavaSpark',
            17: 'Boss17_MagmaBurst',
            18: 'Boss18_AshCloud',
            19: 'Boss19_EruptionCore',
            20: 'Boss20_MagmaFlare',
            21: 'Boss21_DroneAlpha',
            22: 'Boss22_DroneBeta',
            23: 'Boss23_TurretX1',
            24: 'Boss24_OmegaSentry',
            25: 'Boss25_OmegaDrone',
            26: 'Boss26_StormEye',
            27: 'Boss27_LightningKing',
            28: 'Boss28_ThunderLord',
            29: 'Boss29_ChaosCore',
            30: 'Boss30_SupremeStorm'
        };
        
        return bosses[phaseNumber] || null;
    }

    /**
     * Inicia lógica da fase
     * @param {object} phaseConfig - Configuração da fase
     * @param {string} bossId - ID do boss
     */
    startPhaseLogic(phaseConfig, bossId) {
        console.log(`⚡ Iniciando lógica da fase ${this.currentPhase}`);
        
        // Resetar pontuação da fase
        this.phaseScore = 0;
        
        // Mostrar informações da fase
        this.showPhaseInfo(phaseConfig);
        
        // Esconder botão Iniciar
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.style.display = 'none';
        }
        
        // Esconder botão Tentar de novo se existir
        const retryBtn = document.getElementById('retryBtn');
        if (retryBtn) {
            retryBtn.style.display = 'none';
        }
        
        // Mostrar área de jogo
        const gameArea = document.getElementById('gameArea');
        if (gameArea) {
            gameArea.style.display = 'block';
        }
        
        // Mostrar boss (placeholder por enquanto)
        if (bossId) {
            this.showBoss(bossId);
        }
        
        // Iniciar contagem regressiva de 3 segundos
        this.startCountdown(3, () => {
            // Após contagem regressiva, iniciar o jogo
            this.startGameplay(phaseConfig);
        });
    }
    
    /**
     * Inicia contagem regressiva
     * @param {number} seconds - Segundos para contar
     * @param {Function} callback - Função a chamar após contagem
     */
    startCountdown(seconds, callback) {
        const countdownElement = document.getElementById('time-left');
        
        let count = seconds;
        
        // Criar overlay de contagem regressiva
        const countdownOverlay = document.createElement('div');
        countdownOverlay.className = 'countdown-overlay';
        countdownOverlay.innerHTML = `<div class="countdown-number">${count}</div>`;
        document.body.appendChild(countdownOverlay);
        
        const countdownInterval = setInterval(() => {
            count--;
            
            if (count > 0) {
                countdownOverlay.querySelector('.countdown-number').textContent = count;
            } else {
                countdownOverlay.querySelector('.countdown-number').textContent = 'GO!';
                setTimeout(() => {
                    countdownOverlay.remove();
                    if (callback) callback();
                }, 500);
                clearInterval(countdownInterval);
            }
        }, 1000);
    }
    
    /**
     * Inicia o gameplay (após contagem regressiva)
     * @param {object} phaseConfig - Configuração da fase
     */
    startGameplay(phaseConfig) {
        console.log('🎮 Gameplay iniciado!');
        
        // Iniciar timer do jogo
        this.startTimer(phaseConfig.timeLimit);
        
        // Criar apenas UM núcleo inicial
        this.createEnergyCore(phaseConfig);
        
        // Não criar novos núcleos automaticamente - apenas um por vez
        // O núcleo se move após cada clique
    }
    
    /**
     * Mostra informações da fase
     * @param {object} phaseConfig - Configuração da fase
     */
    showPhaseInfo(phaseConfig) {
        const phaseInfo = document.getElementById('phaseInfo');
        const phaseNumber = document.getElementById('phaseNumber');
        const regionName = document.getElementById('regionName');
        const progressText = document.getElementById('progressText');
        
        if (phaseInfo) {
            phaseInfo.classList.remove('hidden');
        }
        
        if (phaseNumber) {
            phaseNumber.textContent = this.currentPhase;
        }
        
        if (regionName && window.phaseManager) {
            const regionNum = Math.ceil(this.currentPhase / 5);
            regionName.textContent = window.phaseManager.getRegionName(regionNum);
        }
        
        // Mostrar meta de pontos
        if (progressText) {
            progressText.textContent = `0 / ${phaseConfig.pointsGoal} pontos`;
        }
        
        // Resetar progresso visual
        this.updatePhaseProgress();
    }
    
    /**
     * Atualiza barra de progresso da fase
     */
    updatePhaseProgress() {
        const phaseConfig = window.phaseManager.getPhaseConfig(this.currentPhase);
        const progressFill = document.getElementById('phaseProgress');
        const progressText = document.getElementById('progressText');
        
        if (!phaseConfig || !progressFill || !progressText) return;
        
        const progress = Math.min(100, (this.phaseScore / phaseConfig.pointsGoal) * 100);
        progressFill.style.width = progress + '%';
        progressText.textContent = `${this.phaseScore} / ${phaseConfig.pointsGoal} pontos`;
        
        // Mudar cor se estiver perto da meta
        if (progress >= 100) {
            progressFill.style.background = '#4ade80';
        } else if (progress >= 75) {
            progressFill.style.background = '#ffd700';
        } else {
            progressFill.style.background = '#667eea';
        }
    }
    
    /**
     * Inicia o timer
     * @param {number} timeLimit - Tempo limite em segundos
     */
    startTimer(timeLimit) {
        this.timeLeft = timeLimit;
        const timeElement = document.getElementById('time-left');
        
        if (!timeElement) return;
        
        // Atualizar display inicial
        timeElement.textContent = this.timeLeft;
        
        // Resetar estilo do timer
        timeElement.style.color = '#ffd700';
        timeElement.style.animation = '';
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            timeElement.textContent = this.timeLeft;
            
            // Mudar cor quando tempo está acabando (mais competitivo)
            if (this.timeLeft <= 5) {
                timeElement.style.color = '#ff6b6b';
                timeElement.style.animation = 'timerUrgent 0.5s ease-in-out infinite';
            } else if (this.timeLeft <= 10) {
                timeElement.style.color = '#ffa500';
            }
            
            if (this.timeLeft <= 0) {
                clearInterval(this.timerInterval);
                this.onPhaseTimeout();
            }
        }, 1000);
    }
    
    /**
     * Inicia spawn de núcleos de energia (não usado mais - apenas um núcleo por vez)
     * @param {object} phaseConfig - Configuração da fase
     */
    startTargetSpawning(phaseConfig) {
        // Sistema de um núcleo por vez - não criar novos automaticamente
        // O núcleo se move após cada clique, mantendo o jogo competitivo
    }
    
    /**
     * Para o spawn de núcleos
     */
    stopTargetSpawning() {
        if (this.targetSpawnInterval) {
            clearInterval(this.targetSpawnInterval);
            this.targetSpawnInterval = null;
        }
        
        // Remover todos os núcleos existentes
        const gameArea = document.getElementById('gameArea');
        if (gameArea) {
            const cores = gameArea.querySelectorAll('.energy-core');
            cores.forEach(core => core.remove());
        }
    }
    
    /**
     * Cria um núcleo de energia pura (KOHR coleta energia para carregar seu poder)
     * @param {object} phaseConfig - Configuração da fase
     */
    createEnergyCore(phaseConfig) {
        const gameArea = document.getElementById('gameArea');
        
        if (!gameArea) {
            console.error('❌ GameArea não encontrado');
            return;
        }
        
        // Aguardar área estar pronta
        setTimeout(() => {
            const areaWidth = gameArea.offsetWidth || gameArea.clientWidth;
            const areaHeight = gameArea.offsetHeight || gameArea.clientHeight;
            const coreSize = 60;
            
            if (areaWidth <= 0 || areaHeight <= 0) {
                console.warn('⚠️ Área de jogo com dimensões inválidas, tentando novamente...');
                setTimeout(() => this.createEnergyCore(phaseConfig), 100);
                return;
            }
            
            const maxX = Math.max(0, areaWidth - coreSize);
            const maxY = Math.max(0, areaHeight - coreSize);
            
            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);
            
            // Criar elemento de núcleo de energia
            const energyCore = document.createElement('div');
            energyCore.className = 'energy-core';
            energyCore.style.left = randomX + 'px';
            energyCore.style.top = randomY + 'px';
            
            // Criar SVG do núcleo de energia (círculo com raio no centro)
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '60');
            svg.setAttribute('height', '60');
            svg.setAttribute('viewBox', '0 0 60 60');
            
            // Círculo externo de energia (aura)
            const outerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            outerCircle.setAttribute('cx', '30');
            outerCircle.setAttribute('cy', '30');
            outerCircle.setAttribute('r', '25');
            outerCircle.setAttribute('fill', 'none');
            outerCircle.setAttribute('stroke', '#ffff00');
            outerCircle.setAttribute('stroke-width', '3');
            outerCircle.setAttribute('opacity', '0.8');
            outerCircle.setAttribute('stroke-dasharray', '4,2');
            outerCircle.setAttribute('class', 'energy-aura');
            svg.appendChild(outerCircle);
            
            // Círculo interno (núcleo)
            const innerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            innerCircle.setAttribute('cx', '30');
            innerCircle.setAttribute('cy', '30');
            innerCircle.setAttribute('r', '15');
            innerCircle.setAttribute('fill', 'none');
            innerCircle.setAttribute('stroke', '#ffd700');
            innerCircle.setAttribute('stroke-width', '2');
            innerCircle.setAttribute('opacity', '1');
            innerCircle.setAttribute('class', 'energy-core-circle');
            svg.appendChild(innerCircle);
            
            // Círculo central sólido
            const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            centerCircle.setAttribute('cx', '30');
            centerCircle.setAttribute('cy', '30');
            centerCircle.setAttribute('r', '8');
            centerCircle.setAttribute('fill', '#ffff00');
            centerCircle.setAttribute('opacity', '0.9');
            centerCircle.setAttribute('class', 'energy-nucleus');
            svg.appendChild(centerCircle);
            
            // Raio no centro (símbolo do Portador do Raio)
            const lightningPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            lightningPath.setAttribute('d', 'M 30 10 L 24 22 L 30 18 L 27 30 L 33 26 L 30 38 L 36 34 L 30 50 L 24 34 L 30 38 L 27 26 L 33 30 L 30 18 L 36 22 Z');
            lightningPath.setAttribute('fill', '#ffffff');
            lightningPath.setAttribute('opacity', '1');
            lightningPath.setAttribute('stroke', '#ffd700');
            lightningPath.setAttribute('stroke-width', '0.5');
            svg.appendChild(lightningPath);
            
            energyCore.appendChild(svg);
            gameArea.appendChild(energyCore);
            
            // Adicionar evento de clique
            energyCore.addEventListener('click', (e) => {
                e.stopPropagation();
                this.collectEnergyCore(energyCore);
            });
            
            // Animação de aparecimento
            setTimeout(() => {
                energyCore.classList.add('appear');
            }, 10);
            
            // Auto-remover após tempo baseado na dificuldade (mais desafiador conforme avança)
            // Fases mais difíceis = menos tempo para coletar
            const baseTimeout = 4000;
            const difficultyTimeout = Math.max(2000, baseTimeout - (this.currentPhase * 50)); // Mínimo 2 segundos
            setTimeout(() => {
                if (energyCore.parentNode && !energyCore.classList.contains('collected')) {
                    energyCore.classList.add('fade-out');
                    setTimeout(() => {
                        if (energyCore.parentNode) {
                            energyCore.remove();
                            // Verificar se ainda há núcleos na tela
                            const gameArea = document.getElementById('gameArea');
                            if (gameArea) {
                                const currentCores = gameArea.querySelectorAll('.energy-core:not(.collected):not(.fade-out)');
                                // Se não há núcleos, criar um novo imediatamente
                                if (currentCores.length === 0) {
                                    const phaseConfig = window.phaseManager.getPhaseConfig(this.currentPhase);
                                    this.createEnergyCore(phaseConfig);
                                }
                            }
                        }
                    }, 300);
                }
            }, difficultyTimeout);
            
            console.log(`⚡ Núcleo de energia criado em (${randomX}, ${randomY})`);
        }, 100);
    }
    
    /**
     * Coleta núcleo de energia (KOHR absorve energia pura)
     * @param {HTMLElement} energyCore - Elemento do núcleo de energia
     */
    collectEnergyCore(energyCore) {
        console.log('⚡ Energia coletada!');
        
        // Pontuação fixa por núcleo coletado
        const points = 10;
        
        this.score += points;
        this.phaseScore += points; // Pontuação da fase atual
        
        // Atualizar progresso visual
        this.updatePhaseProgress();
        
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.textContent = this.score;
            // Animação mais impactante
            scoreElement.style.transform = 'scale(1.3)';
            scoreElement.style.color = '#4ade80';
            setTimeout(() => {
                scoreElement.style.transform = 'scale(1)';
                scoreElement.style.color = ''; // Voltar cor original
            }, 300);
        }
        
        // Mostrar feedback de pontos ganhos
        this.showPointsFeedback(energyCore, points);
        
        // Efeito visual de partículas
        this.createEnergyParticles(energyCore);
        
        // Mover núcleo para nova posição aleatória IMEDIATAMENTE (mais viciante)
        this.moveEnergyCoreToNewPosition(energyCore);
    }
    
    /**
     * Mostra feedback visual de pontos ganhos
     * @param {HTMLElement} energyCore - Elemento do núcleo
     * @param {number} points - Pontos ganhos
     */
    showPointsFeedback(energyCore, points) {
        const rect = energyCore.getBoundingClientRect();
        const gameArea = document.getElementById('gameArea');
        const gameAreaRect = gameArea.getBoundingClientRect();
        
        const centerX = rect.left - gameAreaRect.left + rect.width / 2;
        const centerY = rect.top - gameAreaRect.top + rect.height / 2;
        
        const feedback = document.createElement('div');
        feedback.className = 'points-feedback';
        feedback.textContent = `+${points}`;
        feedback.style.left = centerX + 'px';
        feedback.style.top = centerY + 'px';
        
        gameArea.appendChild(feedback);
        
        // Animação de subida
        setTimeout(() => {
            feedback.style.transform = 'translateY(-50px)';
            feedback.style.opacity = '0';
        }, 10);
        
        // Remover após animação
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.remove();
            }
        }, 1000);
    }
    
    /**
     * Move núcleo de energia para nova posição aleatória
     * @param {HTMLElement} energyCore - Elemento do núcleo
     */
    moveEnergyCoreToNewPosition(energyCore) {
        const gameArea = document.getElementById('gameArea');
        if (!gameArea || !energyCore.parentNode) return;
        
        const areaWidth = gameArea.offsetWidth || gameArea.clientWidth;
        const areaHeight = gameArea.offsetHeight || gameArea.clientHeight;
        const coreSize = 60;
        
        if (areaWidth <= 0 || areaHeight <= 0) return;
        
        const maxX = Math.max(0, areaWidth - coreSize);
        const maxY = Math.max(0, areaHeight - coreSize);
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        // Animação de movimento ULTRA rápida (mais rápida conforme dificuldade aumenta)
        const baseSpeed = 0.1;
        const difficultySpeed = Math.max(0.05, baseSpeed - (this.currentPhase * 0.002)); // Mais rápido em fases avançadas
        energyCore.style.transition = `all ${difficultySpeed}s ease`;
        energyCore.style.transform = 'scale(0.5)';
        energyCore.style.opacity = '0';
        
        setTimeout(() => {
            energyCore.style.left = randomX + 'px';
            energyCore.style.top = randomY + 'px';
            energyCore.style.transform = 'scale(1)';
            energyCore.style.opacity = '1';
        }, 50);
        
        console.log(`⚡ Núcleo movido para (${randomX}, ${randomY})`);
    }
    
    /**
     * Cria partículas de energia ao coletar
     * @param {HTMLElement} energyCore - Elemento do núcleo
     */
    createEnergyParticles(energyCore) {
        const rect = energyCore.getBoundingClientRect();
        const gameArea = document.getElementById('gameArea');
        const gameAreaRect = gameArea.getBoundingClientRect();
        
        const centerX = rect.left - gameAreaRect.left + rect.width / 2;
        const centerY = rect.top - gameAreaRect.top + rect.height / 2;
        
        // Criar 8 partículas
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'energy-particle';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            
            const angle = (Math.PI * 2 * i) / 8;
            const distance = 30;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            gameArea.appendChild(particle);
            
            // Animar partícula
            setTimeout(() => {
                particle.style.left = endX + 'px';
                particle.style.top = endY + 'px';
                particle.style.opacity = '0';
            }, 10);
            
            // Remover partícula
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 500);
        }
    }
    
    /**
     * Mostra o boss
     * @param {string} bossId - ID do boss
     */
    showBoss(bossId) {
        console.log(`👾 Boss apareceu: ${bossId}`);
        // Aqui você implementaria a lógica do boss
        // Por enquanto apenas um log
    }
    
    /**
     * Tempo esgotado
     */
    onPhaseTimeout() {
        console.log('⏰ Tempo esgotado!');
        
        // Parar spawn de núcleos
        this.stopTargetSpawning();
        
        // Parar timer
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        // Remover todos os núcleos restantes com animação
        const gameArea = document.getElementById('gameArea');
        if (gameArea) {
            const cores = gameArea.querySelectorAll('.energy-core');
            cores.forEach(core => {
                core.style.transition = 'all 0.3s ease';
                core.style.opacity = '0';
                core.style.transform = 'scale(0)';
                setTimeout(() => {
                    if (core.parentNode) {
                        core.remove();
                    }
                }, 300);
            });
        }
        
        // Atualizar display do timer
        const timeElement = document.getElementById('time-left');
        if (timeElement) {
            timeElement.textContent = '0';
            timeElement.style.color = '#ff6b6b';
        }
        
        // Verificar se atingiu a meta
        const phaseConfig = window.phaseManager.getPhaseConfig(this.currentPhase);
        const reachedGoal = this.phaseScore >= phaseConfig.pointsGoal;
        
        if (reachedGoal) {
            // Meta atingida - mostrar vitória
            this.showBossVictoryModal(this.currentPhase, this.phaseScore, phaseConfig.pointsGoal).then(() => {
                // Coletar lore do boss derrotado
                const bossId = this.getBossIdForPhase(this.currentPhase);
                if (window.storySystem && bossId) {
                    window.storySystem.collectLore(`boss${this.currentPhase}_defeated`);
                }
                
                // Avançar para próxima fase ou completar jogo
                if (this.currentPhase >= 30) {
                    this.onGameComplete();
                } else {
                    // Pequeno delay antes de próxima fase
                    setTimeout(() => {
                        this.nextPhase();
                    }, 500);
                }
            });
        } else {
            // Meta não atingida - mostrar tela de falha
            this.showPhaseFailureModal(this.currentPhase, this.phaseScore, phaseConfig.pointsGoal);
        }
    }
    
    /**
     * Mostra modal de falha da fase
     * @param {number} phase - Número da fase
     * @param {number} score - Pontuação alcançada
     * @param {number} goal - Meta de pontos
     */
    showPhaseFailureModal(phase, score, goal) {
        const bossId = this.getBossIdForPhase(phase);
        const bossName = window.storySystem && window.storySystem.dialogues[bossId] 
            ? window.storySystem.dialogues[bossId].name 
            : `Boss ${phase}`;
        
        const modal = document.createElement('div');
        modal.className = 'phase-failure-modal';
        modal.innerHTML = `
            <div class="phase-failure-content">
                <div class="phase-failure-title">❌ META NÃO ATINGIDA</div>
                <div class="phase-failure-boss">${bossName} não foi derrotado!</div>
                <div class="phase-failure-scores">
                    <div class="score-line">
                        <span>Pontos Alcançados:</span>
                        <span>${score}</span>
                    </div>
                    <div class="score-line">
                        <span>Meta Necessária:</span>
                        <span>${goal}</span>
                    </div>
                    <div class="score-line missing">
                        <span>Faltaram:</span>
                        <span>${goal - score} pontos</span>
                    </div>
                </div>
                <div class="phase-failure-buttons">
                    <button class="phase-failure-btn retry" id="retryPhaseBtn">🔄 Tentar de Novo</button>
                    <button class="phase-failure-btn cancel" id="cancelPhaseBtn">Sair</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Botão Tentar de Novo
        const retryBtn = document.getElementById('retryPhaseBtn');
        retryBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
                // Reiniciar a fase
                this.startPhase(this.currentPhase);
            }, 300);
        });
        
        // Botão Sair
        const cancelBtn = document.getElementById('cancelPhaseBtn');
        cancelBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
                // Mostrar botão Iniciar novamente
                const startBtn = document.getElementById('startBtn');
                if (startBtn) {
                    startBtn.style.display = 'block';
                }
                // Esconder área de jogo
                const gameArea = document.getElementById('gameArea');
                if (gameArea) {
                    gameArea.style.display = 'none';
                }
                // Resetar fase
                this.resetPhase();
            }, 300);
        });
        
        const handleEnter = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                retryBtn.click();
                document.removeEventListener('keydown', handleEnter);
            }
        };
        document.addEventListener('keydown', handleEnter);
    }
    
    /**
     * Mostra modal de vitória do boss
     * @param {number} phase - Número da fase
     * @param {number} score - Pontuação final
     * @param {number} goal - Meta de pontos
     * @returns {Promise} - Resolve quando o jogador fecha o modal
     */
    showBossVictoryModal(phase, score, goal) {
        const bossId = this.getBossIdForPhase(phase);
        const bossName = window.storySystem && window.storySystem.dialogues[bossId] 
            ? window.storySystem.dialogues[bossId].name 
            : `Boss ${phase}`;
        
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.className = 'boss-victory-modal';
            modal.innerHTML = `
                <div class="boss-victory-content">
                    <div class="boss-victory-title">⚡ VITÓRIA! ⚡</div>
                    <div class="boss-victory-boss">${bossName} DERROTADO!</div>
                    <div class="boss-victory-scores">
                        <div class="score-line">
                            <span>Pontuação Alcançada:</span>
                            <span>${score}</span>
                        </div>
                        <div class="score-line">
                            <span>Meta:</span>
                            <span>${goal}</span>
                        </div>
                        <div class="score-line total">
                            <span>Status:</span>
                            <span>✅ META ATINGIDA!</span>
                        </div>
                    </div>
                    <button class="boss-victory-btn" id="bossVictoryContinueBtn">Continuar</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            const continueBtn = document.getElementById('bossVictoryContinueBtn');
            continueBtn.addEventListener('click', () => {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.remove();
                    resolve();
                }, 300);
            });
            
            const handleEnter = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    continueBtn.click();
                    document.removeEventListener('keydown', handleEnter);
                }
            };
            document.addEventListener('keydown', handleEnter);
        });
    }
    
    /**
     * Reseta a fase
     */
    resetPhase() {
        this.stopTargetSpawning();
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        // Resetar pontuação da fase
        this.phaseScore = 0;
        
        // Limpeza de elementos visuais
        
        // Resetar cor do score
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.style.color = '';
        }
    }

    /**
     * Completa o jogo
     */
    async onGameComplete() {
        this.isRunning = false;
        
        console.log('🏆 Jogo completado!');
        
        // Coletar lore de conclusão
        if (window.storySystem) {
            window.storySystem.collectLore('game_complete');
        }
        
        // Aqui você mostraria a tela de vitória
        alert(`Parabéns! Você completou o jogo com ${this.score} pontos!`);
    }

    /**
     * Avança para próxima fase
     */
    async nextPhase() {
        // Resetar fase anterior
        this.resetPhase();
        
        if (this.currentPhase >= 30) {
            await this.onGameComplete();
            return;
        }
        
        this.currentPhase++;
        await this.startPhase(this.currentPhase);
    }
}

// Exportar instância global
window.gameEngine = new GameEngine();

