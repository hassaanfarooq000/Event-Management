"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Clock, Ticket, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type Event = {
  eventId: number;
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
  deleteStatus: boolean;
};

type Reservation = {
  id: number;
  eventId: number;
  userId: number;
  completeStatus: boolean;
  createdAt: string;
  event: Event;
};

export default function MyEventsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/login');
      return;
    }

    fetchReservations();
  }, [router]);

  const fetchReservations = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
      const res = await fetch(`${base}/api/users/${userId}/reservations`);
      const data = await res.json();
      
      if (res.ok) {
        setReservations(data.reservations || []);
      } else {
        toast.error('Failed to load reservations');
      }
    } catch (error) {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Loading your events...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-center mb-2">My Events</h1>
        <p className="text-muted-foreground text-center text-sm">Events you've registered for</p>
      </div>

      {reservations.length === 0 ? (
        <div className="text-center py-12">
          <CalendarDays className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No events yet</h3>
          <p className="text-muted-foreground mb-4">You haven't registered for any events yet.</p>
          <Button asChild>
            <Link href="/events">Browse Events</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <Card key={reservation.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col lg:flex-row">
                {/* Event Image */}
                <div className="lg:w-48 w-full h-48 lg:h-32 flex-shrink-0 relative">
                  <Image 
                    src={reservation.event.image} 
                    alt={reservation.event.title} 
                    width={200}
                    height={150}
                    className="object-cover w-full h-full" 
                  />
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                    {reservation.event.type}
                  </div>
                  <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                    {reservation.completeStatus ? 'Confirmed' : 'Pending'}
                  </div>
                </div>
                
                {/* Event Details */}
                <div className="flex-1 p-4 lg:p-6 flex flex-col">
                  <CardHeader className="p-0">
                    <CardTitle className="text-lg lg:text-xl line-clamp-1">{reservation.event.title}</CardTitle>
                    <CardDescription className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {reservation.event.details}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-3 px-0 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{reservation.event.location}, {reservation.event.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{reservation.event.day}, {new Date(reservation.event.dateTime).toDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ticket className="h-4 w-4" />
                        <span>VIP: {reservation.event.vipTickets}, Regular: {reservation.event.regTickets}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>${reservation.event.price}</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-xs text-muted-foreground">
                      Reserved: {new Date(reservation.createdAt).toLocaleDateString()}
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/events/${reservation.event.eventId}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
