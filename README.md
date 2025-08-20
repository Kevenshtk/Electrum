# Electrum

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Contribuidores](#contribuidores)
- [API](#api)

## Sobre o Projeto

Electrum é um e-commerce de produtos eletrônicos desenvolvido em React. Ele permite aos usuários buscar, visualizar e interagir com diversos produtos tech de forma simples e intuitiva.

## Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [SASS](https://sass-lang.com/)
- [Axios](https://axios-http.com/ptbr)
- [json-server](https://www.npmjs.com/package/json-server) (usado inicialmente como API fake)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)

## Tela Inicial

![Tela Inicial](https://github.com/Kevenshtk/Electrum/blob/main/public/telaInicial.png)

## Funcionalidades

- Filtrar produtos por categoria
- Interface responsiva

### Funcionalidades em Desenvolvimento

- Buscar produtos por nome
- Login para clientes e administrador
- Lista de produtos favoritos
- Carrinho de compras
- CRUD completo de produtos

## Instalação

1. Clone o repositório:
   ```terminal
   git clone https://github.com/Kevenshtk/Electrum.git

2. Navegue até o diretório do projeto:
   ```terminal
   cd Electrum

3. Instale as dependências:
   ```terminal
   npm install

4. Inicie o json-server (Opcional):
   ```terminal
   npm run api
   
5. Inicie a aplicação:
   ```terminal
   npm start

## Contribuidores

Keven Di Camargo – Desenvolvimento principal

Mateus Zancho Neto – Colaboração no projeto (Implementação de timer dinâmico) - 
[GitHub](https://github.com/MateusZanchoNeto)

## API

O projeto também conta com uma API própria desenvolvida em Java Spring Boot, criada para substituir gradualmente o uso do json-server.
Essa API é responsável por:

- Armazenar e gerenciar produtos e usuários
- Possibilitar operações de CRUD reais
- Facilitar escalabilidade para o back-end

Que está disponível em outro repositório:
[APIelectrum](https://github.com/Kevenshtk/APIelectrum)
