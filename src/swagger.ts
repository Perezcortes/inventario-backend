const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inventario API',
      version: '1.0.0',
      description: 'API para gestionar productos de inventario',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // ruta a tus archivos de rutas con anotaciones swagger
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
