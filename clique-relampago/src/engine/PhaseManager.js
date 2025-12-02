/**
 * PhaseManager.js
 * Gerencia fases e regiões do jogo
 */

class PhaseManager {
    constructor() {
        this.currentPhase = 0;
        this.currentRegion = 0;
        this.totalPhases = 30;
        this.phasesPerRegion = 5;
    }

    /**
     * Inicia uma nova fase
     * @param {number} phaseNumber - Número da fase (1-30)
     */
    async startPhase(phaseNumber) {
        this.currentPhase = phaseNumber;
        const regionNumber = Math.ceil(phaseNumber / this.phasesPerRegion);
        const previousPhase = phaseNumber - 1;
        const previousRegion = previousPhase > 0 ? Math.ceil(previousPhase / this.phasesPerRegion) : 0;
        const isNewRegion = regionNumber !== previousRegion;
        
        // Mostrar cutscene se for nova região
        if (window.storySystem && isNewRegion) {
            await window.storySystem.showRegionCutscene(regionNumber);
            window.storySystem.collectLore(`region${regionNumber}_complete`);
        }
        
        this.currentRegion = regionNumber;
        
        console.log(`✅ Fase ${phaseNumber} iniciada - Região ${regionNumber}`);
        
        return {
            phase: phaseNumber,
            region: regionNumber,
            isNewRegion: isNewRegion
        };
    }

    /**
     * Retorna configuração da fase
     * @param {number} phaseNumber - Número da fase
     * @returns {object} - Configuração da fase
     */
    getPhaseConfig(phaseNumber) {
        const regionNumber = Math.ceil(phaseNumber / this.phasesPerRegion);
        
        // Sistema de dificuldade progressiva e desafiador
        // Tempo diminui conforme avança (mais difícil)
        const baseTime = 15;
        const timeLimit = Math.max(8, baseTime - (phaseNumber * 0.5)); // Mínimo 8 segundos
        
        // Meta de pontos aumenta progressivamente (mais difícil)
        const basePoints = 50;
        const pointsGoal = basePoints + (phaseNumber * 15); // Meta aumenta 15 pontos por fase
        
        return {
            phase: phaseNumber,
            region: regionNumber,
            timeLimit: Math.floor(timeLimit),
            pointsGoal: pointsGoal,
            targetCount: 10 + (phaseNumber * 2),
            targetSpeed: 1.0 + (phaseNumber * 0.1),
            targetSize: 80,
            specialChance: Math.min(0.3, 0.1 + (phaseNumber * 0.01))
        };
    }

    /**
     * Retorna nome da região
     * @param {number} regionNumber - Número da região
     * @returns {string} - Nome da região
     */
    getRegionName(regionNumber) {
        const regions = {
            1: 'Cidade Eclipse',
            2: 'Selva Estática',
            3: 'Tundra Polarizada',
            4: 'Vulcão Tesla',
            5: 'Fábrica Omega',
            6: 'Olho da Tempestade'
        };
        return regions[regionNumber] || 'Desconhecida';
    }
}

// Exportar instância global
window.phaseManager = new PhaseManager();

