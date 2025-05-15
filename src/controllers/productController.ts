import { Request, Response } from 'express';
import Product from '../models/Product';

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

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
};

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


