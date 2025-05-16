import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  createMultipleProducts,
  updateProduct,
  deleteProductsBatch,
  deleteProduct
} from '../controllers/productController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: API para gestionar productos
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 * 
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 */

/**
 * @swagger
 * /api/products/batch:
 *   post:
 *     summary: Crear múltiples productos en lote
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Producto'
 *     responses:
 *       201:
 *         description: Productos creados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto por ID (parcial o total)
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Campos del producto a actualizar (puede ser parcial o completo)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Nuevo nombre"
 *               precio:
 *                 type: number
 *                 example: 1000
 *               stock:
 *                 type: integer
 *                 example: 15
 *               categoria:
 *                 type: string
 *                 example: "Tecnología"
 *               descripcion:
 *                 type: string
 *                 example: "Descripción actualizada del producto"
 *               imagen:
 *                 type: string
 *                 example: "https://m.media-amazon.com/images/ejemplo.jpg"
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Producto eliminado exitosamente
 *                 producto:
 *                   $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/products/batch:
 *   delete:
 *     summary: Eliminar múltiples productos por lote
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["663d5a894f1b5f001234abcd", "663d5a894f1b5f001234efgh"]
 *     responses:
 *       200:
 *         description: Productos eliminados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 eliminados:
 *                   type: integer
 *       400:
 *         description: Solicitud inválida (IDs faltantes o inválidos)
 *       500:
 *         description: Error interno del servidor
 */

// Crear un nuevo producto
router.post('/', createProduct);

// Obtener todos los productos
router.get('/', getAllProducts);

// Crear múltiples productos en un solo lote
router.post('/batch', (req, res, next) => {
  createMultipleProducts(req, res).catch(next);
});

// Actualizar un producto por su ID (puede ser una actualización parcial o total)
router.put('/:id', (req, res, next) => {
  updateProduct(req, res).catch(next);
});

// Eliminar múltiples productos en un solo lote, recibiendo un array de IDs
router.delete('/batch', (req, res, next) => {
  deleteProductsBatch(req, res).catch(next);
});

// Eliminar un producto por su ID
router.delete('/:id', (req, res, next) => {
  deleteProduct(req, res).catch(next);
});


export default router;
