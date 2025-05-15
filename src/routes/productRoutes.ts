import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  // Aquí va la lógica para obtener productos
  res.json({ message: 'Lista de productos' });
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({ message: `Producto con id: ${id}` });
});

// otros métodos (POST, PUT, DELETE) igual...

export default router;
