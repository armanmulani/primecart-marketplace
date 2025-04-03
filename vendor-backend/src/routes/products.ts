import express from 'express';
import { auth } from '../middleware/auth';
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController';

const router = express.Router();

router.post('/', auth, createProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

export default router;