# Tasks API

## Sobre o projeto

Projeto desenvolvido para ensinar os fundamentos do desenvolvimento Backend utilizando **Node.js**, **TypeScript** e **Express**, por meio da construção de uma API para gerenciamento de tarefas.

---

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- TSX
- Git
- GitHub
- Postman
- Swagger

---

## Como executar o projeto

1. Clone este repositório.

2. Instale as dependências:

```bash
npm install
```

3. Execute a aplicação:

```bash
npm run dev
```

O servidor será iniciado em:

```
http://localhost:3000
```

---

## Rotas disponíveis

### GET /health

Verifica se a API está funcionando.

---

### GET /tasks

Retorna todas as tarefas cadastradas.

---

### GET /tasks/:id

Busca uma tarefa pelo seu ID.

Exemplo:

```
/tasks/1
```

---

### GET /tasks/status?status=

Busca tarefas pelo status.

Exemplo:

```
/tasks/status?status=pending
```

---

### POST /tasks

Cadastra uma nova tarefa.

Exemplo de requisição:

```json
{
  "title": "Criar servidor",
  "description": "Criar um servidor com Express e TypeScript",
  "priority": "low"
}
```

---

### PATCH /tasks/:id

Atualiza parcialmente uma tarefa pelo ID.

Exemplo de requisição:

```json
{
  "title": "Criar API com Express",
  "priority": "high"
}
```

---

### DELETE /tasks/:id

Remove uma tarefa pelo ID.

Exemplo:

```
/tasks/1
```

---

## Documentação da API

Após iniciar a aplicação, acesse:

```
http://localhost:3000/docs
```

para visualizar a documentação da API gerada com Swagger.

---

## Observação

Este projeto utiliza um banco de dados em memória. Isso significa que os dados são armazenados apenas enquanto a aplicação estiver em execução. Ao reiniciar o servidor, todas as informações cadastradas serão perdidas.

---

## O que foi praticado

- Criação de uma API com Express
- Organização da aplicação em camadas (Routes, Controllers, Services e Data)
- Introdução ao TypeScript
- Modelagem de dados com Interfaces, Enums e DTOs
- Criação de rotas REST
- Controllers e Services
- Banco de dados em memória
- Operações CRUD (GET, POST, PATCH e DELETE)
- Uso de Route Params (`req.params`)
- Uso de Query Params (`req.query`)
- Uso de Request Body (`req.body`)
- Validação de dados nas requisições
- Manipulação de Arrays com os métodos `find`, `findIndex`, `filter`, `includes` e `splice`
- Documentação da API com Swagger