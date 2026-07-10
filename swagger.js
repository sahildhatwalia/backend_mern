const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD API",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;