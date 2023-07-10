import { prisma } from '@/config';

export function createTicket(ticketTypeId: number, enrollmentId: number) {
    return prisma.ticket.create({
      data: {
        ticketTypeId,
        enrollmentId,
        status: 'RESERVED',
        updatedAt: new Date(Date.now()),
      },
    });
  }

  export function fetchTicketTypes() {
    return prisma.ticketType.findMany();
  }

  export function fetchTicketsByEnrollmentId(enrollmentId: number) {
    return prisma.ticket.findFirst({
      where: {
        enrollmentId,
      },
      include: {
        TicketType: true,
      },
    });
  }

  export function fetchTicketById(ticketId: number) {
    return prisma.ticket.findFirst({
      where: {
        enrollmentId: ticketId,
      },
      include: {
        TicketType: true,
      },
    });
  }