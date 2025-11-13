// Configuração do Supabase
// IMPORTANTE: Preencha com suas credenciais do Supabase

const SUPABASE_CONFIG = {
    // Cole aqui a URL do seu projeto (ex: https://xxxxx.supabase.co)
    url: 'https://puonsvahqjgocdsqcdwz.supabase.co',
    
    // Cole aqui a chave anon public do seu projeto
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1b25zdmFocWpnb2Nkc3FjZHd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNjMwMTYsImV4cCI6MjA3ODYzOTAxNn0.pzcCmBNQlJ5BVPJoYp-mR-2M44dofTEDkBd3QDbi0-s'
};

// Tornar config acessível globalmente
window.SUPABASE_CONFIG = SUPABASE_CONFIG;

// Inicializar cliente Supabase (variável global)
let supabase = null;
let supabaseInitialized = false;

// Tornar supabase acessível globalmente
window.supabaseClient = null;

// Função para inicializar o cliente Supabase (global)
window.initSupabase = function initSupabase() {
    try {
        console.log('🔍 Tentando inicializar Supabase...');
        
        // Verificar todas as possíveis formas de acesso à biblioteca
        let supabaseLib = null;
        
        // Forma 1: window.supabase (UMD padrão)
        if (typeof window.supabase !== 'undefined' && typeof window.supabase.createClient === 'function') {
            supabaseLib = window.supabase;
            console.log('✅ Encontrado window.supabase');
        }
        // Forma 2: window.supabaseJs
        else if (typeof window.supabaseJs !== 'undefined' && typeof window.supabaseJs.createClient === 'function') {
            supabaseLib = window.supabaseJs;
            console.log('✅ Encontrado window.supabaseJs');
        }
        // Forma 3: Verificar se existe no escopo global (sem window)
        else if (typeof globalThis !== 'undefined' && typeof globalThis.supabase !== 'undefined' && typeof globalThis.supabase.createClient === 'function') {
            supabaseLib = globalThis.supabase;
            console.log('✅ Encontrado globalThis.supabase');
        }
        // Forma 4: Verificar se a biblioteca expôs diretamente
        else {
            // Tentar acessar diretamente do objeto window
            const possibleNames = ['supabase', 'supabaseJs', 'Supabase'];
            for (const name of possibleNames) {
                if (window[name] && typeof window[name].createClient === 'function') {
                    supabaseLib = window[name];
                    console.log(`✅ Encontrado window.${name}`);
                    break;
                }
            }
        }
        
        if (supabaseLib && typeof supabaseLib.createClient === 'function') {
            try {
                supabase = supabaseLib.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
                window.supabaseClient = supabase; // Tornar acessível globalmente
                supabaseInitialized = true;
                console.log('✅ Supabase inicializado com sucesso!');
                console.log('Cliente Supabase:', supabase);
                
                // Testar conexão (não bloquear se falhar)
                testSupabaseConnection().catch(err => {
                    console.warn('⚠️ Teste de conexão falhou, mas cliente foi inicializado:', err);
                });
                return true;
            } catch (createError) {
                console.error('❌ Erro ao criar cliente Supabase:', createError);
                return false;
            }
        } else {
            console.warn('⚠️ Biblioteca Supabase não encontrada ainda...');
            console.log('Verificando objetos disponíveis em window:', Object.keys(window).filter(k => k.toLowerCase().includes('supabase')));
            return false;
        }
    } catch (error) {
        console.error('❌ Erro ao inicializar Supabase:', error);
        console.error('Stack:', error.stack);
        return false;
    }
};

// Função para testar a conexão
async function testSupabaseConnection() {
    if (!supabase) {
        console.warn('⚠️ Supabase não está disponível para teste');
        return;
    }
    
    try {
        console.log('🧪 Testando conexão com Supabase...');
        // Usar select simples sem count para evitar problemas
        const { data, error } = await supabase
            .from('ranking')
            .select('id')
            .limit(1);
        
        if (error) {
            console.error('❌ Erro ao testar conexão:', error);
            console.error('Código do erro:', error.code);
            console.error('Mensagem:', error.message);
        } else {
            console.log('✅ Conexão com Supabase funcionando!');
            console.log('Dados de teste:', data);
        }
    } catch (err) {
        console.error('❌ Erro ao testar conexão:', err);
        console.error('Tipo do erro:', err.constructor.name);
    }
}

// Aguardar o carregamento da biblioteca
let attempts = 0;
const maxAttempts = 100; // 100 tentativas * 50ms = 5 segundos

(function waitForSupabase() {
    attempts++;
    if (!initSupabase() && attempts < maxAttempts) {
        setTimeout(waitForSupabase, 50);
    } else if (attempts >= maxAttempts && !supabaseInitialized) {
        console.error('❌ Timeout: Biblioteca Supabase não foi carregada após 5 segundos');
        console.error('Verifique se o script do Supabase está sendo carregado corretamente no HTML');
    }
})();

