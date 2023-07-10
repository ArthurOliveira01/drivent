import { Payment } from '../../protocols';
import {
  createPaymentRecord,
  findEnrollmentByEnrollmentId,
  findEnrollmentByTicketId,
  findPaymentByTicketId,
  findTicketByTicketId,
  findTicketType,
  updateTicketStatus
} from '../../repositories/payments-repository';

export async function createPaymentService(payment: Payment, userId: number) {
    const ticketData = await findTicketByTicketId(payment.ticketId);
    if (!ticketData) throw { name: 'not_found', message: 'Payment not found' };
    const enrollmentData = await findEnrollmentByTicketId(ticketData.enrollmentId);
    if (enrollmentData.userId !== userId) throw { name: 'UnauthorizedError', message: 'You must be signed in to continue' };
    const ticketTypeData = await findTicketType(ticketData.ticketTypeId);
    await createPaymentRecord(payment, ticketTypeData.price);
    const paymentData = await findPaymentByTicketId(payment.ticketId);
  
    return paymentData;
  }

export async function processTicketPaymentService(ticketId: number, userId: number) {
  const ticketData = await findTicketByTicketId(ticketId);
  if (!ticketData) throw { name: 'not_found', message: 'Payment not found' };
  const enrollmentData = await findEnrollmentByEnrollmentId(ticketData.enrollmentId);
  if (enrollmentData.userId !== userId) throw { name: 'UnauthorizedError', message: 'You must be signed in to continue' };
  const paymentData = await findPaymentByTicketId(ticketId);
  if (!paymentData) throw { name: 'not_found', message: 'Payment not found' };

  await updateTicketStatus(ticketId);

  return paymentData;
}
