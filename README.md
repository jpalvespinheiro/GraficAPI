# Dashboard API

## Descrição do Projeto

Este projeto é uma API desenvolvida para fornecer dados dinâmicos para um dashboard. A API permite a leitura de um banco de dados local e retorna valores adaptados ao tipo de gráfico solicitado pelo usuário, como gráficos de pizza e gráficos de linhas. A API também implementa filtros de data para refinar os dados retornados, garantindo que os usuários recebam informações pertinentes.

## Índice

1. [Tecnologias Utilizadas](#tecnologias-utilizadas)
2. [Instalação](#instalação)
3. [Uso](#uso)
4. [Documentação da API](#documentação-da-api)
   - [Endpoints](#endpoints)
5. [Tratamento de Erros](#tratamento-de-erros)
6. [Testes](#testes)
7. [Contribuição](#contribuição)

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **Express**: Framework web para Node.js que facilita a construção de APIs.
- **MySQL**: Sistema de gerenciamento de banco de dados utilizado para armazenar os dados.
- **JSON Web Tokens (JWT)**: Para autenticação de usuários.
- **Swagger**: Para documentação da API.

## Instalação

Siga os passos abaixo para instalar e configurar o projeto:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio

2. instale as dependências usando ---> npm install

3. Crie um arquivo .env na raiz do projeto e adicione suas configurações:

DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
PORT=3000
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha

4. Digite no terminal npm run dev para o servidor iniciar.


## Uso

1. A API pode ser testada utilizando o Postman ou qualquer ferramenta similar. Para interagir com os endpoints, você pode usar as rotas especificadas na seção de documentação da API.

## Documentação da API

GET /api/charts
Retorna os dados para o dashboard. Este endpoint deve aceitar parâmetros de filtro de data (data de início e fim) e retornar dados formatados para o tipo de gráfico solicitado.

Para testar todos os gráficos vou deixar abaixo como fazer isso 

1. Para retornar dados para gráficos de pizza

    http://localhost:3000/api/charts?tipo=pie&dataInicio=2024-09-01&dataFim=2024-09-30

2. Para retornar dados para grafico em linhas

    http://localhost:3000/api/charts?tipo=line&dataInicio=2024-09-01&dataFim=2024-09-30

3. Para retornar dados para gráfico em barras

    http://localhost:3000/api/charts?tipo=bar&dataInicio=2024-09-01&dataFim=2024-09-30


## Tratamento de Erros

Todos os endpoints implementam tratamento de erros para garantir que mensagens úteis sejam retornadas em caso de falhas. Erros comuns incluem:

400 Bad Request: Para requisições malformadas.
404 Not Found: Quando o recurso solicitado não é encontrado.
500 Internal Server Error: Para erros inesperados no servidor. 

## Testes

1. Basta rodar no terminal

    npm run test

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

