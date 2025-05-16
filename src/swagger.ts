import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inventario API',
      version: '1.0.0',
      description: 'API para gestión de productos de inventario y usuarios',
    },
    components: {
      schemas: {
        Producto: {
          type: 'object',
          required: ['nombre', 'precio', 'stock', 'categoria'],
          properties: {
            nombre: { type: 'string', example: 'Laptop HP' },
            precio: { type: 'number', example: 12000 },
            stock: { type: 'integer', example: 10 },
            categoria: { type: 'string', example: 'Tecnología' },
            descripcion: { type: 'string', example: 'Laptop HP Pavilion, 16GB RAM, 512GB SSD' },
            imagen: {
              type: 'string',
              format: 'uri',
              example: 'https://m.media-amazon.com/images/I/41SJic55+TL._AC_UF894,1000_QL80_.jpg',
            },
          },
        },
        Usuario: {
          type: 'object',
          required: ['nombre', 'correo', 'contraseña', 'rol'],
          properties: {
            nombre: { type: 'string', example: 'Juan Pérez' },
            correo: { type: 'string', format: 'email', example: 'juan@example.com' },
            contraseña: { type: 'string', example: '123456' },
            rol: {
              type: 'string',
              enum: ['Administrador', 'Soporte Técnico', 'Mantenimiento', 'Contador', 'Atención al Cliente'],
              example: 'Administrador',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Asegúrate que aquí estén tus anotaciones Swagger
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
