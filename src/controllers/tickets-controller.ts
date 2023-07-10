import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { createTicketService, getTicketsService, getTicketsTypeService } from '../services/tickets-services';
import { AuthenticatedRequest } from '../middlewares';

export async function createTicketEntry(req: Request, res: Response) {
    const { userId } = req as AuthenticatedRequest;
    const ticketTypeId: number = req.body.ticketTypeId;
  
    try {
      if (!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST);
  
      const createdTicket = await createTicketService(userId, ticketTypeId);
      res.status(httpStatus.CREATED).send(createdTicket);
    } catch (error) {
      if (error.name === 'NotFoundError') res.status(httpStatus.NOT_FOUND).send(error.message);
      if (error.name === 'UnauthorizedError') res.status(httpStatus.UNAUTHORIZED).send(error.message);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Something went wrong");
    }
  }
  

export async function fetchTickets(req: Request, res: Response) {
    const { userId } = req as AuthenticatedRequest;
  
    try {
      const ticketData = await getTicketsService(userId);
      res.status(httpStatus.OK).send(ticketData);
    } catch (error) {
      if (error.name === 'NotFoundError') res.status(httpStatus.NOT_FOUND).send(error.message);
      if (error.name === 'UnauthorizedError') res.status(httpStatus.UNAUTHORIZED).send(error.message);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Something went wrong");
    }
  }
  
export async function fetchTicketsType(req: Request, res: Response) {
  try {
    const ticketsTypeData = await getTicketsTypeService();
    res.status(httpStatus.OK).send(ticketsTypeData);
  } catch (error) {
    if (error.name === 'UnauthorizedError') res.status(httpStatus.UNAUTHORIZED).send(error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Something went wrong");
  }
}