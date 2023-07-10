import { Router } from 'express';
import { createPayment, paymentTicket } from '../controllers/payment-controller';
import { authenticateToken, validateBody } from '../middlewares';
import { paymentSchema } from '../schemas/payment-schema';

const paymentRouter = Router();

paymentRouter.get('/payments', authenticateToken, paymentTicket);
paymentRouter.post('/payments/process', authenticateToken, validateBody(paymentSchema), createPayment);

export {paymentRouter};