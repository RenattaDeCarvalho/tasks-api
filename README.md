# Tasks API

## Sobre o projeto

A **Tasks API** é o **segundo sistema** desenvolvido por mim para a mentoria de **Backend da Ada's Academy**.

Criei este projeto para dar continuidade ao aprendizado iniciado no **Backend Fundamentos API**, permitindo que as mentoradas evoluam dos conceitos básicos para a construção de uma API mais completa e alinhada às práticas utilizadas no mercado.

Ao longo deste sistema, são consolidados os fundamentos apresentados no primeiro projeto e introduzidos novos conceitos, como **CRUD completo**, **Services**, **DTOs**, **Enums**, **validações** e **boas práticas de organização de código**, mantendo a arquitetura em camadas adotada desde o início da trilha.

Além de servir como material de apoio para as aulas, este projeto representa a metodologia de ensino que desenvolvi para a mentoria, baseada na construção de aplicações reais que evoluem em complexidade a cada novo sistema.

---

## Tecnologias e ferramentas utilizadas

### Backend

- Node.js
- TypeScript
- Express

### Ferramentas

- TSX
- Git
- GitHub
- Postman
- Swagger (OpenAPI)

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

### GET /health-check

Verifica se a API está funcionando.

**Resposta:** `200 OK`

---

### GET /tasks

Retorna todas as tarefas cadastradas.

**Resposta:** `200 OK`

---

### GET /tasks/:id

Busca uma tarefa pelo seu ID.

**Resposta:** `200 OK`

Exemplo:

```
/tasks/1
```

---

### GET /tasks/status?status=

Busca tarefas pelo status.

**Resposta:** `200 OK`

Exemplo:

```
/tasks/status?status=pending
```

---

### POST /tasks

Cadastra uma nova tarefa.

**Resposta:** `201 Created`

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

**Resposta:** `200 OK`

Exemplo de requisição:

```json
{
  "title": "Criar API REST com Express",
  "priority": "high"
}
```

---

### DELETE /tasks/:id

Remove uma tarefa pelo ID.

**Resposta:** `200 OK`

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

para visualizar a documentação interativa da API gerada com **Swagger (OpenAPI)**.

---

## Observação

Este projeto utiliza um banco de dados em memória para simplificar o processo de aprendizagem durante a mentoria.

Isso significa que os dados permanecem disponíveis apenas enquanto a aplicação estiver em execução. Ao reiniciar o servidor, todas as informações cadastradas serão perdidas.

Nos próximos sistemas da trilha, a persistência dos dados será realizada utilizando um banco de dados real.

---

## O que foi praticado

### Desenvolvimento Backend

- Criação de uma API REST com Express
- Operações CRUD (GET, POST, PATCH e DELETE)
- Uso de Route Params (`req.params`)
- Uso de Query Params (`req.query`)
- Uso de Request Body (`req.body`)
- Validação de dados nas requisições

### Arquitetura

- Organização da aplicação em camadas (Routes, Controllers, Services e Data)
- Separação de responsabilidades entre as camadas

### TypeScript

- Interfaces
- Enums
- DTOs
- Tipagem estática

### Manipulação de dados

- Banco de dados em memória
- Métodos `find`, `findIndex`, `filter`, `includes` e `splice`

### Documentação e Versionamento

- Documentação da API com Swagger (OpenAPI)
- Versionamento com Git
- Hospedagem do código no GitHub

---

Este projeto representa o **segundo sistema** da trilha prática de Backend que venho desenvolvendo para a mentoria da **Ada's Academy**, dando continuidade aos conceitos apresentados no **Backend Fundamentos API** e preparando as mentoradas para os próximos projetos da formação.