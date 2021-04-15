import express from 'express';
import { create, getAll, getByUser, getOne, remove, addResponse } from '../controllers/problem.js';
const router = express.Router();

router.post('/create', create);
router.get('/get-all', getAll);
router.get('/get-one/:id', getOne);
router.get('/get-by-user/:id', getByUser);
router.delete('/delete/:id', remove);
router.put('/add-response/:id', addResponse);

export default router;