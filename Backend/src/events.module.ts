import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';

@Module({
  imports: [PrismaModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}


