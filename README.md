# Electrum

E-commerce de produtos eletrônicos desenvolvido em React que simula uma experiência completa de compra online. O projeto foi criado com foco na aplicação de boas práticas de desenvolvimento Front-end, arquitetura de aplicações, integração com APIs, gerenciamento de estado e testes automatizados.

## 🎯 Objetivos do projeto

Este projeto foi desenvolvido como um laboratório de desenvolvimento Front-end, reunindo tecnologias e padrões utilizados em aplicações reais. A proposta foi construir uma aplicação organizada, escalável e de fácil manutenção, explorando abordagens para gerenciamento de estado, formulários, testes e otimização de componentes.

Durante o desenvolvimento foram explorados conceitos como:

- Arquitetura e organização de aplicações React
- Componentização e reutilização de código
- Integração com APIs REST
- Context API para gerenciamento de estado global
- React Hook Form + Yup para formulários e validações
- Testes unitários com Jest
- Testes de componentes com Testing Library
- Boas práticas de desenvolvimento e manutenção de código

## 📑 Índice

- [Demonstração](#-demonstração)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#%EF%B8%8F-tecnologias)
- [Conceitos aplicados](#-conceitos-aplicados)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Instalação](#-instalação)
- [Contribuidores](#-contribuidores)
- [Back-end](#-back-end)

## 📷 Demonstração

### Home
 ![Tela Inicial](https://kevenshtk.github.io/Projetos/img/telas-electrum/telaInicial.png)

### Listagem de Produtos
 ![Lista Produtos](https://kevenshtk.github.io/Projetos/img/telas-electrum/telaListaProdutos.png)

### Favoritos
 ![Produtos Favoritos](https://kevenshtk.github.io/Projetos/img/telas-electrum/telaProdutosFavoritos.png)

## ✨ Funcionalidades

- Autenticação de usuários com login e cadastro
- Listagem de produtos obtidos por meio de API
- Filtragem de produtos por categoria
- Gerenciamento de produtos favoritos
- Carrinho de compras com adição, remoção e atualização de quantidades
- Cálculo automático do subtotal e valor total da compra
- Persistência dos dados do carrinho e favoritos
- Interface responsiva para diferentes tamanhos de tela

## 🛠️ Tecnologias

### Front-end

- React
- SASS

### Gerenciamento de estado

- Context API

### Formulários

- React Hook Form
- Yup

### Testes

- Jest
- Testing Library

### Comunicação

- Axios

## 💡 Conceitos aplicados

- Componentização
- Context API
- Custom Hooks
- Arquitetura em camadas
- Testes unitários
- Testes de componentes

## 📁 Estrutura do projeto
```
src/
├── pages/      → Páginas da aplicação.
├── components/   → Componentes reutilizáveis da interface.
├── context/      → Gerenciamento de estado global com React Context.
├── hooks/        → Hooks customizados.
├── layouts/      → Estruturas reutilizáveis das páginas.
├── services/     → Camada responsável pelas requisições HTTP e integração com a API.
├── styles/       → Recursos globais compartilhados de estilização.
└── utils/        → Funções utilitárias compartilhadas.
```


## 🚀 Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Kevenshtk/Electrum.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd Electrum
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie a aplicação:

   ```bash
   npm start
   ```

5. Acesse no navegador:

   ```text
   http://localhost:3000
   ```

## 👥 Contribuidores

- **Keven Di Camargo** — Desenvolvimento da aplicação.
- **Mateus Zancho Neto** — Colaboração na implementação do timer dinâmico ([GitHub](https://github.com/MateusZanchoNeto)).

## 🔌 Back-end

Este projeto consome uma API REST desenvolvida separadamente em Java Spring Boot.

Inicialmente a aplicação utilizava json-server para simular o back-end. Posteriormente foi iniciado o desenvolvimento de uma API REST em Java Spring Boot.

Entre suas responsabilidades estão:

- autenticação de usuários;
- gerenciamento de produtos;
- operações CRUD;
- persistência de dados.

Repositório da API:

👉 [APIelectrum](https://github.com/Kevenshtk/APIelectrum)
