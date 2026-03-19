<div align="center">
  <h1>🎮 Portfolio Game Inspired</h1>
  <p><i>Portfólio interativo com estética cyberpunk, animações fluidas e experiência personalizável</i></p>

  <p>
    <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Framer%20Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/Web%20Audio%20API-Procedural-FF6B35?style=for-the-badge" alt="Web Audio API" />
  </p>
</div>

---

## ⚡ Visão Geral

O **Portfolio Game Inspired** é uma aplicação frontend em React com foco em uma experiência visual imersiva, inspirada em interfaces de jogos e HUDs futuristas.

O projeto combina:

- navegação por seções com animações cinematográficas
- painel de configurações para personalização avançada da UI
- internacionalização (`en` e `pt-BR`)
- efeitos sonoros procedurais com Web Audio API
- layout responsivo para desktop e mobile

## ✨ Principais Recursos

- **Experiência visual game-inspired**:
  - Background animado com partículas e padrões dinâmicos.
  - Componentes com estilo glassmorphism/cyber UI.
- **Seções do portfólio**:
  - Home, About, Skills, Projects, Resume, Contact e Footer.
  - Navegação lateral com destaque da seção ativa.
- **Configurações em tempo real**:
  - Cores primárias, opacidade de cards, blur, bordas e texturas.
  - Controle de qualidade gráfica e modo de rolagem (`snap`/`free`).
- **Sistema de áudio procedural**:
  - Sons de interação (`click`, `hover`, `open`, `close`, etc.) gerados com Web Audio API.
  - Controle de volume master e toggle de áudio.
- **Internacionalização**:
  - Alternância entre inglês e português brasileiro.
- **Persistência local**:
  - Preferências salvas em `localStorage` com feedback visual de confirmação.
- **Performance e UX**:
  - Lazy loading de seções pesadas.
  - Fallbacks de carregamento com `Suspense` e `ErrorBoundary`.

## 🛠️ Stack Tecnológica

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Animações**: Framer Motion
- **Estilização**: CSS global + utilitários Tailwind (via CDN no `index.html`)
- **Áudio**: Web Audio API (síntese procedural)
- **Deploy**: GitHub Pages (`gh-pages`)

## 📂 Estrutura do Projeto

```text
.
├── public/
├── src/
│   ├── components/
│   │   ├── motion/
│   │   │   └── variants.ts
│   │   ├── AboutSection.tsx
│   │   ├── AnimatedBackground.tsx
│   │   ├── ContactSection.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── HomeSection.tsx
│   │   ├── LoadingOverlay.tsx
│   │   ├── ProjectModal.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ResumeSection.tsx
│   │   ├── SaveConfirmation.tsx
│   │   ├── SectionContainer.tsx
│   │   ├── SettingsModal.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SkillsSection.tsx
│   │   └── ...
│   ├── config/
│   │   ├── theme.ts
│   │   └── translations.ts
│   ├── hooks/
│   │   ├── useAudio.tsx
│   │   ├── usePortfolioSettings.ts
│   │   └── useScrollController.ts
│   ├── styles/
│   │   └── global.css
│   ├── App.tsx
│   └── index.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js 20+
- npm 10+

### Execução

1. Entre na pasta do projeto:
   ```bash
   cd Portfolio-Game-Inspired
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse:
   - App: `http://localhost:3000`

## 📜 Scripts

- `npm run dev`: inicia o servidor de desenvolvimento Vite
- `npm run build`: gera build de produção em `dist/`
- `npm run preview`: serve localmente o build de produção
- `npm run predeploy`: executa build antes do deploy
- `npm run deploy`: publica `dist/` no GitHub Pages via `gh-pages`

## 🌐 Deploy no GitHub Pages

1. Configure o repositório remoto no GitHub.
2. Execute:

```bash
npm run deploy
```

3. Garanta que o GitHub Pages está apontando para a branch/pasta publicada pelo `gh-pages`.

> Observação: o projeto usa `base: './'` no `vite.config.ts`, adequado para deploy estático em subpath.

## ⚙️ Variáveis de Ambiente

Atualmente, o `vite.config.ts` lê `GEMINI_API_KEY` via `loadEnv`. Se necessário, crie um arquivo `.env`:

```env
GEMINI_API_KEY=sua_chave_aqui
```

Se a aplicação não consumir essa chave em runtime, ela pode permanecer apenas como configuração futura.

## 📄 Licença

Este projeto é proprietário (All Rights Reserved).

O código-fonte não pode ser copiado, modificado, distribuído ou utilizado para fins comerciais sem autorização explícita do autor.

© 2026 Andrei Costa — Todos os direitos reservados.
