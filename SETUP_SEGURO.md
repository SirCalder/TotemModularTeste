# Configuração Segura da API - Secretaria Digital Amanhecer

## 🔐 Configuração da API Key (Primeira Execução)

### 1. Configure sua API Key do Google Gemini

1. **Copie o arquivo de exemplo:**
   ```bash
   copy config.example.js config.js
   ```

2. **Edite o arquivo `config.js`:**
   - Abra o arquivo `config.js` (recém-criado)
   - Substitua `'SUA_CHAVE_AQUI'` pela sua chave real da API do Google Gemini
   - Salve o arquivo

3. **Sua chave está protegida:**
   - O arquivo `config.js` está no `.gitignore`
   - Nunca será enviado para o GitHub
   - Mantenha-o apenas localmente

### 2. Obtendo uma API Key do Google Gemini

1. Acesse: https://makersuite.google.com/app/apikey
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada
5. Cole no arquivo `config.js`

### 3. Estrutura do Arquivo `config.js`

```javascript
const APP_CONFIG = {
    GEMINI_API_KEY: 'SUA_CHAVE_REAL_AQUI',
    
    // Outras configurações
    APP_NAME: 'Secretaria Digital Amanhecer',
    VERSION: '1.0.0'
};

// Torna APP_CONFIG disponível globalmente
window.APP_CONFIG = APP_CONFIG;
```

## 🚀 Executando a Aplicação

### Método 1: Servidor Python (Recomendado)
```bash
python -m http.server 8080
```
Acesse: http://localhost:8080

### Método 2: Servidor Node.js
```bash
npx http-server -p 8080
```

### Método 3: Live Server (VS Code)
- Instale a extensão "Live Server"
- Clique direito em `index.html` → "Open with Live Server"

## 🔒 Segurança

### ✅ O que está protegido:
- `config.js` - Nunca será commitado (está no .gitignore)
- `.env` - Qualquer arquivo de ambiente (está no .gitignore)
- Logs e arquivos temporários

### ⚠️ Importantes:
- **NUNCA** commite o arquivo `config.js`
- **SEMPRE** use `config.example.js` como referência
- Mantenha sua API key segura e privada
- Revogue a key se suspeitar de compromisso

## 🛠️ Para Desenvolvedores

### Colaboração Segura:
1. Clone o repositório
2. Copie `config.example.js` para `config.js`
3. Adicione sua própria API key no `config.js`
4. Nunca commite mudanças no `config.js`

### Estrutura de Arquivos:
```
TotemModularTeste/
├── index.html          # Interface principal
├── script.js           # Lógica da aplicação
├── style.css           # Estilos
├── config.example.js   # Template de configuração ✅ Commitado
├── config.js           # Suas chaves reais ❌ Não commitado
└── .gitignore          # Proteção de arquivos sensíveis
```

## 🐛 Solução de Problemas

### Erro: "API Key não configurada"
- Verifique se `config.js` existe
- Confirme se a API key está correta
- Teste a key no Google AI Studio

### Erro: "Failed to fetch"
- Problema de CORS - use um servidor HTTP
- Não abra diretamente o arquivo HTML
- Use um dos métodos de servidor acima

### Erro: 403 Forbidden
- API key inválida ou expirada
- Verifique cotas no Google Cloud Console
- Gere nova API key se necessário

## 📝 Notas de Desenvolvimento

- A aplicação funciona offline com respostas locais quando a API falha
- Sistema de fallback inteligente para casos de erro
- Interface responsiva com design "Organic Calm"
- Zero dependências npm - funciona apenas com HTML/CSS/JS