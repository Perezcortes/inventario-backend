import Proveedor from '../models/Proveedor';
import { Request, Response } from 'express';

export const crearProveedor = async (req: Request, res: Response) => {
  try {
    const proveedor = new Proveedor(req.body);
    await proveedor.save();
    res.status(201).json(proveedor);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear proveedor' });
  }
};

export const obtenerProveedores = async (_req: Request, res: Response) => {
  try {
    const proveedores = await Proveedor.find().populate('productosSuministrados');
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener proveedores' });
  }
};

export const obtenerProveedorPorId = async (req: Request, res: Response) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id).populate('productosSuministrados');
    if (!proveedor) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener proveedor' });
  }
};

export const actualizarProveedor = async (req: Request, res: Response) => {
  try {
    const proveedor = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!proveedor) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar proveedor' });
  }
};

export const eliminarProveedor = async (req: Request, res: Response) => {
  try {
    const proveedor = await Proveedor.findByIdAndDelete(req.params.id);
    if (!proveedor) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.json({ message: 'Proveedor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar proveedor' });
  }
};
