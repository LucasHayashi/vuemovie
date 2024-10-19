# Vue Movie Frontend

Frontend para o aplicativo Vue Movie, desenvolvido com Vue.js 2 e integrado com a [API do TMDB](https://developer.themoviedb.org/) através do [backend próprio](https://github.com/LucasHayashi/vue-movie-backend).

## 📋 Pré-requisitos

- Node.js
- NPM ou Yarn
- [Backend Vue Movie](https://github.com/LucasHayashi/vue-movie-backend) configurado

## ⚙️ Variáveis de Ambiente

```env
VUE_APP_API_URL=     # URL do backend
VUE_APP_API_ASSETS=  https://image.tmdb.org/t/p
```

## 🛠️ Tecnologias

| Tecnologia | Versão | Descrição                           |
| ---------- | ------ | ----------------------------------- |
| Vue.js     | 2.x    | Framework JavaScript progressivo    |
| Vuex       | 3.x    | Gerenciamento de estado             |
| Vue Router | 3.x    | Roteamento oficial do Vue.js        |
| Vuetify    | 2.x    | Framework de UI com Material Design |

## ✨ Funcionalidades

### Busca Avançada

- Pesquisa integrada por:
  - Filmes
  - Séries
  - Atores

### Tendências

- Visualização das tendências atuais
- Filtragem por:
  - Filmes
  - Séries

### Perfil do Usuário

- Login com conta TMDB
- Gerenciamento de:
  - Favoritos
  - Lista "Para Assistir" (Watchlist)

### Recomendações

- Sistema de sugestões baseado em:
  - Títulos selecionados

### Interface

- Tema escuro nativo
- Design responsivo

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/LucasHayashi/vue-movie-frontend.git

# Entre na pasta do projeto
cd vue-movie-frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run serve
```

## 📝 Notas Importantes

- É necessário ter o backend configurado e rodando para funcionar corretamente
- Todos os assets de imagem são servidos através do endpoint do TMDB
- A autenticação é realizada através do backend próprio

## 🔗 Links Úteis

- [Backend Vue Movie](https://github.com/LucasHayashi/vue-movie-backend)
- [Documentação Vue.js 2](https://v2.vuejs.org/)
- [Documentação Vuex 3](https://v3.vuex.vuejs.org/)
- [Documentação Vue Router 3](https://v3.router.vuejs.org/)
- [Documentação Vuetify 2](https://v2.vuetifyjs.com/)
- [API TMDB](https://developer.themoviedb.org/)
