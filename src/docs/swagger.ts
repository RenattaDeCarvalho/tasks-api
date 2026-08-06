import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Task API",
      version: "1.0.0",
      description:
        "API REST para gerenciamento de tarefas, utilizada para ensinar conceitos de CRUD, arquitetura em camadas e boas práticas no desenvolvimento Backend com Node.js, TypeScript e Express.",
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],

    tags: [
      {
        name: "Health",
        description: "Operações de verificação da API",
      },
      {
        name: "Tasks",
        description: "Operações relacionadas às tarefas",
      },
    ],

    components: {
      schemas: {
        Task: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            title: {
              type: "string",
              example: "Criar servidor",
            },
            description: {
              type: "string",
              example: "Criar um servidor com Express e TypeScript",
            },
            status: {
              type: "string",
              enum: ["pending", "in_progress", "completed"],
              example: "pending",
            },
            priority: {
              type: "string",
              enum: ["low", "medium", "high"],
              example: "low",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
            completedAt: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
          },
        },

        CreateTask: {
          type: "object",
          required: ["title", "description", "priority"],
          properties: {
            title: {
              type: "string",
              example: "Criar servidor",
            },
            description: {
              type: "string",
              example: "Criar um servidor com Express e TypeScript",
            },
            priority: {
              type: "string",
              enum: ["low", "medium", "high"],
              example: "low",
            },
          },
        },

        UpdateTask: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
            status: {
              type: "string",
              enum: ["pending", "in_progress", "completed"],
            },
            priority: {
              type: "string",
              enum: ["low", "medium", "high"],
            },
          },
        },

        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Internal server error.",
            },
          },
        },
      },

      responses: {
        InternalServerError: {
          description: "Erro interno do servidor.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },

      parameters: {
        TaskId: {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
          },
          description: "ID da tarefa.",
        },

        StatusFilter: {
          in: "query",
          name: "status",
          required: false,
          schema: {
            type: "string",
            enum: ["pending", "in_progress", "completed"],
          },
          description: "Filtra as tarefas pelo status.",
        },

        PriorityFilter: {
          in: "query",
          name: "priority",
          required: false,
          schema: {
            type: "string",
            enum: ["low", "medium", "high"],
          },
          description: "Filtra as tarefas pela prioridade.",
        },
      },
    },
  },

  apis: ["./src/routes/*.ts"],
};

export const swaggerDocument = swaggerJSDoc(swaggerOptions);