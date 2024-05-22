import  express  from 'express';
const router = express.Router();

import produtoController from '../controllers/produtoController.js'

router.route('/create')
.post((req, res) => produtoController.create(req, res));

router.route('/')
.get((req, res) => produtoController.showProduto(req, res)); 
  
router.route('/:id')
.get((req, res) => produtoController.getProdutoById(req, res));

router.route('/:id')
.delete( /* verifyToken, */ (req, res) => produtoController.removeProdutoById(req, res));

router.route('/edit/:id')
.put((req, res) => produtoController.editProdutoUpdate(req, res));

export default router;