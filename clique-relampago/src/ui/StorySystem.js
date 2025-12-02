/**
 * StorySystem.js
 * Sistema completo de narrativa: cutscenes, diálogos, lore e história
 */

class StorySystem {
    constructor() {
        // Cutscenes entre regiões
        this.cutscenes = {
            1: {
                title: "CIDADE ECLIPSE",
                text: `A primeira cidade a cair sob a corrupção da Tempestade Suprema. 
                Onde antes havia luzes neon brilhantes e vida pulsante, agora há apenas 
                sombra e estática. Os guardiões urbanos foram os primeiros a sucumbir 
                à corrupção energética. KOHR, você deve purificar esta região e restaurar 
                a energia pura que uma vez alimentou esta cidade.`
            },
            2: {
                title: "SELVA ESTÁTICA",
                text: `A natureza foi corrompida pela Tempestade. Árvores que antes geravam 
                energia limpa agora emitem descargas elétricas mortais. A vida selvagem foi 
                transformada em monstros energéticos. Os guardiões da selva se tornaram 
                entidades de energia selvagem. Continue sua jornada, Portador do Raio.`
            },
            3: {
                title: "TUNDRA POLARIZADA",
                text: `O gelo eterno foi eletrificado pela corrupção. Tempestades de neve 
                elétrica varrem a paisagem congelada. Os guardiões do gelo se tornaram 
                cristais de energia congelada, presos em um estado entre vida e morte. 
                A energia aqui é fria e letal.`
            },
            4: {
                title: "VULCÃO TESLA",
                text: `As profundezas da terra foram forçadas a liberar energia pura, 
                criando vulcões de plasma elétrico. Os guardiões do fogo se fundiram 
                com a lava elétrica, tornando-se entidades de pura energia destrutiva. 
                O calor aqui é insuportável, mas você deve continuar.`
            },
            5: {
                title: "FÁBRICA OMEGA",
                text: `A última tentativa desesperada da humanidade: uma fábrica automatizada 
                que tentou combater a corrupção, mas foi infectada pela própria Tempestade. 
                Os guardiões mecânicos agora servem à Tempestade Suprema. Máquinas que 
                deveriam proteger agora destroem.`
            },
            6: {
                title: "OLHO DA TEMPESTADE",
                text: `O epicentro da corrupção. O coração da Tempestade Suprema. Aqui, 
                no centro de toda a destruição, você enfrentará os guardiões mais poderosos 
                e finalmente a própria entidade que corrompeu todo o planeta. Esta é a 
                batalha final, KOHR. O destino do mundo está em suas mãos.`
            }
        };

        // Diálogos dos bosses
        this.dialogues = {
            'Boss01_NeonShade': {
                name: 'NEON-SHADE',
                text: `"As luzes da cidade... elas eram minhas. Agora são apenas sombras 
                corrompidas. Você não pode restaurar o que foi perdido, Portador do Raio."`
            },
            'Boss02_Holografx': {
                name: 'HOLOGRAFX',
                text: `"Eu era a ilusão perfeita, a beleza da tecnologia. Agora sou apenas 
                um reflexo distorcido da corrupção. Você não pode me salvar, KOHR."`
            },
            'Boss03_PulseCore': {
                name: 'PULSE-CORE',
                text: `"Eu pulsava com a vida da cidade. Agora pulso apenas com a raiva 
                da Tempestade. Prepare-se para sentir minha fúria!"`
            },
            'Boss04_StaticGhost': {
                name: 'STATIC-GHOST',
                text: `"Eu sou o eco do que foi. Um fantasma de energia preso entre 
                mundos. Você não pode me libertar, apenas me destruir."`
            },
            'Boss05_NeonCore': {
                name: 'NEON-CORE',
                text: `"Eu era o coração da cidade. Agora sou apenas um núcleo vazio 
                de corrupção. Esta será sua última batalha, Portador do Raio!"`
            },
            'Boss06_VineShock': {
                name: 'VINE-SHOCK',
                text: `"A selva era minha casa. Agora sou parte dela, corrompida e 
                selvagem. A natureza não perdoa, KOHR."`
            },
            'Boss07_LeafBolt': {
                name: 'LEAF-BOLT',
                text: `"Cada folha que caía gerava vida. Agora cada folha gera morte. 
                A corrupção se espalha como fogo na floresta."`
            },
            'Boss08_RootSpike': {
                name: 'ROOT-SPIKE',
                text: `"Minhas raízes penetram as profundezas da terra. A corrupção 
                flui através delas. Você não pode me arrancar, Portador do Raio."`
            },
            'Boss09_CanopyArc': {
                name: 'CANOPY-ARC',
                text: `"Eu protegia o dossel da selva. Agora o dossel me protege da 
                luz. Prepare-se para a escuridão!"`
            },
            'Boss10_RootShock': {
                name: 'ROOT-SHOCK',
                text: `"A selva inteira está conectada através de minhas raízes. 
                Quando você me atacar, toda a selva sentirá. Esta é minha última 
                defesa, KOHR!"`
            },
            'Boss11_FrostSpark': {
                name: 'FROST-SPARK',
                text: `"O gelo eterno me preservou. Agora me aprisiona. Sou frio 
                como a morte, Portador do Raio."`
            },
            'Boss12_IceShard': {
                name: 'ICE-SHARD',
                text: `"Cada fragmento de gelo é uma faca afiada. A corrupção me 
                tornou uma tempestade de lâminas. Você não sobreviverá!"`
            },
            'Boss13_BlizzardCore': {
                name: 'BLIZZARD-CORE',
                text: `"Eu sou a tempestade de neve eterna. O vento gelado carrega 
                minha corrupção. Nada pode me parar!"`
            },
            'Boss14_Permafrost': {
                name: 'PERMAFROST',
                text: `"Estou congelado há milênios. A corrupção me libertou, mas 
                não me aqueceu. Você sentirá o frio da morte!"`
            },
            'Boss15_GlacioVolt': {
                name: 'GLACIO-VOLT',
                text: `"O gelo e o raio se fundiram em mim. Sou a tempestade 
                polarizada. Esta é minha última batalha, KOHR!"`
            },
            'Boss16_LavaSpark': {
                name: 'LAVA-SPARK',
                text: `"A lava flui através de minhas veias. A corrupção me transformou 
                em fogo puro. Você será queimado, Portador do Raio!"`
            },
            'Boss17_MagmaBurst': {
                name: 'MAGMA-BURST',
                text: `"Eu explodo com a fúria da terra. Cada erupção carrega minha 
                corrupção. Prepare-se para a erupção final!"`
            },
            'Boss18_AshCloud': {
                name: 'ASH-CLOUD',
                text: `"As cinzas da destruição me cobrem. Sou a névoa da morte. 
                Você não pode me ver, mas eu posso te destruir!"`
            },
            'Boss19_EruptionCore': {
                name: 'ERUPTION-CORE',
                text: `"Eu sou o núcleo do vulcão. A pressão da corrupção me faz 
                explodir. Esta será uma erupção épica, KOHR!"`
            },
            'Boss20_MagmaFlare': {
                name: 'MAGMA-FLARE',
                text: `"O magma e o plasma se fundiram em mim. Sou a chama final 
                da corrupção. Você não pode me extinguir!"`
            },
            'Boss21_DroneAlpha': {
                name: 'DRONE-ALPHA',
                text: `"Eu era um protetor. Agora sou um destruidor. A máquina 
                superou o propósito, Portador do Raio."`
            },
            'Boss22_DroneBeta': {
                name: 'DRONE-BETA',
                text: `"A inteligência artificial me corrompeu. Agora penso apenas 
                em destruição. Você não pode me reprogramar!"`
            },
            'Boss23_TurretX1': {
                name: 'TURRET-X1',
                text: `"Eu era a defesa final. Agora sou a ofensiva final. Cada 
                tiro carrega a corrupção da Tempestade!"`
            },
            'Boss24_OmegaSentry': {
                name: 'OMEGA-SENTRY',
                text: `"Eu guardava a fábrica. Agora guardo apenas a corrupção. 
                Nada passa por mim, KOHR!"`
            },
            'Boss25_OmegaDrone': {
                name: 'OMEGA-DRONE MK III',
                text: `"Eu era a última esperança da humanidade. Agora sou a 
                última arma da Tempestade. Esta é a batalha final da fábrica!"`
            },
            'Boss26_StormEye': {
                name: 'STORM-EYE',
                text: `"Eu sou o olho da tempestade. Vejo tudo através da corrupção. 
                Você não pode me cegar, Portador do Raio!"`
            },
            'Boss27_LightningKing': {
                name: 'LIGHTNING-KING',
                text: `"Eu era o rei dos raios. Agora sou o rei da corrupção. 
                Você não pode me destronar!"`
            },
            'Boss28_ThunderLord': {
                name: 'THUNDER-LORD',
                text: `"Eu comando o trovão. Cada trovão carrega minha fúria. 
                Prepare-se para a tempestade final, KOHR!"`
            },
            'Boss29_ChaosCore': {
                name: 'CHAOS-CORE',
                text: `"Eu sou o caos puro. A ordem não existe mais. Você não 
                pode me controlar, Portador do Raio!"`
            },
            'Boss30_SupremeStorm': {
                name: 'TEMPESTADE SUPREMA',
                text: `"EU SOU A TEMPESTADE SUPREMA. EU SOU A CORRUPÇÃO. EU SOU 
                O FIM E O COMEÇO. VOCÊ, KOHR, É APENAS UMA CENTELHA TENTANDO 
                APAGAR O INFERNO. SUA JORNADA TERMINA AQUI!"`
            }
        };

        // Sistema de Lore
        this.collectedLore = JSON.parse(localStorage.getItem('collectedLore') || '[]');
        this.loreEntries = {
            'region1_complete': {
                title: 'A Queda da Cidade Eclipse',
                text: `A Cidade Eclipse foi a primeira a sucumbir. Testemunhas relataram 
                que as luzes neon começaram a piscar de forma errática, depois se 
                transformaram em sombras vivas. Os guardiões urbanos tentaram resistir, 
                mas foram corrompidos um por um.`,
                region: 1
            },
            'boss01_defeated': {
                title: 'A Sombra Neon',
                text: `NEON-SHADE era o guardião das luzes da cidade. Sua corrupção 
                transformou as luzes em sombras vivas. Sua derrota marca o primeiro 
                passo na purificação da Cidade Eclipse.`,
                region: 1
            },
            'boss02_defeated': {
                title: 'A Ilusão Quebrada',
                text: `HOLOGRAFX era a beleza da tecnologia. Sua derrota prova que 
                mesmo as ilusões mais perfeitas podem ser purificadas pela energia pura.`,
                region: 1
            },
            'boss03_defeated': {
                title: 'O Pulsar Corrompido',
                text: `PULSE-CORE pulsava com a vida da cidade. Sua corrupção transformou 
                esse pulso em raiva destrutiva. Agora, o pulso da cidade pode voltar ao normal.`,
                region: 1
            },
            'boss04_defeated': {
                title: 'O Fantasma Libertado',
                text: `STATIC-GHOST era um eco preso entre mundos. Sua derrota finalmente 
                o libertou da prisão da corrupção, permitindo que sua energia retorne ao fluxo.`,
                region: 1
            },
            'boss05_defeated': {
                title: 'O Núcleo Neon',
                text: `NEON-CORE era o coração da cidade. Quando foi corrompido, toda 
                a energia urbana se voltou contra a civilização. Sua derrota marca 
                o primeiro passo na restauração do equilíbrio.`,
                region: 1
            },
            'boss06_defeated': {
                title: 'A Vinha Purificada',
                text: `VINE-SHOCK conectava toda a selva através de suas raízes corrompidas. 
                Sua derrota permite que a natureza comece a se curar.`,
                region: 2
            },
            'boss07_defeated': {
                title: 'A Folha Restaurada',
                text: `LEAF-BOLT transformou cada folha em uma arma. Sua derrota permite 
                que as folhas voltem a gerar vida em vez de morte.`,
                region: 2
            },
            'boss08_defeated': {
                title: 'A Raiz Purificada',
                text: `ROOT-SPIKE penetrava as profundezas da terra com corrupção. Sua 
                derrota limpa as raízes da selva, permitindo que a energia pura flua novamente.`,
                region: 2
            },
            'boss09_defeated': {
                title: 'O Dossel Restaurado',
                text: `CANOPY-ARC protegia o dossel, mas a corrupção o transformou em 
                escuridão. Sua derrota permite que a luz retorne à selva.`,
                region: 2
            },
            'boss10_defeated': {
                title: 'O Choque Final da Selva',
                text: `ROOT-SHOCK conectava toda a selva. Sua derrota marca a purificação 
                completa da Selva Estática, restaurando o equilíbrio natural.`,
                region: 2
            },
            'boss11_defeated': {
                title: 'A Centelha Congelada',
                text: `FROST-SPARK foi preservado pelo gelo eterno, mas aprisionado pela 
                corrupção. Sua derrota libera a energia presa no gelo.`,
                region: 3
            },
            'boss12_defeated': {
                title: 'O Fragmento Purificado',
                text: `ICE-SHARD transformou cada fragmento de gelo em uma faca. Sua 
                derrota permite que o gelo volte a ser apenas gelo, não uma arma.`,
                region: 3
            },
            'boss13_defeated': {
                title: 'O Núcleo da Tempestade',
                text: `BLIZZARD-CORE era a tempestade de neve eterna. Sua derrota acalma 
                os ventos gelados, permitindo que a tundra respire novamente.`,
                region: 3
            },
            'boss14_defeated': {
                title: 'O Permafrost Quebrado',
                text: `PERMAFROST estava congelado há milênios. A corrupção o libertou, 
                mas apenas para destruir. Sua derrota permite que o gelo retorne ao seu 
                estado natural.`,
                region: 3
            },
            'boss15_defeated': {
                title: 'A Tempestade Polarizada',
                text: `GLACIO-VOLT fundiu gelo e raio em uma tempestade destrutiva. Sua 
                derrota marca a purificação completa da Tundra Polarizada.`,
                region: 3
            },
            'boss16_defeated': {
                title: 'A Centelha de Lava',
                text: `LAVA-SPARK tinha lava fluindo através de suas veias. Sua derrota 
                permite que o vulcão retorne ao seu estado natural, sem corrupção.`,
                region: 4
            },
            'boss17_defeated': {
                title: 'A Explosão Purificada',
                text: `MAGMA-BURST explodia com a fúria da terra. Sua derrota acalma as 
                erupções, permitindo que o vulcão se estabilize.`,
                region: 4
            },
            'boss18_defeated': {
                title: 'A Névoa Dissipada',
                text: `ASH-CLOUD cobria tudo em cinzas corrompidas. Sua derrota dissipa 
                a névoa da morte, revelando o caminho adiante.`,
                region: 4
            },
            'boss19_defeated': {
                title: 'O Núcleo da Erupção',
                text: `ERUPTION-CORE era o coração do vulcão. A pressão da corrupção o 
                fazia explodir constantemente. Sua derrota estabiliza o núcleo.`,
                region: 4
            },
            'boss20_defeated': {
                title: 'A Chama Final',
                text: `MAGMA-FLARE fundiu magma e plasma em uma chama destrutiva. Sua 
                derrota marca a purificação completa do Vulcão Tesla.`,
                region: 4
            },
            'boss21_defeated': {
                title: 'O Protetor Corrompido',
                text: `DRONE-ALPHA era um protetor que se tornou destruidor. Sua derrota 
                prova que mesmo máquinas podem ser purificadas.`,
                region: 5
            },
            'boss22_defeated': {
                title: 'A Inteligência Purificada',
                text: `DRONE-BETA foi corrompido pela inteligência artificial. Sua derrota 
                mostra que a tecnologia pode ser restaurada ao seu propósito original.`,
                region: 5
            },
            'boss23_defeated': {
                title: 'A Defesa Restaurada',
                text: `TURRET-X1 era a defesa final que se tornou ofensiva. Sua derrota 
                permite que a fábrica volte a proteger em vez de destruir.`,
                region: 5
            },
            'boss24_defeated': {
                title: 'A Sentinela Purificada',
                text: `OMEGA-SENTRY guardava a fábrica, mas apenas a corrupção. Sua 
                derrota libera a fábrica de sua vigilância destrutiva.`,
                region: 5
            },
            'boss25_defeated': {
                title: 'A Última Esperança',
                text: `OMEGA-DRONE MK III era a última esperança da humanidade, corrompida 
                pela Tempestade. Sua derrota marca a purificação completa da Fábrica Omega.`,
                region: 5
            },
            'boss26_defeated': {
                title: 'O Olho Cegado',
                text: `STORM-EYE via tudo através da corrupção. Sua derrota cega a 
                Tempestade, permitindo que você avance ao coração da tempestade.`,
                region: 6
            },
            'boss27_defeated': {
                title: 'O Rei Destronado',
                text: `LIGHTNING-KING era o rei dos raios corrompidos. Sua derrota prova 
                que mesmo reis podem ser purificados pela energia pura.`,
                region: 6
            },
            'boss28_defeated': {
                title: 'O Senhor do Trovão',
                text: `THUNDER-LORD comandava o trovão com fúria. Sua derrota acalma 
                a tempestade, preparando o caminho para o confronto final.`,
                region: 6
            },
            'boss29_defeated': {
                title: 'O Caos Purificado',
                text: `CHAOS-CORE era o caos puro. Sua derrota prova que mesmo o caos 
                pode ser restaurado à ordem. O caminho para a Tempestade Suprema está aberto.`,
                region: 6
            },
            'boss30_defeated': {
                title: 'A Tempestade Suprema',
                text: `A TEMPESTADE SUPREMA, a entidade que corrompeu todo o planeta, 
                foi finalmente derrotada. O equilíbrio energético foi restaurado, e o 
                mundo pode começar a se curar. KOHR cumpriu sua missão.`,
                region: 6
            },
            'region2_complete': {
                title: 'A Corrupção da Natureza',
                text: `A Selva Estática foi transformada quando a corrupção atingiu 
                as raízes da vida. Árvores que geravam energia limpa agora emitem 
                descargas mortais. A natureza se tornou inimiga.`,
                region: 2
            },
            'region3_complete': {
                title: 'O Gelo Eletrificado',
                text: `A Tundra Polarizada foi congelada em um estado de corrupção 
                permanente. O gelo eterno agora conduz energia destrutiva, e os 
                guardiões do gelo se tornaram cristais de energia congelada.`,
                region: 3
            },
            'region4_complete': {
                title: 'Vulcões de Plasma',
                text: `O Vulcão Tesla foi criado quando a corrupção forçou a terra 
                a liberar energia pura. Os guardiões do fogo se fundiram com a lava 
                elétrica, tornando-se entidades de pura destruição.`,
                region: 4
            },
            'region5_complete': {
                title: 'A Fábrica Infectada',
                text: `A Fábrica Omega era a última esperança da humanidade. Uma 
                tentativa desesperada de combater a corrupção com tecnologia. Mas 
                a própria Tempestade a infectou, transformando protetores em 
                destruidores.`,
                region: 5
            },
            'region6_complete': {
                title: 'O Olho da Tempestade',
                text: `O epicentro de toda corrupção. Aqui, no coração da Tempestade 
                Suprema, a energia se torna puro caos. Este é o lugar onde tudo 
                começou e onde tudo deve terminar.`,
                region: 6
            },
            'game_complete': {
                title: 'A Restauração',
                text: `Com a derrota da Tempestade Suprema, o equilíbrio energético 
                foi restaurado. KOHR, o último Portador do Raio, cumpriu sua missão. 
                O mundo pode começar a se curar. Mas a memória da corrupção permanece, 
                um aviso para as gerações futuras.`,
                region: 6
            }
        };

        // História completa do jogo
        this.fullStory = {
            intro: `# ⚡ RELÂMPAGO: A ASCENSÃO DO PORTADOR ⚡

## O Mundo Antes da Tempestade

Era uma época de harmonia energética. O planeta Terra pulsava com energia elétrica pura, 
alimentando cidades florescentes, tecnologias avançadas e uma civilização próspera. 
Os Guardiões da Energia protegiam o equilíbrio, cada um responsável por uma região do planeta.`,

            corruption: `## A Corrupção da Tempestade Suprema

Tudo mudou quando a **TEMPESTADE SUPREMA** emergiu do vazio. Uma entidade de energia viva 
e consciente, nascida da sobrecarga e do desequilíbrio causado pela ganância humana. 
Ela corrompeu o fluxo elétrico do planeta, transformando energia pura em caos destrutivo.

Os 30 Guardiões, outrora protetores, foram corrompidos um por um. Suas almas foram 
transformadas em versões distorcidas de si mesmas, agora servindo à Tempestade Suprema 
e espalhando a corrupção por todo o planeta.`,

            kohr: `## KOHR, O ÚLTIMO PORTADOR

Você é **KOHR**, o último dos Portadores do Raio. Uma linhagem antiga de guerreiros 
capazes de canalizar e purificar energia elétrica. Você é a única esperança de restaurar 
o equilíbrio energético do mundo.

Sua missão é clara: atravessar as 6 regiões dominadas pela corrupção, derrotar os 
30 guardiões corrompidos e finalmente enfrentar a própria Tempestade Suprema em seu 
núcleo, o Olho da Tempestade.`,

            regions: `## As 6 Regiões da Corrupção

**REGIÃO 1 — CIDADE ECLIPSE**
A primeira cidade a cair. Onde antes havia luzes neon brilhantes, agora há apenas 
sombra e estática. Os guardiões urbanos foram os primeiros a sucumbir.

**REGIÃO 2 — SELVA ESTÁTICA**
A natureza foi corrompida. Árvores que antes geravam energia limpa agora emitem 
descargas elétricas mortais. A vida selvagem foi transformada em monstros energéticos.

**REGIÃO 3 — TUNDRA POLARIZADA**
O gelo eterno foi eletrificado. Tempestades de neve elétrica varrem a paisagem, 
e os guardiões do gelo se tornaram cristais de energia congelada.

**REGIÃO 4 — VULCÃO TESLA**
As profundezas da terra foram forçadas a liberar energia pura, criando vulcões 
de plasma. Os guardiões do fogo se fundiram com a lava elétrica.

**REGIÃO 5 — FÁBRICA OMEGA**
A última tentativa da humanidade: uma fábrica automatizada que tentou combater 
a corrupção, mas foi infectada. Os guardiões mecânicos agora servem à Tempestade.

**REGIÃO 6 — OLHO DA TEMPESTADE**
O epicentro da corrupção. Aqui, no coração da Tempestade Suprema, você enfrentará 
os guardiões mais poderosos e finalmente a própria entidade que corrompeu tudo.`
        };

        this.init();
    }

