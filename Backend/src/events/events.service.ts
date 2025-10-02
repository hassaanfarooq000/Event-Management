import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.event.findMany({
      where: { deleteStatus: false },
      orderBy: { dateTime: 'asc' },
      select: {
        eventId: true,
        title: true,
        details: true,
        location: true,
        city: true,
        dateTime: true,
        day: true,
        type: true,
        organizerId: true,
        vipTickets: true,
        regTickets: true,
        price: true,
        image: true,
        deleteStatus: true,
      },
    });
  }

  async getById(id: number) {
    const event = await this.prisma.event.findUnique({
      where: { eventId: id },
      select: {
        eventId: true,
        title: true,
        details: true,
        location: true,
        city: true,
        dateTime: true,
        day: true,
        type: true,
        organizerId: true,
        vipTickets: true,
        regTickets: true,
        price: true,
        image: true,
        deleteStatus: true,
      },
    });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async reserve(eventId: number, userId: number) {
    // Ensure event exists
    await this.getById(eventId);
    // Create or return existing reservation (unique on eventId+userId)
    const reservation = await this.prisma.reservedEvent.upsert({
      where: { eventId_userId: { eventId, userId } },
      update: {},
      create: { eventId, userId },
      select: { id: true, eventId: true, userId: true, completeStatus: true, createdAt: true },
    });
    return { reservation };
  }

  async getUserReservations(userId: number) {
    const reservations = await this.prisma.reservedEvent.findMany({
      where: { userId },
      include: {
        event: {
          select: {
            eventId: true,
            title: true,
            details: true,
            location: true,
            city: true,
            dateTime: true,
            day: true,
            type: true,
            organizerId: true,
            vipTickets: true,
            regTickets: true,
            price: true,
            image: true,
            deleteStatus: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return { reservations };
  }

  async create(data: {
    title: string;
    details: string;
    location: string;
    city: string;
    dateTime: string;
    day: string;
    type: string;
    organizerId: number;
    vipTickets: number;
    regTickets: number;
    price: number;
    image: string;
  }) {
    const event = await this.prisma.event.create({
      data: {
        title: data.title,
        details: data.details,
        location: data.location,
        city: data.city,
        dateTime: new Date(data.dateTime),
        day: data.day,
        type: data.type,
        organizerId: data.organizerId,
        vipTickets: data.vipTickets,
        regTickets: data.regTickets,
        price: data.price,
        image: data.image,
      },
      select: {
        eventId: true,
        title: true,
        details: true,
        location: true,
        city: true,
        dateTime: true,
        day: true,
        type: true,
        organizerId: true,
        vipTickets: true,
        regTickets: true,
        price: true,
        image: true,
        deleteStatus: true,
      },
    });
    return { event };
  }
}


