import { Router } from 'express';
import { createTicketEntry, fetchTickets, fetchTicketsType } from '../controllers/tickets-controller';
import { authenticateToken } from '../middlewares';

const ticketRouter = Router();
ticketRouter.get('/tickets/types', authenticateToken, fetchTicketsType);
ticketRouter.get('/tickets', authenticateToken, fetchTickets);
ticketRouter.post('/tickets', authenticateToken, createTicketEntry);

export {ticketRouter};