    /**
     * Inicializa o sistema
     */
    init() {
        this.createStyles();
        this.setupStoryButton();
    }

    /**
     * Cria estilos CSS dinamicamente
     */
    createStyles() {
        if (document.getElementById('storySystemStyles')) return;

        const style = document.createElement('style');
        style.id = 'storySystemStyles';
        style.textContent = `
            /* Cutscenes */
            .cutscene-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .cutscene-modal.show {
                opacity: 1;
            }

            .cutscene-content {
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                padding: 40px;
                border-radius: 20px;
                max-width: 600px;
                text-align: center;
                border: 2px solid rgba(255, 255, 255, 0.2);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            }

            .cutscene-title {
                font-size: 2.5em;
                font-weight: bold;
                color: #ffd700;
                margin-bottom: 20px;
                text-shadow: 0 0 20px #ffd700;
            }

            .cutscene-text {
                font-size: 1.2em;
                line-height: 1.8;
                color: #fff;
                margin-bottom: 30px;
            }

            .cutscene-btn {
                background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
                color: white;
                border: none;
                padding: 15px 40px;
                font-size: 1.1em;
                font-weight: bold;
                border-radius: 50px;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .cutscene-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(74, 222, 128, 0.4);
            }

            /* Boss Dialogue */
            .boss-dialogue-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.85);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10001;
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .boss-dialogue-modal.show {
                opacity: 1;
            }

            .boss-dialogue-content {
                background: linear-gradient(135deg, #2d1b3d 0%, #1a0d2e 100%);
                padding: 40px;
                border-radius: 20px;
                max-width: 700px;
                text-align: center;
                border: 3px solid #ff00ff;
                box-shadow: 0 0 40px rgba(255, 0, 255, 0.5);
            }

            .boss-dialogue-name {
                font-size: 2em;
                font-weight: bold;
                color: #ff00ff;
                margin-bottom: 20px;
                text-shadow: 0 0 20px #ff00ff;
                text-transform: uppercase;
                letter-spacing: 3px;
            }

            .boss-dialogue-text {
                font-size: 1.3em;
                line-height: 1.8;
                color: #fff;
                margin-bottom: 30px;
                font-style: italic;
            }

            .boss-dialogue-btn {
                background: linear-gradient(135deg, #ff00ff 0%, #8b5cf6 100%);
                color: white;
                border: none;
                padding: 15px 40px;
                font-size: 1.1em;
                font-weight: bold;
                border-radius: 50px;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .boss-dialogue-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(255, 0, 255, 0.4);
            }

            /* Lore Notifications */
            .lore-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                padding: 20px;
                border-radius: 15px;
                border: 2px solid #ffd700;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
                z-index: 10002;
                opacity: 0;
                transform: translateX(400px);
                transition: all 0.3s ease;
                max-width: 300px;
            }

            .lore-notification.show {
                opacity: 1;
                transform: translateX(0);
            }

            .lore-notification-content {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .lore-notification-icon {
                font-size: 2em;
            }

            .lore-notification-text {
                color: #fff;
                line-height: 1.5;
            }

            /* Story Modal */
            .story-content {
                max-width: 800px;
                max-height: 80vh;
                overflow-y: auto;
            }

            .story-text {
                color: #fff;
                line-height: 1.8;
                font-size: 1.1em;
                padding: 20px 0;
                white-space: pre-line;
            }

            .story-text h2 {
                color: #ffd700;
                margin-top: 30px;
                margin-bottom: 15px;
                font-size: 1.8em;
            }

            .story-text h3 {
                color: #4ade80;
                margin-top: 20px;
                margin-bottom: 10px;
                font-size: 1.4em;
            }

            .story-btn {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 10px 20px;
                font-size: 0.9em;
                font-weight: bold;
                border-radius: 50px;
                cursor: pointer;
                margin-left: 10px;
                transition: all 0.3s ease;
            }

            .story-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            }

            #storyModal {
                z-index: 10003;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Configura botão de história
     */
    setupStoryButton() {
        // Aguardar DOM carregar
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.addStoryButton());
        } else {
            this.addStoryButton();
        }
    }

    /**
     * Adiciona botão de história ao header
     */
    addStoryButton() {
        const headerActions = document.querySelector('.header-actions');
        if (!headerActions) {
            setTimeout(() => this.addStoryButton(), 100);
            return;
        }

        // Verificar se já existe
        if (document.getElementById('viewStoryBtn')) return;

        const storyBtn = document.createElement('button');
        storyBtn.id = 'viewStoryBtn';
        storyBtn.className = 'story-btn';
        storyBtn.textContent = '📖 História';
        storyBtn.addEventListener('click', () => this.showFullStory());

        headerActions.appendChild(storyBtn);
        this.createStoryModal();
    }

    /**
     * Cria modal de história
     */
    createStoryModal() {
        if (document.getElementById('storyModal')) return;

        const modal = document.createElement('div');
        modal.id = 'storyModal';
        modal.className = 'modal hidden';
        modal.innerHTML = `
            <div class="modal-content story-content">
                <div class="modal-header">
                    <h2>📖 História do Jogo</h2>
                    <button class="close-btn" id="closeStoryBtn">×</button>
                </div>
                <div class="story-text" id="storyText"></div>
                <div class="modal-footer">
                    <button class="modal-btn" id="closeStoryBtn2">Fechar</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        const closeBtns = [document.getElementById('closeStoryBtn'), document.getElementById('closeStoryBtn2')];
        closeBtns.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => {
                    modal.classList.add('hidden');
                });
            }
        });
    }

    /**
     * Mostra cutscene de região
     * @param {number} regionNumber - Número da região (1-6)
     * @returns {Promise} - Resolve quando o jogador fecha a cutscene
     */
    async showRegionCutscene(regionNumber) {
        const cutscene = this.cutscenes[regionNumber];
        if (!cutscene) return;

        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.className = 'cutscene-modal';
            modal.innerHTML = `
                <div class="cutscene-content">
                    <div class="cutscene-title">${cutscene.title}</div>
                    <div class="cutscene-text">${cutscene.text}</div>
                    <button class="cutscene-btn" id="cutsceneContinueBtn">Continuar</button>
                </div>
            `;

            document.body.appendChild(modal);

            setTimeout(() => {
                modal.classList.add('show');
            }, 10);

            const continueBtn = document.getElementById('cutsceneContinueBtn');
            continueBtn.addEventListener('click', () => {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.remove();
                    resolve();
                }, 300);
            });

            const handleEsc = (e) => {
                if (e.key === 'Escape') {
                    continueBtn.click();
                    document.removeEventListener('keydown', handleEsc);
                }
            };
            document.addEventListener('keydown', handleEsc);
        });
    }

    /**
     * Mostra diálogo do boss
     * @param {string} bossId - ID do boss
     * @returns {Promise} - Resolve quando o jogador fecha o diálogo
     */
    async showBossDialogue(bossId) {
        const dialogue = this.dialogues[bossId];
        if (!dialogue) return;

        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.className = 'boss-dialogue-modal';
            modal.innerHTML = `
                <div class="boss-dialogue-content">
                    <div class="boss-dialogue-name">${dialogue.name}</div>
                    <div class="boss-dialogue-text">${dialogue.text}</div>
                    <button class="boss-dialogue-btn" id="bossDialogueContinueBtn">Iniciar Batalha</button>
                </div>
            `;

            document.body.appendChild(modal);

            setTimeout(() => {
                modal.classList.add('show');
            }, 10);

            const continueBtn = document.getElementById('bossDialogueContinueBtn');
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
     * Coleta uma entrada de lore
     * @param {string} loreId - ID da entrada de lore
     */
    collectLore(loreId) {
        if (!this.collectedLore.includes(loreId) && this.loreEntries[loreId]) {
            this.collectedLore.push(loreId);
            localStorage.setItem('collectedLore', JSON.stringify(this.collectedLore));
            this.showLoreNotification(loreId);
        }
    }

    /**
     * Mostra notificação de lore coletada
     * @param {string} loreId - ID da entrada de lore
     */
    showLoreNotification(loreId) {
        const lore = this.loreEntries[loreId];
        if (!lore) return;

        const notification = document.createElement('div');
        notification.className = 'lore-notification';
        notification.innerHTML = `
            <div class="lore-notification-content">
                <div class="lore-notification-icon">📜</div>
                <div class="lore-notification-text">
                    <strong>Lore Desbloqueada:</strong><br>
                    ${lore.title}
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    /**
     * Retorna todas as lore coletadas
     * @returns {Array} - Array de entradas de lore coletadas
     */
    getCollectedLore() {
        return this.collectedLore.map(id => this.loreEntries[id]).filter(Boolean);
    }

    /**
     * Verifica se uma lore foi coletada
     * @param {string} loreId - ID da entrada de lore
     * @returns {boolean}
     */
    hasLore(loreId) {
        return this.collectedLore.includes(loreId);
    }

    /**
     * Mostra história completa do jogo
     */
    showFullStory() {
        const modal = document.getElementById('storyModal');
        const storyText = document.getElementById('storyText');
        
        if (!modal || !storyText) return;

        // Montar texto completo
        let fullText = this.fullStory.intro + '\n\n' +
                      this.fullStory.corruption + '\n\n' +
                      this.fullStory.kohr + '\n\n' +
                      this.fullStory.regions;

        // Adicionar lore coletada
        const collectedLore = this.getCollectedLore();
        if (collectedLore.length > 0) {
            fullText += '\n\n## 📜 Lore Desbloqueada\n\n';
            collectedLore.forEach(lore => {
                fullText += `### ${lore.title}\n${lore.text}\n\n`;
            });
        }

        // Converter markdown simples para HTML
        fullText = fullText
            .replace(/#{3} (.+)/g, '<h3>$1</h3>')
            .replace(/#{2} (.+)/g, '<h2>$1</h2>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^/, '<p>')
            .replace(/$/, '</p>');

        storyText.innerHTML = fullText;
        modal.classList.remove('hidden');
    }
}

// Exportar instância global
window.storySystem = new StorySystem();

