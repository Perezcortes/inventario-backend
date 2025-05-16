import { Request, Response } from 'express';
import Product from '../models/Product';
import mongoose from 'mongoose';

/**
 * Crear un nuevo producto a partir de los datos enviados en el cuerpo de la solicitud.
 */
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { nombre, precio, stock, categoria, descripcion, imagen } = req.body;

        const newProduct = new Product({
            nombre,
            precio,
            stock,
            categoria,
            descripcion,
            imagen,
        });

        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el producto' });
    }
};

/**
 * Obtener todos los productos existentes en la base de datos.
 */
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
};

/**
 * Crear múltiples productos en un solo lote, recibiendo un arreglo de productos.
 */
export const createMultipleProducts = async (req: Request, res: Response) => {
    try {
        const productos = req.body;

        if (!Array.isArray(productos) || productos.length === 0) {
            return res.status(400).json({ message: 'Debes enviar un arreglo de productos' });
        }

        const nuevosProductos = await Product.insertMany(productos);

        res.status(201).json({
            message: 'Productos creados exitosamente',
            productos: nuevosProductos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear productos en lote' });
    }
};

/**
 * Actualizar un producto existente por su ID. Puede ser una actualización parcial o completa.
 */
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
            new: true,          // Devuelve el documento actualizado
            runValidators: true // Aplica validaciones del schema de Mongoose
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
};

/**
 * Eliminar un producto específico por su ID.
 */
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto eliminado exitosamente', producto: deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
};

/**
 * Eliminar múltiples productos enviando un array de IDs en el cuerpo de la solicitud.
 */
export const deleteProductsBatch = async (req: Request, res: Response) => {
    try {
        const { ids } = req.body;

        // Validar que todos los IDs sean ObjectId válidos
        const objectIds = ids.map((id: string) => {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error(`ID inválido: ${id}`);
            }
            return new mongoose.Types.ObjectId(id);
        });

        const result = await Product.deleteMany({ _id: { $in: objectIds } });

        res.json({
            message: `${result.deletedCount} productos eliminados.`,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error al eliminar productos', error });
    }
};
