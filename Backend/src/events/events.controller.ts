import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  list() {
    return this.eventsService.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.eventsService.getById(Number(id));
  }

  @Post(':id/reserve')
  reserve(
    @Param('id') id: string,
    @Body() body: { userId: number },
  ) {
    return this.eventsService.reserve(Number(id), Number(body.userId));
  }

  @Get('user/:userId/reservations')
  getUserReservations(@Param('userId') userId: string) {
    return this.eventsService.getUserReservations(Number(userId));
  }

  @Post()
  create(@Body() body: {
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
    return this.eventsService.create(body);
  }
}


