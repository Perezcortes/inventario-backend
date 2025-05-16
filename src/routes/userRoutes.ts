import { Router } from 'express';
import {
  createUser,
  createUsersBatch,
  getAllUsers,
  updateUser,
  deleteUser
} from '../controllers/userController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios en el sistema
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - correo
 *               - contraseña
 *               - rol
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *                 format: email
 *               contraseña:
 *                 type: string
 *               rol:
 *                 type: string
 *                 enum: [Administrador, Soporte Técnico, Mantenimiento, Contador, Atención al Cliente]
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/usuarios/lote:
 *   post:
 *     summary: Crear múltiples usuarios en lote
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - nombre
 *                 - correo
 *                 - contraseña
 *                 - rol
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: Juan Pérez
 *                 correo:
 *                   type: string
 *                   format: email
 *                   example: juan@example.com
 *                 contraseña:
 *                   type: string
 *                   example: miPassword123
 *                 rol:
 *                   type: string
 *                   enum: [Administrador, Soporte Técnico, Mantenimiento, Contador, Atención al Cliente]
 *                   example: Soporte Técnico
 *     responses:
 *       201:
 *         description: Usuarios creados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   correo:
 *                     type: string
 *                   rol:
 *                     type: string
 *                   creadoEn:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Datos faltantes o inválidos
 *       409:
 *         description: Uno o más correos ya están registrados
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *                 format: email
 *               contraseña:
 *                 type: string
 *               rol:
 *                 type: string
 *                 enum: [Administrador, Soporte Técnico, Mantenimiento, Contador, Atención al Cliente]
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */


router.get('/', getAllUsers);
router.post('/', (req, res, next) => { 
  createUser(req, res).catch(next);
});
router.post('/lote', (req, res, next) => { 
  createUsersBatch(req, res).catch(next);
});
router.put('/:id', (req, res, next) => {
  updateUser(req, res).catch(next);
});
router.delete('/:id', (req, res, next) => {
  deleteUser(req, res).catch(next);
});

export default router;
