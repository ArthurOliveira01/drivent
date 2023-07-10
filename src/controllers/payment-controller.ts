import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { createPaymentService, processTicketPaymentService } from '../services/payment-services/';
import { AuthenticatedRequest } from '../middlewares';
import { Payment } from '../protocols';

export async function createPayment(req: Request, res: Response) {
  const requestBody = req.body as Payment;
  const { userId } = req as AuthenticatedRequest;
  try {
    const paymentResult = await createPaymentService(requestBody, userId);
    res.status(httpStatus.OK).send(paymentResult);
  } catch (error) {
    if (error.name === 'UnauthorizedError') res.status(httpStatus.UNAUTHORIZED).send(error.message);
    if (error.name === 'not_found') res.status(httpStatus.NOT_FOUND).send(error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Something's wrong");
  }
}

export async function paymentTicket(req: Request, res: Response) {
  const { userId } = req as AuthenticatedRequest;
  const ticketId = Number(req.params.ticketId);
  try {
    if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST); // Erro 400: ticketId não enviado
    const paymentResult = await processTicketPaymentService(ticketId, userId);
    res.status(httpStatus.OK).send(paymentResult);
  } catch (error) {
    if (error.name === 'UnauthorizedError') res.status(httpStatus.UNAUTHORIZED).send(error.message);
    if (error.name === 'not_found') res.status(httpStatus.NOT_FOUND).send(error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Something's wrong");
  }
}