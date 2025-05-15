import { Router } from 'express';
import { createProduct } from '../controllers/productController';
import { getAllProducts } from '../controllers/productController';

const router = Router();

router.post('/', createProduct);
router.get('/', getAllProducts); // GET /api/products/

export default router;
