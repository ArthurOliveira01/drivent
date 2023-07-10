import { notFoundError } from '../../errors';
import enrollmentRepository from '../../repositories/enrollment-repository';
import { findEnrollmentByUserId } from '../../repositories/payments-repository';
import {createTicket, fetchTicketTypes, fetchTicketById, fetchTicketsByEnrollmentId} from '../../repositories/tickets-repository';

export async function getTicketsTypeService() {
  return await fetchTicketTypes();
}

export async function getTicketsService(userId: number) {
  const enrollment = await findEnrollmentByUserId(userId);
  if (!enrollment) throw { name: 'NotFoundError', message: 'No result for this search!' };
  const ticket = await fetchTicketsByEnrollmentId(enrollment.id);
  if (!ticket) throw { name: 'NotFoundError', message: 'No result for this search!' };
  return ticket;
}

export async function createTicketService(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const id = enrollment.id;
  await createTicket(ticketTypeId, id);

  const ticket = await fetchTicketById  (id);
  if (!ticket) throw notFoundError();

  return ticket;
}