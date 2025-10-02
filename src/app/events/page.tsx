import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Define the event type
type Event = {
    eventId: number;
    title: string;
    details: string;
    location: string;
    city: string;
    dateTime: Date;
    day: string;
    type: string;
    organizerId: number;
    vipTickets: number;
    regTickets: number;
    price: number;
    image: string;
    deleteStatus: boolean;
};

async function getEvents(): Promise<Event[]> {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
    try {
        const res = await fetch(`${base}/api/events`, { cache: 'no-store' });
        const data = await res.json();
        return (data ?? []).map((e: any) => ({
            ...e,
            dateTime: new Date(e.dateTime)
        }));
    } catch {
        return [];
    }
}


// Single Event Card Component
function EventCard({ event }: { event: Event }) {
    return (
        <Link href={`/events/${event.eventId}`} className="block w-full max-w-6xl mx-auto mb-4">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="flex flex-col lg:flex-row">
                    {/* Small cute image box */}
                    <div className="lg:w-32 w-full h-32 lg:h-24 flex-shrink-0 relative">
                        <Image 
                            src={event.image} 
                            alt={event.title} 
                            width={200}
                            height={150}
                            className="object-cover w-full h-full rounded-l-lg" 
                        />
                        {/* Event type badge */}
                        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                            {event.type}
                        </div>
                    </div>
                    
                    {/* Content area */}
                    <div className="flex-1 p-4 lg:p-6 flex flex-col">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg lg:text-xl line-clamp-1">{event.title}</CardTitle> 
                            <CardDescription className="mt-1 text-sm text-muted-foreground line-clamp-2">{event.details}</CardDescription>
                        </CardHeader>
                        
                        <CardContent className="pt-3 px-0 flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <p><strong>📍</strong> {event.location}, {event.city}</p>
                                <p><strong>📅</strong> {event.day}, {event.dateTime.toDateString()}</p>
                                <p><strong>🎫</strong> VIP {event.vipTickets}, Regular {event.regTickets}</p>
                                <p><strong>💰</strong> ${event.price}</p>
                            </div>
                        </CardContent>
                        
                        <CardFooter className="p-0 mt-3 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <Button variant="default" size="sm" className="text-xs">
                                    Register
                                </Button>
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {event.dateTime.toLocaleDateString()}
                            </div>
                        </CardFooter>
                    </div>
                </div>
            </Card>
        </Link>
    );
}

// Main Events Page Component
export default async function EventsPage() {
    const events = await getEvents();
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
                <h1 className="text-2xl lg:text-3xl font-bold text-center mb-2">Upcoming Events</h1>
                <p className="text-muted-foreground text-center text-sm">Discover amazing events happening around you</p>
            </div>
            <div className="space-y-3">
                {events.map((event) => (
                    <EventCard key={event.eventId} event={event} />
                ))}
            </div>
        </div>
    );
}