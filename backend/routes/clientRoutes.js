import  express  from 'express';
const router = express.Router();

import clientController from '../controllers/clientController.js';

router.route('/create')
.post((req, res) => clientController.create(req, res));

router.route('/')
.get((req, res) => clientController.showClient(req, res));

router.route('/:id')
.get((req, res) => clientController.getClientById(req, res))

router.route('/:id')
.delete(/* verifyToken, */(req, res) => clientController.removeClientById(req, res));

router.route('/edit/:id')
.put((req, res) => clientController.editClientUpdate(req, res));


export default router;







