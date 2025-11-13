# 🎮 Configuração do Ranking - Clique Relâmpago

## 📋 Passo a Passo para Configurar o Supabase

### 1️⃣ Configurar o Banco de Dados no Supabase

1. Acesse https://supabase.com e faça login
2. Abra seu projeto (ou crie um novo)
3. Vá em **SQL Editor** (menu lateral)
4. Clique em **New query**
5. Execute os scripts SQL abaixo:

#### Script 1: Criar Tabela
```sql
-- Criar tabela de ranking
CREATE TABLE IF NOT EXISTS ranking (
    id BIGSERIAL PRIMARY KEY,
    player_name TEXT NOT NULL,
    score INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar índice para ordenação rápida por pontuação
CREATE INDEX IF NOT EXISTS idx_ranking_score ON ranking(score DESC);

-- Criar índice para ordenação por data
CREATE INDEX IF NOT EXISTS idx_ranking_created_at ON ranking(created_at DESC);
```

#### Script 2: Configurar Políticas de Segurança
```sql
-- Habilitar Row Level Security na tabela
ALTER TABLE ranking ENABLE ROW LEVEL SECURITY;

-- Política: Permitir que qualquer pessoa leia o ranking (SELECT)
CREATE POLICY "Permitir leitura pública do ranking"
ON ranking
FOR SELECT
TO public
USING (true);

-- Política: Permitir que qualquer pessoa insira pontuações (INSERT)
CREATE POLICY "Permitir inserção pública no ranking"
ON ranking
FOR INSERT
TO public
WITH CHECK (true);
```

### 2️⃣ Obter as Credenciais do Supabase

1. No menu lateral, clique em **Project Settings** (ícone de engrenagem ⚙️)
2. Vá em **API**
3. Anote as seguintes informações:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon public key** (chave longa que começa com `eyJ...`)

### 3️⃣ Configurar o Arquivo `supabase-config.js`

1. Abra o arquivo `clique-relampago/supabase-config.js`
2. Substitua `SUA_URL_DO_SUPABASE_AQUI` pela **Project URL** que você copiou
3. Substitua `SUA_CHAVE_ANON_AQUI` pela **anon public key** que você copiou

**Exemplo:**
```javascript
const SUPABASE_CONFIG = {
    url: 'https://abcdefghijklmnop.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2NzI4MCwiZXhwIjoxOTU0NTQzMjgwfQ.abcdefghijklmnopqrstuvwxyz1234567890'
};
```

### 4️⃣ Testar a Configuração

1. Abra o arquivo `index.html` no navegador
2. Digite seu nome quando solicitado
3. Jogue uma partida
4. Verifique se a pontuação foi salva
5. Clique no botão **🏆 Ranking** para ver o ranking global

### ✅ Pronto!

Agora seu jogo está configurado com ranking global usando Supabase!

## 🔧 Solução de Problemas

### Erro: "Erro ao salvar pontuação"
- Verifique se as credenciais no `supabase-config.js` estão corretas
- Verifique se as políticas RLS foram criadas corretamente
- Abra o Console do navegador (F12) para ver mensagens de erro detalhadas

### Erro: "Erro ao carregar ranking"
- Verifique se a tabela `ranking` foi criada
- Verifique se as políticas de SELECT foram criadas
- Verifique a conexão com a internet

### O ranking não aparece
- Verifique se há dados na tabela (vá em Table Editor no Supabase)
- Verifique se o nome do jogador foi salvo corretamente
- Limpe o cache do navegador (Ctrl+F5)

## 📝 Notas Importantes

- As pontuações são salvas automaticamente após cada partida
- O ranking mostra os top 20 jogadores
- O nome do jogador é salvo no localStorage do navegador
- Cada pontuação é registrada com data e hora

