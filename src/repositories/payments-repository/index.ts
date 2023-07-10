import { prisma } from '../../config';
import { Payment } from '../../protocols';

export function findEnrollmentByTicketId(enrollmentId: number) {
  return prisma.enrollment.findFirst({
    where: {
      id: enrollmentId,
    },
  });
}

export function updateTicketStatus(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: 'PAID',
    },
  });
}

export function findEnrollmentByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: {
      userId,
    },
  });
}

export function createPaymentRecord(paymentData: Payment, value: number) {
  return prisma.payment.create({
    data: {
      ticketId: paymentData.ticketId,
      value,
      cardIssuer: paymentData.cardData.issuer,
      cardLastDigits: paymentData.cardData.number.slice(-4),
      updatedAt: new Date(Date.now()),
    },
  });
}

export function findPaymentByTicketId(id: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: id,
    },
  });
}

export function findTicketByTicketId(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
  });
}

export function findEnrollmentByEnrollmentId(enrollmentId: number) {
  return prisma.enrollment.findFirst({
    where: {
      id: enrollmentId,
    },
  });
}

export function findTicketType(ticketTypeId: number) {
  return prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId,
    },
  });
}
